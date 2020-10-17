import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamBuilderModule } from '@app/shared/components/exam-builder/exam-builder.module';

import { ExamGeneratorRoutingModule } from './exam-generator-routing.module';
import { ExamGeneratorComponent } from './exam-generator.component';


@NgModule({
    declarations: [ExamGeneratorComponent],
    imports: [
        CommonModule,
        ExamGeneratorRoutingModule,
        ExamBuilderModule
    ]
})
export class ExamGeneratorModule { }
