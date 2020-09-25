import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from '@angular/forms';

import { IAnswer, AnswerType, ITitle, Title } from "../../models";
import { AnswerFactory } from "../../factories/answer.factory";
import { QuestionFactory } from '@app/shared/factories/question.factory';

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
	selector: "exagen-question-builder",
	templateUrl: "./question-builder.component.html",
	styleUrls: ["./question-builder.component.scss"]
})
export class QuestionBuilderComponent implements OnInit {
	@Input()
	public form: FormGroup

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
            this.form.get('score').reset();
            this.form.removeControl('answer');
            this.form.addControl('answer', this.answerFactory.createAnswerForm(value));
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

    // public get totalAnswers(): number {
    //     if (this.answer && this.isMultiChoiceAnswer) {
    //         return this.answer.get('choices').value.length;
    //     } else if (this.answer) {
    //         return 1;
    //     }
    // }

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

	// public onAnswersUpdated(answer: IAnswer) {
	// 	switch (answer.type) {
	// 		case AnswerType.SINGLE_CHOICE:
	// 			this.question.totalAnswers = 1
	// 			break;
	// 		case AnswerType.MULTI_CHOICE:
	// 			this.question.totalAnswers = (answer.content as Set<IAnswer>).size
	// 			break;
	// 		default:
	// 			this.question.totalAnswers = 0
	// 	}
	// }

	private initForm(): void {
		if (!this.form) {
            this.form = this.questionFactory.createQuestionForm();
        }
	}
}
