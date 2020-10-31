import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from '@angular/forms';

import { IAnswer, AnswerType, ITitle, Title } from "../../models";
import { AnswerFactory } from "../../factories/answer.factory";
import { QuestionFactory } from '@app/shared/factories/question.factory';
import { CalculationType } from '../score-calculator/score-calculator.component';

export declare interface IQuestion {
	id: number,
	title: ITitle,
	// totalScore: number,
	// scorePerAnswer: number,
	totalAnswers: number,
	answer: IAnswer
}
export class Question implements IQuestion {
	public id: number = (new Date().getTime());
	public title: Title = new Title();
	// public totalScore: number = 0;
	// public scorePerAnswer: number = 0;
	public totalAnswers: number = 0;
	public answer: IAnswer;
}

@Component({
	selector: "cm-question-builder",
	templateUrl: "./question-builder.component.html",
	styleUrls: ["./question-builder.component.scss"]
})
export class QuestionBuilderComponent implements OnInit {
    @Input()
    public form: FormGroup

    public scoreCalculationForAnswer: CalculationType[] = [];

    public answerTypeOptions = [
        // { value: null, label: "Elige el tipo de respuesta" },
        { value: AnswerType.SINGLE_CHOICE, label: "Una línea" },
        { value: AnswerType.MULTI_CHOICE, label: "Elección Múltiple" },
        { value: AnswerType.MULTI_LINE, label: "Varias líneas" }
    ]

    constructor(private readonly questionFactory: QuestionFactory, private readonly answerFactory: AnswerFactory) {
        this.initForm();
    }

    ngOnInit() {
        this.form.get('answerType').valueChanges.subscribe((value: AnswerType) => {
            this.form.removeControl('answer');

            this.form.addControl('answer', this.answerFactory.createAnswerForm(value));
            if (value === AnswerType.SINGLE_CHOICE || value === AnswerType.MULTI_LINE) {
                this.scoreCalculationForAnswer = [CalculationType.SIMPLE];
                this.form.get('score').patchValue({
                    calculationType: CalculationType.SIMPLE
                });
            } else if (value === AnswerType.MULTI_CHOICE) {
                this.scoreCalculationForAnswer = [CalculationType.SIMPLE, CalculationType.CALCULATE_TOTAL, CalculationType.CALCULATE_INDIVIDUAL];
            }

            this.form.get('answer').valueChanges.subscribe(answer => {
                const totalAnswers = answer.choices ? answer.choices.length : 1;

                this.score.patchValue({
                    totalAnswers
                });
            })
        })
	}

    public get questionTitle(): FormGroup {
		return this.form.get('title') as FormGroup
	}

    public get answer(): FormGroup {
        return this.form.get('answer') as FormGroup;
    }

    public get score(): FormGroup {
        return this.form.get('score') as FormGroup;
    }

    get isSingleChoiceAnswer() {
        return this.answer && this.answer.value.type === AnswerType.SINGLE_CHOICE;
    }

    get isMultiChoiceAnswer() {
        return this.answer && this.answer.value.type === AnswerType.MULTI_CHOICE;
    }

    get isMultiLineAnswer() {
        return this.answer && this.answer.value.type === AnswerType.MULTI_LINE;
    }

	public onScoreCalculated(info: { totalScore: number, scorePerAnswer: number }) {
        this.form.get('title').patchValue({
            score: info.totalScore
        })
	}

	private initForm(): void {
		if (!this.form) {
            this.form = this.questionFactory.createQuestionForm();
        }
	}
}
