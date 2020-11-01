import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalculationType } from '../components/score-calculator/score-calculator.component';

@Injectable()
export class QuestionFactory {
    constructor(private readonly fb: FormBuilder) {}

    public createQuestionForm(): FormGroup {
        return this.fb.group({
            title: this.fb.group({
                title: [''],
                showScore: [false],
                score: 0
            }),
            answerType: [''],
            score: this.fb.group({
                calculationType: [CalculationType.SIMPLE],
                totalScore: [0],
                scorePerAnswer: [0],
                totalAnswers: [0]
            }),
            answer: this.fb.group({})
        });
    }
}
