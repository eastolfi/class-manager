import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

const MATERIAL_MODULES = [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
]

@NgModule({
	imports: [
        ReactiveFormsModule,
        ...MATERIAL_MODULES,
	],
	exports: [
        ReactiveFormsModule,
        ...MATERIAL_MODULES,
	]
})
export class CoreModule { }
