import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClassLayoutComponent } from './class-layout.component';

const ROUTES: Routes = [{
    path: '',
    component: ClassLayoutComponent
}];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class ClassLayoutRoutingModule { }
