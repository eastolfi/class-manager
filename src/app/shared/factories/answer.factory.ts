import { IAnswer, AnswerType, AnswerMultiple, AnswerSimple } from "../models";

export class AnswerFactory {
	public static createAnswer(type: AnswerType): IAnswer {
		switch (type) {
			case AnswerType.SINGLE_CHOICE:
				return new AnswerSimple();
			case AnswerType.MULTI_CHOICE:
				return new AnswerMultiple();
			default:
				return null;
		}
	}
}
