import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-homework-pack',
  templateUrl: './homework-pack.component.html',
  styleUrls: ['./homework-pack.component.scss']
})
export class HomeworkPackComponent implements OnInit {

  constructor() { }

  @Input() src: string;

  ngOnInit(): void {
  }

  download() {
    let link = document.createElement("a");
    link.download = "";
    link.href = this.src;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
