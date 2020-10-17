import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
}, {
    path: 'home',
    loadChildren: async () => (await import('./pages/home/home.module')).HomeModule
}, {
    path: 'exam-generator',
    loadChildren: async () => (await import('./pages/exam-generator/exam-generator.module')).ExamGeneratorModule
}, {
    path: 'class-layout',
    loadChildren: async () => (await import('./pages/class-layout/class-layout.module')).ClassLayoutModule
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
