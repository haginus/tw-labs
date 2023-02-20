import { Component, Input, OnInit } from '@angular/core';
import { ILabComponent } from 'src/app/lib/models/ILabComponent';

@Component({
  selector: 'app-lab1',
  templateUrl: './lab1.component.html',
  styleUrls: ['./lab1.component.scss']
})
export class Lab1Component implements OnInit, ILabComponent {

  constructor() { }

  commonElements: CommonElement[] = [
    new CommonElement('div', true, 'Element generic care se extinde pe toată linia (display: block)'),
    new CommonElement('span', true, 'Element generic care este inline (display: inline)'),
    new CommonElement('p', true, 'Paragraf'),
    new CommonElement('b', true, 'Text boldat'),
    new CommonElement('i', true, 'Text italic'),
    new CommonElement('u', true, 'Text subliniat'),
    new CommonElement('br', false, '(Break line) Inserează un sfârșit de linie.'),
    new CommonElement(['h1', 'h6'], true, 'Headere - există 6, mărimea fontului scăzând de la primul la ultimul.'),
    new CommonElement('a', true, '(Anchor) Definește un link câtre o altă pagină sau o secțiune din document.'),
    new CommonElement('button', true, 'Buton'),
    new CommonElement('img', false, 'Permite afișarea unei imagini prin specificarea fișierului sursă.'),
    new CommonElement('video', true, 'Permite vizionarea unui videoclip prin specificarea fișierului sursă.'),
    new CommonElement('audio', true, 'Permite ascultarea unui fișier audio prin specificarea fișierului sursă.'),
  ];

  globalAttributes: GlobalAttribute[] = [
    new GlobalAttribute('id', 'Permite setarea unui identificator unic pentru elemenul HTML.'),
    new GlobalAttribute('class', 'Permite specificarea uneia sau mai multor (separate prin spațiu) nume de clase CSS pentru un element.'),
    new GlobalAttribute('style', 'Permite adăugarea de stiluri CSS în linie.'),
    new GlobalAttribute('title', 'Permite adăugarea unui titlu pentru elemtul HTML. Acesta apare când mouse-ul e deasupra elementului.'),
    new GlobalAttribute('hidden', 'Ascunde un element.'),
    new GlobalAttribute('tabindex', '(Accesibilitate) Specifică ordinea de focusare la navigarea prin tasta TAB.'),
    new GlobalAttribute('data-*', 'Permite stocarea unor date de către programator, care pot fi accesate/modificate prin JavaScript.'),
  ]

  semanticElements: CommonElement[] = [
    new CommonElement('header', true, 'Antetul paginii web'),
    new CommonElement('nav', true, 'Meniul de navigare'),
    new CommonElement('main', true, 'Conținutul principal al paginii'),
    new CommonElement('section', true, 'O secțiune a paginii; grupare tematică a conținutului'),
    new CommonElement('article', true, 'Un articol; conținut independent, de sine stătător (ex. o postare pe blog)'),
    new CommonElement('aside', true, 'Conținut ce se află deoparte față de conținutl principal (de exemplu un sidebar)'),
    new CommonElement('footer', true, 'Subsolul paginii web'),
  ];

  ngOnInit(): void {
  }

  getTagClosing(tag: CommonElement) {
    if(Array.isArray(tag.tagName)) {
      return tag.tagName
        .map(tagName => tag.isContainer ? `<${tagName}></${tagName}>` : `<${tagName} />`)
        .join(' .. ');
    }
    return tag.isContainer ? `<${tag.tagName}></${tag.tagName}>` : `<${tag.tagName} />`;
  }

}

class CommonElement {
  constructor(public tagName: string | string[], public isContainer: boolean, public description: string) { }
}

class GlobalAttribute {
  constructor(public attributeName: string, public description: string) { }
}
