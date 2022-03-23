import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Lab1Component } from '../labs/lab1/lab1.component';
import { Lab2Component } from '../labs/lab2/lab2.component';
import { Lab3Component } from '../labs/lab3/lab3.component';
import { Lab4Component } from '../labs/lab4/lab4.component';
import { Lab5Component } from '../labs/lab5/lab5.component';
import { Lab6Component } from '../labs/lab6/lab6.component';
import { Lab } from '../lib/models/Lab';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor() { }

  private labList: Lab[] = [
    new Lab(
      Lab1Component,
      {
        id: 1,
        title: "Introducere în HTML",
        subtitle: "Laboratorul 1",
        description: "Recapitulare a cunoștințelor de HTML din liceu și înțelegerea noțiunilor de bază.",
        homeworkLink: 'https://forms.gle/aJXtMSuu3YJpgGt27',
        homeworkDue: "2022-02-24T23:59:59+02:00"
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
        homeworkDue: "2022-03-17T23:59:59+02:00"
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
        homeworkDue: "2022-03-17T23:59:59+02:00"
      }
    ),
    new Lab(
      Lab4Component,
      {
        id: 4,
        title: "Introducere în JavaScript",
        subtitle: "Laboratorul 4",
        description: "Moduri de includere, tipuri de date, variabile, operatori, funcții, statements, etc.",
        homeworkLink: 'https://forms.gle/wEvQ9NuwS8ch42pR7',
        homeworkDue: "2022-03-24T23:59:59+02:00",
      }
    ),
    new Lab(
      Lab5Component,
      {
        id: 5,
        title: "JavaScript: Manipularea DOM-ului",
        subtitle: "Laboratorul 5",
        description: "Noduri și elemente. Găsirea elementelor în DOM. Manipularea DOM-ului prin adăugarea, modificarea sau ștergerea de elemente.",
        homeworkLink: 'https://forms.gle/6NjX1m3Akr1oEy8v6',
        homeworkDue: "2022-03-24T23:59:59+02:00",
        availableOn: "2022-03-17T12:00:00+02:00"
      }
    ),
    new Lab(
      Lab6Component,
      {
        id: 6,
        title: "Formulare HTML și evenimente JavaScript",
        subtitle: "Laboratorul 6",
        description: "",
        homeworkLink: 'https://forms.gle/mxsT1XjzvtpBwWD48',
        homeworkDue: "2022-03-31T23:59:59+02:00"
      }
    )
  ]

  getLabs(): Observable<Lab[]> {
    return of(this.labList).pipe(
      map(labs => labs.filter(lab => lab.isAvailable))
    );
  }

  getLab(id: number) {
    return this.getLabs().pipe(
      map(labs => labs.find(lab => lab.meta.id == id && lab.isAvailable))
    );
  }
}
