import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GistService } from 'src/app/services/gist.service';

@Component({
  selector: 'app-code-example',
  templateUrl: './code-example.component.html',
  styleUrls: ['./code-example.component.scss']
})
export class CodeExampleComponent implements OnInit, OnDestroy {

  constructor(private gist: GistService) { }

  @Input('gistId') gistId: string;
  @Input('gistTitle') title: string;
  @Input('html') html: boolean;
  @Input('css') css: boolean;
  @Input('js') js: boolean;
  @Input('result') result: boolean;

  @ViewChild('resultFrame') resultFrame: ElementRef;

  htmlCode: string = null;
  cssCode: string = null;
  jsCode: string = null;

  loadedSnippets: number = 0;
  totalSnippets: number;

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const observables: [Observable<string>, string][] = [];
    if(this.html) {
      observables.push([this.gist.getGistFile(this.gistId, "html"), "html"]);
    }
    if(this.css) {
      observables.push([this.gist.getGistFile(this.gistId, "css"), "css"]);
    }
    if(this.js) {
      observables.push([this.gist.getGistFile(this.gistId, "js"), "js"]);
    }
    this.totalSnippets = observables.length;

    this.subscriptions = observables.map(item => {
      return item[0].subscribe(data => {
        this[item[1] + 'Code'] = data;
        this.loadedSnippets++;
        this.maybeSetIframe();
      });
    });
  }

  maybeSetIframe() {
    if(this.loadedSnippets < this.totalSnippets || !this.result) return;
    let jsCode = this.jsCode;
    let content = `
      <html>
        <head>
          <style>
          ${this.cssCode || ''}
          </style>
          <script>
          ${jsCode || ''}
          <\/script>
        </head>
        <body>
          ${this.htmlCode || ''}
        </body>
       
      </html>
    `;
    const iframe = this.resultFrame.nativeElement;
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(content);
    iframe.contentWindow.document.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

