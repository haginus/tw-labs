import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';


const materialDeps = [
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialDeps
  ],
  exports: [
    ...materialDeps
  ]
})
export class AppMaterialModule { }
