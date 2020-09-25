import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AlertModule } from './shared/components/alert';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExamBuilderModule } from './shared/components/exam-builder/exam-builder.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AppRoutingModule,
        ExamBuilderModule,
		AlertModule.forRoot()
	],
	providers: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
