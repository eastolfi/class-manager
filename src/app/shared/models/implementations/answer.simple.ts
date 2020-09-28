import { IAnswer } from "../interfaces/answer";
import { AnswerType } from "../enums/answer-type";
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '@app/shared/utils/utils';

export class AnswerSimple implements IAnswer {
	public id: number = Utils.createId();
	public type: AnswerType = AnswerType.SINGLE_CHOICE;
	public scorePerAnswer: number;
	public content: string = "";

	public static createFormGroup(): FormGroup {
		return new FormGroup({
            id: new FormControl(Utils.createId()),
            type: new FormControl(AnswerType.SINGLE_CHOICE),
            scorePerAnswer: new FormControl(0),
			content: new FormControl('')
		})
	}
}
