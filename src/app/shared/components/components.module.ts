import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { QuestionTitleComponent } from "./question-title/question-title.component";
import { AnswerMultichoiceComponent } from "./answer-multichoice/answer-multichoice.component";
import { AnswerMultilineComponent } from "./answer-multiline/answer-multiline.component";
import { QuestionBuilderComponent } from "./question-builder/question-builder.component";

@NgModule({
	declarations: [
		QuestionTitleComponent,
		AnswerMultichoiceComponent,
		AnswerMultilineComponent,
		QuestionBuilderComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		QuestionTitleComponent,
		AnswerMultichoiceComponent,
		AnswerMultilineComponent,
		QuestionBuilderComponent
	]
})
export class ComponentsModule { }
