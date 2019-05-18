export enum AnswerType {
	SINGLE_CHOICE = 1, MULTI_CHOICE = 2
}

export declare interface IAnswer {
	id: number,
	type: AnswerType,
	scorePerAnswer?: number,
	content: string|Set<IAnswer>,
}
