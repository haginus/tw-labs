import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Subscription, switchMap } from 'rxjs';
import { Gist } from 'src/app/lib/models/Gist';
import { GistFile } from 'src/app/lib/models/GistFile';
import { GistService } from 'src/app/services/gist.service';

@Component({
  selector: 'app-code-example',
  templateUrl: './code-example.component.html',
  styleUrls: ['./code-example.component.scss']
})
export class CodeExampleComponent implements AfterViewInit, OnDestroy {

  constructor(private gistService: GistService) { }

  @Input('gistId') gistId: string;
  @Input('external') external: boolean = false;
  @Input('defaultTitle') defaultTitle: string = null;

  @ViewChild('resultFrame') resultFrame: ElementRef;
  @ViewChild('consoleCt') consoleCt: ElementRef;

  gist!: Gist;

  srcChanged: boolean = false;
  firstLoad: boolean = true;

  subscription!: Subscription;

  filesLoaded: boolean = false;
  filesError = false;
  gistFiles: GistFileEnritched[];

  consoleLogs: ConsoleLog[] = [];
  onlyJs: boolean = false;

  private _listenFn: any;

  ngAfterViewInit(): void {
    this.subscription = this.gistService.getGist(this.gistId, this.external)
      .pipe(
        switchMap(gist => {
          this.gist = gist;
          this.filesError = !gist;
          return combineLatest(gist?.files.map(file => this.gistService.getGistFile(this.gistId, file, this.external)) || []);
        })
      ).subscribe(files => {
        this.gistFiles = files.map(file => ({
          ...file,
          label: this.getFileLabel(file),
          language: this.getFileLanguage(file)
        }));
        this.filesLoaded = this.gistFiles.length > 0 && this.gistFiles.every(file => file.content != null);
        if(this.gist.result && !this.external) {
          window.addEventListener("message", this.getSetConsoleLogFunction());
        }
        this.setIframe();
      });
  }

  setIframe() {
    if (!this.gist.result) return;
    if(this.external) {
      this.resultFrame.nativeElement.src = this.gistService.getExternalGistUrl(this.gistId);
      return;
    }
    this.consoleLogs = [];
    const htmlCode = this.gistFiles.find(file => file.fileType == 'html')?.content;

    const cssCode = this.gistFiles
      .filter(file => file.fileType == 'css')
      .reduce((acc, jsFile) => acc + `<style>${jsFile.content || ''}</style>`, '');

    const jsCode = this.prepareJsCode(
      this.gistFiles
        .filter(file => file.fileType == 'js')
        .reduce((acc, jsFile) => acc + `<script>${jsFile.content || ''}<\/script>`, '')
    );

    let content = `
      <html>
        <head>
          ${cssCode || ''}
          ${jsCode || ''}
        </head>
        <body>
          ${htmlCode || ''}
        </body>
      </html>
    `;
    const iframe = this.resultFrame.nativeElement;
    this.firstLoad = true;
    this.onlyJs = jsCode && !htmlCode;
    iframe.src = '';
    setTimeout(() => {
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(content);
      iframe.contentWindow.document.close();
    }, 100);
  }

  onSrcChange() {
    if (this.firstLoad) {
      this.firstLoad = false;
      return;
    }
    this.srcChanged = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if(this.gist?.result) {
      window.removeEventListener("message", this.getSetConsoleLogFunction());
    }
  }

  getFileLanguage(gistFile: GistFile) {
    const langs = {
      'html': 'xml',
      'css': 'css',
      'js': 'javascript',
      'ts': 'typescript',
      'ejs': 'xml'
    };
    return [langs[gistFile.fileType]];
  }

  getFileLabel(gistFile: GistFile) {
    return this.gist.showFileNames ? gistFile.name : gistFile.fileType.toLocaleUpperCase();
  }

  prepareJsCode(code: string) {
    let result = code.replace(/console.log/g, 'sendLog');
    const sendLoadEvent = `
      window.parent.postMessage({ message: 'onload', from: '${this.gistId}' }, window.origin);
      observer.observe(document.body, observerConfig);
    `;
    if(result.includes("window.onload")) {
      const re = /window\.onload\s*=\s*(function)*\(\)\s*(=>)*\s*{(?<body>(.|\n)*)}/gm;
      const match = re.exec(result);
      const newBody = sendLoadEvent + match.groups['body'];
      const newFn = `window.onload = () => { ${newBody}}`;
      result = result.replace(re, newFn);
    } else {
      result += `<script>window.onload = () => {${sendLoadEvent}}<\/script>`;
    }
    let sendLogFn = `
      <script>
        let from = '${this.gistId}';
        function sendLog(...args) {
          window.parent.postMessage({ message: 'consoleLog', value: args, from }, window.origin);
        }
      <\/script>
    `;
    let mutationObserserFn = `
      <script>
        function observeCallback() {
          window.parent.postMessage({ message: 'mutation', from }, window.origin);
        }
        const observer = new MutationObserver(observeCallback);
        const observerConfig = { attributes: true, childList: true, subtree: true };
      <\/script>
    `;
    return mutationObserserFn + sendLogFn + result;
  }

  getSetConsoleLogFunction() {
    if(this._listenFn) return this._listenFn;
    this._listenFn = (event: any) => {
      if(event.data?.from != this.gistId) return;
      if(event.origin != window.origin) return;
      const message = event.data?.message;
      if(message == 'consoleLog') {
        this.handleConsoleLog(event);
      } else if(message == 'onload') {
        this.handleOnload();
      } else if(message == 'mutation') {
        this.calculateHeight();
      }
    }
    return this._listenFn;
  }

  handleConsoleLog(event: any) {
    let values: any[] = (event.data?.value || []).map(value => {
      if(typeof value == 'object') {
        return JSON.stringify(value, null, 2);
      }
      return value;
    });
    this.consoleLogs.push(values);
    setTimeout(() => {
      const el = this.consoleCt.nativeElement;
      el.scrollTop = el.scrollHeight;
    }, 1);
  }

  calculateHeight() {
    const iframe = this.resultFrame.nativeElement;
    const maxHeight = window.innerHeight / 2;
    const scrollHeight = iframe.contentDocument.querySelector('body').scrollHeight;
    iframe.parentElement.style.minHeight = Math.min(scrollHeight, maxHeight) + "px";
  }

  handleOnload() {
    this.srcChanged = false;
    this.calculateHeight();
  }
}

interface GistFileEnritched extends GistFile {
  label: string;
  language: string[];
}

type ConsoleLog = (number | string)[];
