import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core.module';

import { QuestionTitleComponent } from './question-title.component';

@NgModule({
    declarations: [
        QuestionTitleComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
    ],
    exports: [
        QuestionTitleComponent
    ]
})
export class QuestionTitleModule { }
