import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Grade, GradeService, Requirement } from '../../services/grade.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  constructor(private gradeService: GradeService, private route: ActivatedRoute, private router: Router,
    private snackbar: MatSnackBar) { }

  gradeForm!: FormGroup;
  initialGrade?: Grade;
  requirements!: Requirement[];

  ngOnInit(): void {
    this.requirements = this.gradeService.getRequirements();
    this.route.params.pipe(
      switchMap(params => {
        if (params["id"]) {
          return this.gradeService.getGrade(+params["id"]);
        } else {
          return of(false);
        }
      })
    ).subscribe(grade => {
      if(grade == null) {
        this.router.navigate(["/grading"]);
      } else {
        if(grade == false) {
          this.generateForm();
        } else {
          this.initialGrade = grade as Grade;
          this.generateForm(this.initialGrade);
        }
      }
    })
    this.generateForm();
  }

  generateForm(grade?: Grade) {
    this.gradeForm = new FormGroup({
      person: new FormControl(grade?.person, [Validators.required]),
      email: new FormControl(grade?.email, [Validators.required]),
      labGrade: new FormControl(grade?.labGrade, [Validators.required, Validators.min(0), Validators.max(10)]),
      gitLink: new FormControl(grade?.gitLink, [Validators.required]),
      projectGrade: new FormArray([])
    });
    if(grade) {
      const arr = this.projectGrade;
      grade.projectGrade.forEach(grade => {
        const group = new FormGroup({
          requirement: new FormControl(grade.requirement.requirement),
          grade: new FormControl(grade.grade, [Validators.required]),
          observation: new FormControl(grade.observation)
        });
        arr.push(group);
      });
    } else {
      const arr = this.projectGrade;
      this.requirements.forEach(req => {
        const group = new FormGroup({
          requirement: new FormControl(req.requirement),
          grade: new FormControl(0, [Validators.required]),
          observation: new FormControl('')
        });
        arr.push(group);
      });
    }
  }

  saveGrade() {
    const grade = this.gradeForm.value;
    grade.projectGrade = grade.projectGrade.map(group => {
      const requirement = this.requirements.find(req => req.requirement === group.requirement);
      return { grade: group.grade, observation: group.observation, requirement };
    });

    if(this.initialGrade) {
      grade.id = this.initialGrade.id;
      this.gradeService.updateGrade(grade).subscribe(() => {
        this.snackbar.open("Notă salvată.");
      });
    } else {
      this.gradeService.addGrade(grade).subscribe(grade => {
        this.initialGrade = grade;
        this.generateForm(grade);
        this.snackbar.open("Notă salvată.");
      });
    }
  }

  get projectGrade() {
    return this.gradeForm.get('projectGrade') as FormArray;
  }

  getRequirement(control: AbstractControl) {
    const req = this.requirements.find(req => req.requirement === control.get('requirement').value);
    return req;
  }

  getRequirementFormGroup(control: AbstractControl) {
    return control as FormGroup;
  }

  get totalProjectGrade() {
    return this.projectGrade.controls.reduce((acc, curr) => {
      const grade = curr.get('grade').value;
      return acc + grade;
    }, 0);
  }

  get totalGrade() {
    return this.totalProjectGrade + this.gradeForm.get('labGrade').value;
  }

  get gradeGitLink() {
    return this.gradeForm.get('gitLink');
  }
}
