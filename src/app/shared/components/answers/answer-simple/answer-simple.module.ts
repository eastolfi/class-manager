import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core.module';

import { AnswerSimpleComponent } from './answer-simple.component';

@NgModule({
    declarations: [
        AnswerSimpleComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
    ],
    exports: [
        AnswerSimpleComponent
    ]
})
export class AnswerSimpleModule { }
