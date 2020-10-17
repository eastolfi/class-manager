import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core.module';
import { QuestionFactory } from '@shared/factories/question.factory';
import { QuestionTitleModule } from '@shared/components/question-title/question-title.module';
import { AnswerMultichoiceModule } from '@shared/components/answers/answer-multichoice/answer-multichoice.module';
import { AnswerSimpleModule } from '@shared/components/answers/answer-simple/answer-simple.module';
import { AnswerMultilineModule } from '@shared/components/answers/answer-multiline/answer-multiline.module';
import { ScoreCalculatorModule } from '@shared/components/score-calculator/score-calculator.module';

import { QuestionBuilderComponent } from './question-builder.component';

@NgModule({
    declarations: [
        QuestionBuilderComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        QuestionTitleModule,
        AnswerSimpleModule,
        AnswerMultilineModule,
        AnswerMultichoiceModule,
        ScoreCalculatorModule
    ],
    providers: [
        QuestionFactory
    ],
    exports: [
        QuestionBuilderComponent
    ]
})
export class QuestionBuilderModule { }
