import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

import { ScoreCalculatorComponent } from './score-calculator.component';

@NgModule({
    declarations: [
        ScoreCalculatorComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatRadioModule
    ],
    exports: [
        ScoreCalculatorComponent
    ]
})
export class ScoreCalculatorModule { }
