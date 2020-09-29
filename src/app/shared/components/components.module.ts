import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { QuestionTitleComponent } from "./question-title/question-title.component";
import { AnswerMultichoiceComponent } from "./answer-multichoice/answer-multichoice.component";
import { AnswerMultilineComponent } from "./answer-multiline/answer-multiline.component";
import { QuestionBuilderComponent } from "./question-builder/question-builder.component";
import { ScoreCalculatorComponent } from "./score-calculator/score-calculator.component";

@NgModule({
	declarations: [
		QuestionTitleComponent,
		AnswerMultichoiceComponent,
		AnswerMultilineComponent,
		QuestionBuilderComponent,
		ScoreCalculatorComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		BrowserAnimationsModule,
	],
	exports: [
		QuestionTitleComponent,
		AnswerMultichoiceComponent,
		AnswerMultilineComponent,
		QuestionBuilderComponent
	]
})
export class ComponentsModule { }
