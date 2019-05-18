import { IAnswer, AnswerType } from "../models/answer";
import { AnswerMultiple } from "../models/answer.multiple";

export class AnswerFactory {
	public static createAnswer(type: AnswerType): IAnswer {
		switch (type) {
			case AnswerType.MULTI_CHOICE:
				return new AnswerMultiple();
			default:
				return null;
		}
	}
}
