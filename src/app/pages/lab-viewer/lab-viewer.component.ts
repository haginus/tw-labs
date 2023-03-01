import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { LabDirective } from 'src/app/directives/lab.directive';
import { ILabComponent } from 'src/app/lib/models/ILabComponent';
import { Lab } from 'src/app/lib/models/Lab';
import { sluggify } from 'src/app/lib/util';
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
  @ViewChild('labContent') labContent: ElementRef<HTMLElement>;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  contents: TableOfContentsSection[] = [];
  private _flatContents: TableOfContentsSection[] = [];
  activeSection: TableOfContentsSection | null = null;

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
      }, 0);
  }

  loadLab() {
    const viewContainerRef = this.labHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<ILabComponent>(this.lab.component);
    componentRef.instance.meta = this.lab.meta;
    this.timePassed = !this.lab.meta.homeworkDue || new Date(this.lab.meta.homeworkDue).getTime() < Date.now();
    this.createTableOfContents();
  }

  createTableOfContents() {
    const content = this.labContent.nativeElement.children[0] as HTMLElement;
    this.contents = this._getSections(content);
    this._flatContents = this._flattenContents().reverse();
    if(window.location.hash) {
      const section = this._flatContents.find(section => section.slug == window.location.hash);
      window.addEventListener('load', () => {
        this.goToSection(section);
      });
    }
  }

  private _getSections(element: HTMLElement): TableOfContentsSection[] {
    return Array.from(element.querySelectorAll<HTMLElement>(":scope > section")).map(el => {
      const header = el.querySelector<HTMLElement>("h1, h2, h3, h4, h5, h6");
      const title = header?.textContent || 'Secțiune';
      return {
        title,
        slug: '#' + sluggify(title),
        element: el,
        subsections: this._getSections(el)
      }
    });
  }

  private _flattenContents(): TableOfContentsSection[] {
    return this.contents.flatMap(section => [section, ...section.subsections]);
  }

  getSectionLink(slug: string) {
    let url = window.location.href.split('#')[0];
    return url + slug;
  }

  goHome() {
    this.router.navigate(['']);
  }

  sendHomework() {
    window.open(this.lab.meta.homeworkLink, "_blank");
  }

  onScroll(event: Event) {
    const scrollTop = (event.target as HTMLElement).scrollTop;
    this.activeSection = this._flatContents.find(section => section.element.offsetTop <= scrollTop);
  }

  async goToSection(section: TableOfContentsSection) {
    if(!section) return;
    if(this.drawer?.opened) {
      await this.drawer?.close();
    }
    section.element.scrollIntoView({
      block: 'start',
      behavior: "smooth",
    });
  }

}

interface TableOfContentsSection {
  title: string;
  slug: string;
  element: HTMLElement;
  subsections: TableOfContentsSection[];
}
