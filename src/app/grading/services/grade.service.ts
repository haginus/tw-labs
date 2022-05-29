import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class GradeService {
  constructor(private db: NgxIndexedDBService) { }

  getGrades(): Observable<Grade[]> {
    return this.db.getAll<Grade>('grades').pipe(
      map(grades => grades.sort((a, b) => b.id - a.id)),
      tap(grades => {
        const requirements = this.getRequirements();
        grades.forEach(grade => {
          grade.projectGrade.forEach((projectGrade, idx) => {
            projectGrade.requirement = projectGrade.requirement || requirements[idx];
          });
          this.updateGrade(grade).subscribe(() => {});
        });
      })
    );
  }

  getGrade(id: number) {
    return this.db.getByKey<Grade>('grades', id);
  }

  addGrade(grade: Grade) {
    return this.db.add<Grade>('grades', grade);
  }

  updateGrade(grade: Grade) {
    return this.db.update<Grade>('grades', grade);
  }

  deleteGrade(grade: Grade) {
    return this.db.delete('grades', grade.id);
  }

  getRequirements(): Requirement[] {
    return [
      new Requirement('Fișiere separate pentru HTML și CSS', 1),
      new Requirement('HTML: Elemente semantice', 1),
      new Requirement('CSS: Site responsive (media queries, unități relative)', 1),
      new Requirement('CSS: Folosirea majorității selectorilor CSS', 1),
      new Requirement('CSS: Folosirea majorității proprietăților CSS', 1),
      new Requirement('CSS: Folosirea flex și grid layouts', 1),
      new Requirement('CSS: Meniu drop-down', 2),
      new Requirement('CSS: Tranziții', 1),
      new Requirement('CSS: Animații', 1),
      new Requirement('Fișiere separate de JavaScript', 1),
      new Requirement('JS: Modificarea stilului unui element sau unui grup de elemente', 1),
      new Requirement('JS: Manipularea DOM-ului', 1),
      new Requirement('JS: Crearea și ștergerea de elemente', 1),
      new Requirement('JS: Inputuri și formulare', 1),
      new Requirement('JS: Folosirea setTimeout() și setInterval()', 1),
      new Requirement('JS: Folosirea LocalStorage', 1),
      new Requirement('JS: Folosirea a cel puțin o metodă din clasele Math, Array, String, Date', 1),
      new Requirement('JS: Schimbarea aleatorie a unor proprietăți', 1),
      new Requirement('JS: Evenimente', 1),
      new Requirement('JS: Folosirea metodelor getComputedStyle() și getBoundingClientRect()', 1),
      new Requirement('JS: Validarea datelor dintr-un formular folosind expresii regex', 1),
      new Requirement('Node: Cereri GET/POST', 2),
      new Requirement('Node: Cereri AJAX cu preluarea datelor din fișier JSON', 2),
      new Requirement('Node: Sesiuni', 1),
      new Requirement('Node: Template rendering', 2),
      new Requirement('Node: Pagina pentru erori 404', 1),
    ];
  }

  exportGrades() {
    this.getGrades().subscribe(grades => {
      const mappedGrades = grades.map(grade => {
        let projectGrade = 0;
        const requirements = grade.projectGrade.reduce((acc, curr) => {
          acc[curr.requirement.requirement] = curr.grade;
          projectGrade += curr.grade;
          return acc;
        }, {});
        return {
          id: grade.id,
          name: grade.person,
          email: grade.email,
          group: grade.group,
          labGrade: grade.labGrade,
          projectGrade: projectGrade,
          totalGrade: Math.ceil(grade.labGrade + projectGrade),
          ...requirements
        };
      });
      const json = JSON.stringify(mappedGrades);
      const blob = new Blob([json], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'grades.json';
      link.click();
    });
  }
}

export interface Grade {
  id: number;
  person: string;
  email: string;
  group: string;
  gitLink: string;
  labGrade: number;
  projectGrade: ProjectGrade[];
}

export class Requirement {
  constructor(public requirement: string, public maxGrade: number) { }
}

export class ProjectGrade {
  public requirement: Requirement;
  public grade: number;
  public observation: string;
  
  constructor(requirement: Requirement, grade: number, observation?: string) {
    this.requirement = requirement;
    this.grade = grade;
    this.observation = observation;
  }
}