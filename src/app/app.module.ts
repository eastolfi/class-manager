import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from "ng-uikit-pro-standard";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./shared/components/components.module";
import { AlertModule } from './shared/components/alert';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		MDBBootstrapModulesPro,
		AppRoutingModule,
		ComponentsModule,
		AlertModule.forRoot()
	],
	providers: [
		MDBSpinningPreloader
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
