import { storiesOf, moduleMetadata } from "@storybook/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { QuestionBuilderComponent } from "../app/shared/components/question-builder/question-builder.component";

import { ReactiveFormsModule } from '@angular/forms';
import { QuestionTitleModule } from '@app/shared/components/question-title/question-title.module';
import { AnswerMultichoiceModule } from '@app/shared/components/answers/answer-multichoice/answer-multichoice.module';
import { ScoreCalculatorModule } from '@app/shared/components/score-calculator/score-calculator.module';
import { AnswerSimpleModule } from '@app/shared/components/answers/answer-simple/answer-simple.module';
import { AnswerMultilineModule } from '@app/shared/components/answers/answer-multiline/answer-multiline.module';

storiesOf("Question Builder/Multi Choice", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				BrowserAnimationsModule,
                ReactiveFormsModule,
                MatInputModule,
				MatIconModule,
                MatSelectModule,
                QuestionTitleModule,
                AnswerSimpleModule,
                AnswerMultilineModule,
                AnswerMultichoiceModule,
                ScoreCalculatorModule
			]
		})
	)
	.add("standard", () => ({
		component: QuestionBuilderComponent,
	}))
	// .add("with score in the title", () => ({
	// 	component: QuestionBuilderComponent,
	// 	props: {
	// 		questionType: "MULTICHOICE"
	// 	}
	// }))
	// .add("with the score prorated among the answers", () => ({
	// 	component: QuestionBuilderComponent,
	// 	props: {
	// 		questionType: "MULTICHOICE"
	// 	}
	// }))
	// .add("with score for each answer", () => ({
	// 	component: QuestionBuilderComponent,
	// 	props: {
	// 		questionType: "MULTICHOICE"
	// 	}
	// }))
