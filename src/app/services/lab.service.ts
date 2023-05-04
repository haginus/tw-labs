import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Lab1Component } from '../labs/lab1/lab1.component';
import { Lab2Component } from '../labs/lab2/lab2.component';
import { Lab3Component } from '../labs/lab3/lab3.component';
import { Lab4Component } from '../labs/lab4/lab4.component';
import { Lab5Component } from '../labs/lab5/lab5.component';
import { Lab6Component } from '../labs/lab6/lab6.component';
import { Lab7Component } from '../labs/lab7/lab7.component';
import { Lab8Component } from '../labs/lab8/lab8.component';
import { Lab9Component } from '../labs/lab9/lab9.component';
import { Model1Component } from '../labs/model1/model1.component';
import { Model2Component } from '../labs/model2/model2.component';
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
        homeworkDue: "2023-03-02T12:00:00+02:00",
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
        homeworkDue: "2023-03-09T12:00:00+02:00",
        availableOn: "2023-03-02T12:00:00+02:00",
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
        homeworkDue: "2023-03-16T12:00:00+02:00",
        availableOn: "2023-03-09T12:00:00+02:00",
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
        homeworkDue: "2023-03-23T12:00:00+02:00",
        availableOn: "2023-03-16T12:00:00+02:00",
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
        homeworkDue: "2023-03-30T12:00:00+03:00",
        availableOn: "2023-03-23T12:00:00+02:00",
      }
    ),
    new Lab(
      Lab6Component,
      {
        id: 6,
        title: "Formulare HTML și evenimente JavaScript",
        subtitle: "Laboratorul 6",
        description: "Formulare HTML. Diferite evenimente în JavaScript și proprietăți ale acestora. Moduri de atașare.",
        homeworkLink: 'https://forms.gle/mxsT1XjzvtpBwWD48',
        homeworkDue: "2023-04-06T12:00:00+03:00",
        availableOn: "2023-03-30T12:00:00+03:00"
      }
    ),
    new Lab(
      Lab7Component,
      {
        id: 7,
        title: "Programare asincronică în Javascript. Stocare.",
        subtitle: "Laboratorul 7",
        description: "Promise-uri, callbacks, async/await, fetch, setTimeout, setInterval. Stocare în localStorage.",
        homeworkLink: 'https://forms.gle/5b8AousENuttXzLY7',
        homeworkDue: "2023-04-13T12:00:00+03:00",
        availableOn: "2023-04-06T12:00:00+03:00"
      }
    ),
    new Lab(
      Lab8Component,
      {
        id: 8,
        title: "Introducere în Node.js și Express",
        subtitle: "Laboratorul 8",
        description: "Crearea unui proiect Node, instalarea pachetelor. Gestionarea rutelor și erorilor. Transmiterea de date către server.",
        homeworkLink: 'https://forms.gle/AtSHBqbF8zLpGrAQ7',
        homeworkDue: "2023-04-27T12:00:00+03:00",
        availableOn: "2023-04-13T12:00:00+03:00"
      }
    ),
    new Lab(
      Lab9Component,
      {
        id: 9,
        title: "Node.js: Template rendering. Încărcare de fișiere",
        subtitle: "Laboratorul 9",
        description: "Folosirea EJS pentru randarea de șabloane. Încărcare de fișiere.",
        homeworkLink: 'https://forms.gle/XQArQWf6kUU4GeDX8',
        homeworkDue: "2023-05-04T12:00:00+03:00",
        availableOn: "2023-04-27T12:00:00+03:00",
      }
    ),
    new Lab(
      Model1Component,
      {
        id: 10,
        title: "Model de examen 1",
        subtitle: "Model de examen",
        description: "Subiect dat la un examen anterior.",
        availableOn: "2023-05-04T12:00:00+03:00",
      }
    ),
    new Lab(
      Model2Component,
      {
        id: 11,
        title: "Model de examen 2",
        subtitle: "Model de examen",
        description: "(oare ce o fi?)",
        availableOn: "2023-05-11T12:00:00+03:00",
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
