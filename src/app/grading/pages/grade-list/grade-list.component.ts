import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Grade, GradeService } from '../../services/grade.service';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {

  constructor(private gradeService: GradeService) { }

  performedActions: BehaviorSubject<string> = new BehaviorSubject('');

  grades$ = this.performedActions.pipe(switchMap(_ => this.gradeService.getGrades()));

  ngOnInit(): void {

  }

  getTotalGrade(grade: Grade) {
    return grade.labGrade + this.getTotalProjectGrade(grade);
  }

  getTotalProjectGrade(grade: Grade) {
    return grade.projectGrade.reduce((acc, curr) => acc + curr.grade, 0);
  }

  deleteGrade(grade: Grade) {
    if(!confirm("Ștergeți nota?")) return;
    this.gradeService.deleteGrade(grade).subscribe(result => {
      this.performedActions.next('delete');
    });
  }

  viewCode(grade: Grade) {
    window.open("//" + grade.gitLink, "_blank");
  }

}
