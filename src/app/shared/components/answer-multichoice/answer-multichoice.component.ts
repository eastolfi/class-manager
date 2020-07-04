import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

import { IAnswer, AnswerMultiple, AnswerSimple } from "../../models";
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
	selector: "exagen-answer-multichoice",
	templateUrl: "./answer-multichoice.component.html",
	styleUrls: ["./answer-multichoice.component.scss"]
})
export class AnswerMultichoiceComponent implements OnInit {
	@Input()
	public parentForm: FormGroup
	@Output()
	public answersUpdated: EventEmitter<IAnswer> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	get answerContent(): FormArray {
		return this.parentForm.get('content') as FormArray
	}
    get answerContentArray(): any[] {
        return this.answerContent.value
    }
	get scorePerAnswer(): FormControl {
		return this.parentForm.get('scorePerAnswer') as FormControl
	}

	addAnswer() {
        this.answerContent.push(AnswerSimple.createFormGroup())
		// this.answerContent.controls.push(AnswerSimple.createFormGroup())

		// this.notifyAnswersUpdated();
	}

	deleteAnswer(index: number) {
		this.answerContent.removeAt(index)

		this.notifyAnswersUpdated();
	}

	private notifyAnswersUpdated() {
		this.answersUpdated.emit(this.parentForm.value as IAnswer);
	}
}
