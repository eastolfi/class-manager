import { storiesOf, moduleMetadata } from "@storybook/angular";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

import { ScoreCalculatorComponent, CalculationType } from "../app/shared/components/score-calculator/score-calculator.component";

storiesOf("Score Calculator/Simple", module)
	.addDecorator(
		moduleMetadata({
			imports: [
                BrowserAnimationsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatIconModule,
                MatRadioModule
			]
		})
	)
	.add("with no answers", () => ({
		component: ScoreCalculatorComponent,
		props: {
			form: new FormGroup({
                calculationType: new FormControl(CalculationType.SIMPLE),
                totalScore: new FormControl(0),
                scorePerAnswer: new FormControl(0),
                totalAnswers: new FormControl(0)
            })
		}
	}))
	.add("with one answer", () => ({
		component: ScoreCalculatorComponent,
		props: {
			form: new FormGroup({
                calculationType: new FormControl(CalculationType.SIMPLE),
                totalScore: new FormControl(0),
                scorePerAnswer: new FormControl(0),
                totalAnswers: new FormControl(1)
            })
		}
	}))

storiesOf("Score Calculator/Total", module)
	.addDecorator(
		moduleMetadata({
			imports: [
                BrowserAnimationsModule,
                ReactiveFormsModule,
                MatInputModule,
				MatIconModule,
                MatRadioModule
			]
		})
	)
	.add("with no answers", () => ({
		component: ScoreCalculatorComponent,
		props: {
			form: new FormGroup({
                calculationType: new FormControl(CalculationType.CALCULATE_TOTAL),
                totalScore: new FormControl(0),
                scorePerAnswer: new FormControl(0),
                totalAnswers: new FormControl(0)
            })
		}
	}))
	.add("with answers", () => ({
		component: ScoreCalculatorComponent,
		props: {
            form: new FormGroup({
                calculationType: new FormControl(CalculationType.CALCULATE_TOTAL),
                totalScore: new FormControl(0),
                scorePerAnswer: new FormControl(2),
                totalAnswers: new FormControl(3)
            })
			// scoreCalculated: action("Score Recalculated")
		}
	}))

storiesOf("Score Calculator/Per Answer", module)
	.addDecorator(
		moduleMetadata({
			imports: [
                BrowserAnimationsModule,
                ReactiveFormsModule,
                MatInputModule,
				MatIconModule,
                MatRadioModule
			]
		})
	)
	.add("with no answers", () => ({
		component: ScoreCalculatorComponent,
		props: {
			form: new FormGroup({
                calculationType: new FormControl(CalculationType.CALCULATE_INDIVIDUAL),
                totalScore: new FormControl(0),
                scorePerAnswer: new FormControl(0),
                totalAnswers: new FormControl(0)
            })
		}
	}))
	.add("with answers", () => ({
		component: ScoreCalculatorComponent,
		props: {
			form: new FormGroup({
                calculationType: new FormControl(CalculationType.CALCULATE_INDIVIDUAL),
                totalScore: new FormControl(10),
                scorePerAnswer: new FormControl(0),
                totalAnswers: new FormControl(3)
            })
			// scoreCalculated: action("Score Recalculated")
		}
	}))
