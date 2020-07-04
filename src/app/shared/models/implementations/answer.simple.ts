import { IdFactory } from "../../factories/id.factory";

import { IAnswer } from "../interfaces/answer";
import { AnswerType } from "../enums/answer-type";
import { FormGroup, FormControl } from '@angular/forms';

export class AnswerSimple implements IAnswer {
	public id: number = IdFactory.createId();
	public type: AnswerType = AnswerType.SINGLE_CHOICE;
	public scorePerAnswer: number;
	public content: string = "";

	public static createFormGroup(): FormGroup {
		return new FormGroup({
            id: new FormControl(IdFactory.createId()),
            type: new FormControl(AnswerType.SINGLE_CHOICE),
            scorePerAnswer: new FormControl(0),
			content: new FormControl('')
		})
	}
}
