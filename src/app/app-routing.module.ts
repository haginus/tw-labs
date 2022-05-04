import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { LabListComponent } from './components/lab-list/lab-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LabViewerComponent } from './pages/lab-viewer/lab-viewer.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'labs', pathMatch: 'full' },
      { path: 'labs', component: LabListComponent },
      { path: 'info', component: InfoComponent }
    ]
  },
  {
    path: "labs/:id",
    component: LabViewerComponent
  },
  { path: 'grading',
    loadChildren: () => import('./grading/grading.module').then(m => m.GradingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
