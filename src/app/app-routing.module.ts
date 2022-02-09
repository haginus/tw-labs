import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LabViewerComponent } from './pages/lab-viewer/lab-viewer.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "labs/:id",
    component: LabViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
