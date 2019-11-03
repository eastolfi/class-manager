import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from "@angular/core";

export const enum CalculationType {
	SIMPLE, CALCULATE_TOTAL, CALCULATE_INDIVIDUAL
}

@Component({
	selector: "exagen-score-calculator",
	templateUrl: "./score-calculator.component.html",
	styleUrls: ["./score-calculator.component.scss"]
})
export class ScoreCalculatorComponent implements OnInit, OnChanges {
	@Input()
	public totalAnswers: number;
	
	@Output()
	public scoreCalculated: EventEmitter<{ totalScore: number, scorePerAnswer: number }> = new EventEmitter();
	
	public totalScore: number;
	public scorePerAnswer: number;

	public CALCULATION_SIMPLE = CalculationType.SIMPLE;
	public CALCULATION_TOTAL = CalculationType.CALCULATE_TOTAL;
	public CALCULATION_INDIVIDUAL = CalculationType.CALCULATE_INDIVIDUAL;

	public calculationType: CalculationType = CalculationType.SIMPLE;

	get isCalculationSimple() { return this.calculationType === CalculationType.SIMPLE }
	get isCalculationTotal() { return this.calculationType === CalculationType.CALCULATE_TOTAL }
	get isCalculationIndividual() { return this.calculationType === CalculationType.CALCULATE_INDIVIDUAL }

	constructor() {
	}

	ngOnInit() {
		this.refreshCalculations()
	}

	ngOnChanges(changes: SimpleChanges): void {
		// if we have a number of answers, trigger the calculation
		if (changes.totalAnswers) {
			this.refreshCalculations();
		}
	}

	public refreshCalculations() {
		if (this.isCalculationIndividual) {
			this.calculateIndividual();
		} else if (this.isCalculationTotal) {
			this.calculateTotal();
		} else {
			this.calculateSimple();
		}
	}

	public calculateSimple() {
		if (this.totalScore > 0) {
			this.scoreCalculated.emit({
				totalScore: this.totalScore,
				scorePerAnswer: null
			})
		}
	}

	public calculateTotal() {
		if (this.scorePerAnswer > 0 && this.totalAnswers > 0) {
			this.totalScore = parseFloat((this.scorePerAnswer * this.totalAnswers).toFixed(2));

			this.scoreCalculated.emit({
				totalScore: this.totalScore,
				scorePerAnswer: this.scorePerAnswer
			});
		}
	}

	public calculateIndividual() {
		if (this.totalScore > 0 && this.totalAnswers > 0) {
			this.scorePerAnswer = parseFloat((this.totalScore / this.totalAnswers).toFixed(2));

			this.scoreCalculated.emit({
				totalScore: this.totalScore,
				scorePerAnswer: this.scorePerAnswer
			});
		}
	}
}
