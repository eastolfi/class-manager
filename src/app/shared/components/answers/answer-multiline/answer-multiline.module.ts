import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AnswerMultilineComponent } from './answer-multiline.component';

@NgModule({
    declarations: [
        AnswerMultilineComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        AnswerMultilineComponent
    ]
})
export class AnswerMultilineModule { }
