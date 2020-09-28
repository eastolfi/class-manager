import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAnswer, AnswerType, AnswerMultiple, AnswerSimple } from "../models";
import { AnswerMultiline } from '../models/implementations/answer.multiline';
import { Utils } from '../utils/utils';

@Injectable({
    providedIn: 'root'
})
export class AnswerFactory {
    constructor(private readonly fb: FormBuilder) {}

	public static createAnswer(type: AnswerType): IAnswer {
		switch (type) {
			case AnswerType.SINGLE_CHOICE:
				return new AnswerSimple();
			case AnswerType.MULTI_CHOICE:
				return new AnswerMultiple();
            case AnswerType.MULTI_LINE:
                return new AnswerMultiline()
			default:
				return null;
		}
	}

    public createAnswerForm(type: AnswerType): FormGroup {
        switch (type) {
            case AnswerType.SINGLE_CHOICE:
                return this.fb.group({
                    id: [Utils.createId()],
                    type: [type],
                    content: ['']
                });
            case AnswerType.MULTI_CHOICE:
                return this.fb.group({
                    id: [Utils.createId()],
                    type: [type],
                    choices: this.fb.array([])
                });
            case AnswerType.MULTI_LINE:
                return this.fb.group({
                    id: [Utils.createId()],
                    type: [type],
                    content: ['']
                })
            default:
                return this.fb.group({});
        }
    }
}
