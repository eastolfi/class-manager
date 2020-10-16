import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { QuestionTitleComponent } from './question-title.component';

@NgModule({
    declarations: [
        QuestionTitleComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule
    ],
    exports: [
        QuestionTitleComponent
    ]
})
export class QuestionTitleModule { }
