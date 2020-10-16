import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ExamBuilderComponent } from './exam-builder.component';
import { QuestionBuilderModule } from '../question-builder/question-builder.module';
import { ExamFactory } from '@app/shared/factories/exam.factory';

@NgModule({
    declarations: [
        ExamBuilderComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        QuestionBuilderModule
    ],
    providers: [
        ExamFactory
    ],
    exports: [
        ExamBuilderComponent
    ]
})
export class ExamBuilderModule { }
