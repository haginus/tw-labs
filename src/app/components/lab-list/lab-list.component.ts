import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from 'src/app/lib/models/Lab';
import { LabService } from 'src/app/services/lab.service';

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.scss']
})
export class LabListComponent implements OnInit {

  constructor(private labService: LabService, private router: Router) { }

  ngOnInit(): void {
  }

  labs$ = this.labService.getLabs();

  goToLab(lab: Lab) {
    this.router.navigate(['labs', lab.meta.id]);
  }

}
