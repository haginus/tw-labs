import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Lab1Component } from '../labs/lab1/lab1.component';
import { Lab2Component } from '../labs/lab2/lab2.component';
import { Lab3Component } from '../labs/lab3/lab3.component';
import { Lab } from '../lib/models/Lab';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor() { }

  getLabs(): Observable<Lab[]> {
    return of([
      new Lab(
        Lab1Component,
        {
          id: 1,
          title: "Introducere în HTML",
          subtitle: "Laboratorul 1",
          description: "Recapitulare a cunoștințelor de HTML din liceu și înțelegerea noțiunilor de bază.",
          homeworkLink: 'https://forms.gle/aJXtMSuu3YJpgGt27',
          homeworkDue: "2022-02-24T12:00:00+02:00"
        }
      ),
      new Lab(
        Lab2Component,
        {
          id: 2,
          title: "Introducere în CSS",
          subtitle: "Laboratorul 2",
          description: "Sintaxă, moduri de includere, valori și unități de măsură, proprietăți CSS comune, selectori, etc.",
          homeworkLink: 'https://forms.gle/26SiZGVPdx644AjP6',
          homeworkDue: "2022-03-17T12:00:00+02:00"
        }
      ),
      new Lab(
        Lab3Component,
        {
          id: 3,
          title: "CSS: Layout, animații și media queries",
          subtitle: "Laboratorul 3",
          description: "Metode de poziționare a elementelor, flex, grid, tranziții și animații și media queries.",
          homeworkLink: 'https://forms.gle/zW64tWiHUHNAR1RG7',
          homeworkDue: "2022-03-17T12:00:00+02:00"
        }
      )
    ]);
  }

  getLab(id: number) {
    return this.getLabs().pipe(
      map(labs => labs.find(lab => lab.meta.id == id))
    );
  }
}
