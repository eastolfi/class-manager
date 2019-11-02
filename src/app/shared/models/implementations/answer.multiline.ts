import { IAnswer } from '../interfaces/answer';
import { AnswerType } from '../enums/answer-type';

export class AnswerMultiline implements IAnswer {
    id: number;
    type: AnswerType;
    scorePerAnswer?: number;
    content: string | Set<IAnswer>;
}
