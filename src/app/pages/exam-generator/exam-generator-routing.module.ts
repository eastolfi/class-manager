import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamGeneratorComponent } from './exam-generator.component';

const routes: Routes = [{
    path: '',
    component: ExamGeneratorComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamGeneratorRoutingModule { }
