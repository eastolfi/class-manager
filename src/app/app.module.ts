import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from "ng-uikit-pro-standard";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./shared/components/components.module";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		MDBBootstrapModulesPro,
		AppRoutingModule,
		ComponentsModule
	],
	providers: [
		MDBSpinningPreloader
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
