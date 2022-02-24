import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab2',
  templateUrl: './lab2.component.html',
  styleUrls: ['./lab2.component.scss']
})
export class Lab2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  absoluteUnits: [string, string, string][] = [
    ['cm', 'Centimetri', '1cm = 37.8px = 25.2/64in'],
    ['mm', 'Milimetri', '1mm = 1/10cm'],
    ['Q', 'sfert-milimentri', '1Q = 1/4mm = 1/40cm'],
    ['in', 'Inci', '1in = 2.54cm = 96px'],
    ['pc', 'Picas', '1pc = 1/6in'],
    ['pt', 'Puncte', '1pt = 1/72in'],
    ['px', 'Pixeli', '1px = 1/96in'],
  ]

  relativeUnits: [string, string][] = [
    ['em', 'Mărimea fontului părintelui în cazul proprietăților tipografice precum font-size; mărimea fontului elementului curent pentru alte proprietăți.'],
    ['rem', 'Mărimea fontului elementului rădăcină.'],
    ['vw', '1% din lungimea viewport-ului.'],
    ['vh', '1% din înălțimea viewport-ului.'],
    ['vmin', '1% din cea mai mică dimensiune a viewport-ului.'],
    ['vmax', '1% din cea mai mare dimensiune a viewport-ului.'],

  ]

}
