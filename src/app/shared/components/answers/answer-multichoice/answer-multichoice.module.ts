import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AnswerMultichoiceComponent } from './answer-multichoice.component';
import { AnswerSimpleModule } from '../answer-simple/answer-simple.module';

@NgModule({
    declarations: [
        AnswerMultichoiceComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        AnswerSimpleModule
    ],
    exports: [
        AnswerMultichoiceComponent
    ]
})
export class AnswerMultichoiceModule { }
