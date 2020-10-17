import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core.module';
import { ExamFactory } from '@app/shared/factories/exam.factory';
import { QuestionBuilderModule } from '@shared/components/question-builder/question-builder.module';

import { ExamBuilderComponent } from './exam-builder.component';

@NgModule({
    declarations: [
        ExamBuilderComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
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
