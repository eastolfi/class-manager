import { IAnswer, AnswerType, AnswerMultiple, AnswerSimple } from "../models";
import { AnswerMultiline } from '../models/implementations/answer.multiline';

export class AnswerFactory {
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
}
