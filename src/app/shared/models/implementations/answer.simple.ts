import { IdFactory } from "../../factories/id.factory";

import { IAnswer } from "../interfaces/answer";
import { AnswerType } from "../enums/answer-type";

export class AnswerSimple implements IAnswer {
	public id: number = IdFactory.createId();
	public type: AnswerType = AnswerType.SINGLE_CHOICE;
	public scorePerAnswer: number;
	public content: string = "";
}
