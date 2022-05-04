import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeListComponent } from './pages/grade-list/grade-list.component';
import { GradingRoutingModule } from './grading-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { GradeComponent } from './pages/grade/grade.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatMenuModule } from '@angular/material/menu';


const dbConfig: DBConfig  = {
  name: 'GradeDb',
  version: 1,
  objectStoresMeta: [{
    store: 'grades',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'person', keypath: 'person', options: { unique: false } },
      { name: 'labGrade', keypath: 'labGrade', options: { unique: false } },
      { name: 'projectGrade', keypath: 'projectGrade', options: { unique: false } }
    ]
  }]
};

const mapDeps = [
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule,
  MatMenuModule,
];


@NgModule({
  declarations: [
    GradeListComponent,
    GradeComponent
  ],
  imports: [
    CommonModule,
    GradingRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ...mapDeps
  ]
})
export class GradingModule { }
