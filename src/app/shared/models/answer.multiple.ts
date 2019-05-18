import { IdFactory } from "../factories/id.factory";

import { IAnswer, AnswerType } from "./answer";

export class AnswerMultiple implements IAnswer {
	public id: number = IdFactory.createId();
	public type: AnswerType = AnswerType.MULTI_CHOICE;
	public scorePerAnswer: number;
	public content: Set<IAnswer> = new Set();
}
