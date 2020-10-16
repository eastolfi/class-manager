import { IAnswer } from "../interfaces/answer";
import { AnswerType } from "../enums/answer-type";
import { Utils } from '@app/shared/utils/utils';

export class AnswerMultiple implements IAnswer {
	public id: number = Utils.createId();
	public type: AnswerType = AnswerType.MULTI_CHOICE;
	public scorePerAnswer: number;
	public content: Set<IAnswer> = new Set();
	public contentAsList?: Array<IAnswer>;
}
