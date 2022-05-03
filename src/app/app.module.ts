import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { HomeComponent } from './pages/home/home.component';
import { CodeExampleComponent } from './components/code-example/code-example.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HttpClientModule } from '@angular/common/http';
import { Lab1Component } from './labs/lab1/lab1.component';
import { LabViewerComponent } from './pages/lab-viewer/lab-viewer.component';
import { LabDirective } from './directives/lab.directive';
import { LabListComponent } from './components/lab-list/lab-list.component';
import { InfoComponent } from './components/info/info.component';
import { TipComponent } from './components/tip/tip.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PromptUpdateService } from './services/prompt-update.service';
import { Lab2Component } from './labs/lab2/lab2.component';
import { Lab3Component } from './labs/lab3/lab3.component';
import { HomeworkPackComponent } from './components/homework-pack/homework-pack.component';
import { Lab4Component } from './labs/lab4/lab4.component';
import { Lab5Component } from './labs/lab5/lab5.component';
import { Lab6Component } from './labs/lab6/lab6.component';
import { Lab7Component } from './labs/lab7/lab7.component';
import { Lab8Component } from './labs/lab8/lab8.component';
import { Model1Component } from './labs/model1/model1.component';
import { Lab9Component } from './labs/lab9/lab9.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CodeExampleComponent,
    LabViewerComponent,
    LabDirective,
    Lab1Component,
    LabListComponent,
    InfoComponent,
    TipComponent,
    Lab2Component,
    Lab3Component,
    HomeworkPackComponent,
    Lab4Component,
    Lab5Component,
    Lab6Component,
    Lab7Component,
    Lab8Component,
    Model1Component,
    Lab9Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HighlightModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          javascript: () => import('highlight.js/lib/languages/javascript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
