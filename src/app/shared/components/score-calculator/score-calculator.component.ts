import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { pairwise } from 'rxjs/operators';

export const enum CalculationType {
    SIMPLE, CALCULATE_TOTAL, CALCULATE_INDIVIDUAL
}

@Component({
    selector: "exagen-score-calculator",
    templateUrl: "./score-calculator.component.html",
    styleUrls: ["./score-calculator.component.scss"]
})
export class ScoreCalculatorComponent implements OnInit {
    public CALCULATION_SIMPLE = CalculationType.SIMPLE;
    public CALCULATION_TOTAL = CalculationType.CALCULATE_TOTAL;
    public CALCULATION_INDIVIDUAL = CalculationType.CALCULATE_INDIVIDUAL;

    @Input()
    public form: FormGroup;

    @Input()
    public allowedCalculations: CalculationType[] = [ CalculationType.SIMPLE, CalculationType.CALCULATE_TOTAL, CalculationType.CALCULATE_INDIVIDUAL ];

    @Output()
    public scoreCalculated: EventEmitter<{ totalScore: number, scorePerAnswer: number }> = new EventEmitter();

    constructor(private readonly fb: FormBuilder) { }

    ngOnInit() {
        this.initForm();
        this.initListeners();
        this.refreshCalculations();
    }

    public get totalAnswers(): number { return this.form.get('totalAnswers').value as number }
    public get totalScore(): number { return this.form.get('totalScore').value as number }
    public get scorePerAnswer(): number { return this.form.get('scorePerAnswer').value as number }
    public get calculationTypeControl(): FormControl { return this.form.get('calculationType') as FormControl }

    public get isCalculationSimple() { return this.calculationTypeControl.value === CalculationType.SIMPLE }
    public get isCalculationTotal() { return this.calculationTypeControl.value === CalculationType.CALCULATE_TOTAL }
    public get isCalculationIndividual() { return this.calculationTypeControl.value === CalculationType.CALCULATE_INDIVIDUAL }

    public isCalculationAllowed(type: CalculationType): boolean {
        return this.allowedCalculations.includes(type);
    }

    private initForm(): void {
        if (!this.form) {
            this.form = this.fb.group({
                calculationType: [CalculationType.SIMPLE],
                totalAnswers: [0],
                totalScore: [0],
                scorePerAnswer: [0]
            });
        }
    }

    private initListeners(): void {
        this.calculationTypeControl.valueChanges.pipe(
            pairwise()
        ).subscribe(([ previous ]: [CalculationType, CalculationType]) => {
            this.refreshCalculations(previous);
        });
        this.form.get('totalAnswers').valueChanges.subscribe(() => {
            this.refreshCalculations();
        });
        this.form.get('scorePerAnswer').valueChanges.subscribe((value: number) => {
            this.calculateTotal();
        });
        this.form.get('totalScore').valueChanges.subscribe((value: number) => {
            this.calculateScorePerAnswer();
        });
    }

    private refreshCalculations(previousType?: CalculationType) {
        if (this.isCalculationIndividual) {
            this.calculateScorePerAnswer();
        } else if (this.isCalculationTotal) {
            if (previousType === CalculationType.SIMPLE) {
                this.form.get('scorePerAnswer').patchValue(this.calculateIndividualScore(this.totalScore, this.totalAnswers), { emitEvent: false });
            }

            this.calculateTotal();
        } else {
            this.calculateSimple();
        }
    }

    private calculateSimple() {
        this.patchAndEmit(this.totalScore, 0);
    }

    private calculateTotal() {
        this.patchAndEmit(this.calculateTotalScore(this.scorePerAnswer, this.totalAnswers), this.scorePerAnswer);
    }

    private calculateScorePerAnswer() {
        this.patchAndEmit(this.totalScore, this.calculateIndividualScore(this.totalScore, this.totalAnswers));
    }

    private calculateTotalScore(scorePerAnswer: number, answers: number): number {
        return parseFloat(((scorePerAnswer || 0) * (answers || 0)).toFixed(2));
    }
    private calculateIndividualScore(totalScore: number, answers: number): number {
        if ((answers || 0) <= 0) {
            return 0;
        }

        // This will cause rounding issues, but currently its the only way
        return parseFloat(((totalScore || 0) / answers).toFixed(2));
    }

    private patchAndEmit(totalScore: number, individualScore: number): void {
        this.form.patchValue({
            totalScore,
            scorePerAnswer: individualScore
        }, { emitEvent: false });

        this.emitScoreCalculated(totalScore, individualScore);
    }

    private emitScoreCalculated(totalScore: number, scorePerAnswer: number): void {
        this.scoreCalculated.emit({
            totalScore, scorePerAnswer
        })
    }
}
