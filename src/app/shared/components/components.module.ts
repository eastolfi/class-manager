import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ExamBuilderComponent } from "./exam-builder/exam-builder.component";
import { QuestionTitleComponent } from "./question-title/question-title.component";
import { AnswerMultichoiceComponent } from "./answers/answer-multichoice/answer-multichoice.component";
import { AnswerMultilineComponent } from "./answers/answer-multiline/answer-multiline.component";
import { QuestionBuilderComponent } from "./question-builder/question-builder.component";
import { ScoreCalculatorComponent } from "./score-calculator/score-calculator.component";

export const COMPONENTS = [
	ExamBuilderComponent,
	QuestionTitleComponent,
	AnswerMultichoiceComponent,
	AnswerMultilineComponent,
	QuestionBuilderComponent,
	ScoreCalculatorComponent
]

@NgModule({
	declarations: [
		...COMPONENTS
	],
	imports: [
		CommonModule,
		// FormsModule,
        ReactiveFormsModule,
		BrowserAnimationsModule,
	],
	exports: [
		ExamBuilderComponent,
		QuestionTitleComponent,
		AnswerMultichoiceComponent,
		AnswerMultilineComponent,
		QuestionBuilderComponent
	]
})
export class ComponentsModule { }
