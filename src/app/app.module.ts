import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from "ng-uikit-pro-standard";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
	declarations: [
		AppComponent
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
