import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Lab1Component } from '../labs/lab1/lab1.component';
import { Lab2Component } from '../labs/lab2/lab2.component';
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
          description: "Selectori, atribute CSS, unități de măsură, moduri de aplicare a stilurilor, etc.",
          // homeworkLink: 'https://forms.gle/aJXtMSuu3YJpgGt27',
          // homeworkDue: "2022-02-22T00:00:00+02:00"
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
