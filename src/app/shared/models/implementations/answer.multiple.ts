import { IdFactory } from "../../factories/id.factory";

import { IAnswer } from "../interfaces/answer";
import { AnswerType } from "../enums/answer-type";

export class AnswerMultiple implements IAnswer {
	public id: number = IdFactory.createId();
	public type: AnswerType = AnswerType.MULTI_CHOICE;
	public scorePerAnswer: number;
	public content: Set<IAnswer> = new Set();
	public contentAsList?: Array<IAnswer>;
}
