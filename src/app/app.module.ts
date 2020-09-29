import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./shared/components/components.module";
import { AlertModule } from './shared/components/alert';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
		ComponentsModule,
		AlertModule.forRoot()
	],
	providers: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
