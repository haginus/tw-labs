import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Lab1Component } from '../labs/lab1/lab1.component';
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
          title: "HTML. Inducere în CSS",
          subtitle: "Laboratorul 1",
          description: "Scurtă recapitulare a cunoștințelor de HTML din liceu și atribute CSS de bază."
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
