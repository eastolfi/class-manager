import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';

// import { IAnswer, AnswerMultiple, AnswerSimple } from "../../models";
import { AnswerSimple } from "../answer-simple/answer-simple.component";

@Component({
	selector: "exagen-answer-multichoice",
	templateUrl: "./answer-multichoice.component.html",
	styleUrls: ["./answer-multichoice.component.scss"]
})
export class AnswerMultichoiceComponent implements OnInit {
	@Input()
	public form: FormGroup

	// @Output()
	// public answersUpdated: EventEmitter<IAnswer> = new EventEmitter();

	constructor(private readonly fb: FormBuilder) { }

	ngOnInit() {
		if (!this.form) {
			this.initForm();
		}
	}

	get choices(): FormArray {
		return this.form.get('choices') as FormArray;
	}

	private initForm(): void {
		this.form = this.fb.group({
			choices: this.fb.array([])
		});
	}

	private createChoiceFormGroup(): FormGroup {
		return this.fb.group({
			content: ['']
		});
	}

	// get answerContent(): FormArray {
	// 	return this.parentForm.get('content') as FormArray
	// }
    // get answerContentArray(): any[] {
    //     return this.answerContent.value
    // }
	// get scorePerAnswer(): FormControl {
	// 	return this.parentForm.get('scorePerAnswer') as FormControl
	// }

	addAnswer() {
        this.choices.push(this.createChoiceFormGroup())
        // this.answerContent.push(AnswerSimple.createFormGroup())
		// this.answerContent.controls.push(AnswerSimple.createFormGroup())

		// this.notifyAnswersUpdated();
	}

	onDeleteAnswer(index: number) {
		// this.answerContent.removeAt(index)
		this.choices.removeAt(index);

		// this.notifyAnswersUpdated();
	}

	// private notifyAnswersUpdated() {
	// 	this.answersUpdated.emit(this.parentForm.value as IAnswer);
	// }
}
