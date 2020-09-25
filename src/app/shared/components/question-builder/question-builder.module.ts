import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { QuestionBuilderComponent } from './question-builder.component';
import { QuestionTitleModule } from '../question-title/question-title.module';
import { AnswerMultichoiceModule } from '../answers/answer-multichoice/answer-multichoice.module';
import { QuestionFactory } from '@app/shared/factories/question.factory';
import { AnswerSimpleModule } from '../answers/answer-simple/answer-simple.module';
import { AnswerMultilineModule } from '../answers/answer-multiline/answer-multiline.module';
import { ScoreCalculatorModule } from '../score-calculator/score-calculator.module';

@NgModule({
    declarations: [
        QuestionBuilderComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
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
