import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from "ng-uikit-pro-standard";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { QuestionTitleComponent } from "./shared/components/question-title/question-title.component";
import { AnswerMultichoiceComponent } from "./shared/components/answer-multichoice/answer-multichoice.component";
import { AnswerMultilineComponent } from "./shared/components/answer-multiline/answer-multiline.component";

@NgModule({
	declarations: [
		AppComponent,
		QuestionTitleComponent,
		AnswerMultichoiceComponent,
		AnswerMultilineComponent
	],
	imports: [
		BrowserModule,
		MDBBootstrapModulesPro,
		AppRoutingModule
	],
	providers: [
		MDBSpinningPreloader
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
