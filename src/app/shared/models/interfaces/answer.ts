import { AnswerType } from "../enums/answer-type";

export declare interface IAnswer {
	id: number,
	type: AnswerType,
	scorePerAnswer?: number,
	content: string|Set<IAnswer>,
}
