import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core.module';
import { AnswerSimpleModule } from '@shared/components/answers/answer-simple/answer-simple.module';

import { AnswerMultichoiceComponent } from './answer-multichoice.component';

@NgModule({
    declarations: [
        AnswerMultichoiceComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        AnswerSimpleModule,
    ],
    exports: [
        AnswerMultichoiceComponent
    ]
})
export class AnswerMultichoiceModule { }
