import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { LabDirective } from 'src/app/directives/lab.directive';
import { ILabComponent } from 'src/app/lib/models/ILabComponent';
import { Lab } from 'src/app/lib/models/Lab';
import { LabService } from 'src/app/services/lab.service';

@Component({
  selector: 'app-lab-viewer',
  templateUrl: './lab-viewer.component.html',
  styleUrls: ['./lab-viewer.component.scss']
})
export class LabViewerComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private router: Router, private labService: LabService) { }

  ngOnInit(): void {
  }

  lab!: Lab;
  timePassed: boolean = false;
  @ViewChild(LabDirective, { static: true }) labHost!: LabDirective;

  ngAfterViewInit(): void {
  setTimeout(() => {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const labId = Number(params.get("id"));
          return this.labService.getLab(labId);
        })
      )
      .subscribe(lab => {
        if(!lab) {
          this.goHome();
        } else {
          this.lab = lab;
          this.loadLab();
        }
      });
    }, 0)
  }

  loadLab() {
    const viewContainerRef = this.labHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<ILabComponent>(this.lab.component);
    componentRef.instance.meta = this.lab.meta;
    this.timePassed = !this.lab.meta.homeworkDue || new Date(this.lab.meta.homeworkDue).getTime() < Date.now();
  }

  goHome() {
    this.router.navigate(['']);
  }

  sendHomework() {
    window.open(this.lab.meta.homeworkLink, "_blank");
  }

}
