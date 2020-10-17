import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@app/core.module';

import { ScoreCalculatorComponent } from './score-calculator.component';

@NgModule({
    declarations: [
        ScoreCalculatorComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
    ],
    exports: [
        ScoreCalculatorComponent
    ]
})
export class ScoreCalculatorModule { }
