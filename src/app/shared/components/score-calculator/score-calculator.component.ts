import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

	@Output()
	public scoreCalculated: EventEmitter<{ totalScore: number, scorePerAnswer: number }> = new EventEmitter();

	constructor(private readonly fb: FormBuilder) {}

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
        this.calculationTypeControl.valueChanges.subscribe((value: CalculationType) => {
            this.refreshCalculations();
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

    private refreshCalculations() {
        // Fix this
        this.form.patchValue({
            totalScore: this.totalScore,
            scorePerAnswer: 0
        }, { emitEvent: false });
        this.emitScoreCalculated(0, 0);
		// if (this.isCalculationIndividual) {
		// 	this.calculateScorePerAnswer();
		// } else if (this.isCalculationTotal) {
		// 	this.calculateTotal();
		// } else {
		// 	this.calculateSimple();
		// }
	}

    // Merge with individual
    private calculateSimple() {
        this.form.patchValue({
            totalScore: this.totalScore,
            scorePerAnswer: 0
        }, { emitEvent: false });
        this.emitScoreCalculated(this.totalScore || 0, 0);
    }

    private calculateTotal() {
        const totalScore = parseFloat((this.scorePerAnswer * this.totalAnswers).toFixed(2));
        this.form.get('totalScore').patchValue(
            totalScore,
            { emitEvent: false }
        );
        this.emitScoreCalculated(totalScore, this.scorePerAnswer || 0);
    }

    private calculateScorePerAnswer() {
        const scorePerAnswer = this.totalAnswers > 0 ? parseFloat((this.totalScore / this.totalAnswers).toFixed(2)) : 0;

        this.form.get('scorePerAnswer').patchValue(
            scorePerAnswer,
            { emitEvent: false }
        );

        this.emitScoreCalculated(this.totalScore || 0, scorePerAnswer);
    }

    private emitScoreCalculated(totalScore: number, scorePerAnswer: number): void {
        this.scoreCalculated.emit({
            totalScore, scorePerAnswer
        })
    }
}
