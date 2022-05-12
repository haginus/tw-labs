import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Grade, GradeService } from '../../services/grade.service';

@Component({
  selector: 'app-print-grade',
  templateUrl: './print-grade.component.html',
  styleUrls: ['./print-grade.component.scss']
})
export class PrintGradeComponent implements AfterViewInit {

  constructor(private gradeService: GradeService, private route: ActivatedRoute, private router: Router) { }

  grade: Grade;

  ngAfterViewInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        return this.gradeService.getGrade(+params["id"]);
      })
    ).subscribe(grade => {
      if(grade == null) {
        this.router.navigate(["/grading"]);
      }
      this.grade = grade;
      setTimeout(() => {
        const el = document.querySelector('app-print-grade');
        document.body.prepend(el);
        (document.querySelector('app-root') as HTMLElement).style.display = 'none';
        document.title = `Fișă ${grade.person}`;
        window.print();
        window.close();
      }, 200);
    });
  }

  

  getTotalGrade(grade: Grade) {
    return grade.labGrade + this.getTotalProjectGrade(grade);
  }

  getTotalProjectGrade(grade: Grade) {
    return grade.projectGrade.reduce((acc, curr) => acc + curr.grade, 0);
  }

}
