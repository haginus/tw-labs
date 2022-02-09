import { Component, Input, OnInit } from '@angular/core';
import { ILabComponent } from 'src/app/lib/models/ILabComponent';
import { LabMeta } from 'src/app/lib/models/LabMeta';

@Component({
  selector: 'app-lab1',
  templateUrl: './lab1.component.html',
  styleUrls: ['./lab1.component.scss']
})
export class Lab1Component implements OnInit, ILabComponent {

  constructor() { }

  @Input() meta: LabMeta;

  ngOnInit(): void {
  }

}
