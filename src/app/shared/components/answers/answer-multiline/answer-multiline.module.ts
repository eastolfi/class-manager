import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core.module';

import { AnswerMultilineComponent } from './answer-multiline.component';

@NgModule({
    declarations: [
        AnswerMultilineComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
    ],
    exports: [
        AnswerMultilineComponent
    ]
})
export class AnswerMultilineModule { }
