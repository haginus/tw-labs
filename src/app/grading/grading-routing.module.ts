import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeListComponent } from './pages/grade-list/grade-list.component';
import { GradeComponent } from './pages/grade/grade.component';
import { PrintGradeComponent } from './pages/print-grade/print-grade.component';

const routes: Routes = [
  { path: '', component: GradeListComponent },
  { path: 'grade', component: GradeComponent },
  { path: 'grade/:id', component: GradeComponent },
  { path: 'grade/:id/print', component: PrintGradeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradingRoutingModule { }
