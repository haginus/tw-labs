import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Subscription, switchMap } from 'rxjs';
import { Gist } from 'src/app/lib/models/Gist';
import { GistFile } from 'src/app/lib/models/GistFile';
import { GistService } from 'src/app/services/gist.service';

@Component({
  selector: 'app-code-example',
  templateUrl: './code-example.component.html',
  styleUrls: ['./code-example.component.scss']
})
export class CodeExampleComponent implements OnInit, OnDestroy {

  constructor(private gistService: GistService) { }

  @Input('gistId') gistId: string;

  @ViewChild('resultFrame') resultFrame: ElementRef;

  gist!: Gist;

  srcChanged: boolean = false;
  firstLoad: boolean = true;

  subscription!: Subscription;

  filesLoaded: boolean = false;
  gistFiles: GistFileEnritched[];

  ngOnInit(): void {
    this.subscription = this.gistService.getGist(this.gistId)
      .pipe(
        switchMap(gist => {
          this.gist = gist;
          return combineLatest(gist.files.map(file => this.gistService.getGistFile(this.gistId, file)));
        })
      ).subscribe(files => {
        this.gistFiles = files.map(file => ({
          ...file,
          label: this.getFileLabel(file),
          language: this.getFileLanguage(file)
        }));
        this.filesLoaded = true;
        this.setIframe();
      });
  }

  setIframe() {
    if (!this.gist.result) return;
    const htmlCode = this.gistFiles.find(file => file.fileType == 'html')?.content;

    const cssCode = this.gistFiles
      .filter(file => file.fileType == 'css')
      .reduce((acc, jsFile) => acc + `<style>${jsFile.content || ''}</style>`, '');
    
    const jsCode = this.gistFiles
      .filter(file => file.fileType == 'js')
      .reduce((acc, jsFile) => acc + `<script>${jsFile.content || ''}<\/script>`, '');

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
    iframe.src = '';
    iframe.onload = () => {
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(content);
      iframe.contentWindow.document.close();
      this.srcChanged = false;
      iframe.onload = () => {};
    }
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
  }

  getFileLanguage(gistFile: GistFile) {
    const langs = {
      'html': 'xml',
      'css': 'css',
      'js': 'javascript',
      'ts': 'typescript'
    };
    return [langs[gistFile.fileType]];
  }

  getFileLabel(gistFile: GistFile) {
    return this.gist.showFileNames ? gistFile.name : gistFile.fileType.toLocaleUpperCase();
  } 
}

interface GistFileEnritched extends GistFile {
  label: string;
  language: string[];
}
