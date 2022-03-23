import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab6',
  templateUrl: './lab6.component.html',
  styleUrls: ['./lab6.component.scss']
})
export class Lab6Component implements OnInit {

  constructor() { }

  inputAttributes: InputAttribute[] = [
    new InputAttribute('required', 'Completarea câmpului este obligatorie.'),
    new InputAttribute('readonly', 'Conținutul din câmp poate fi văzut și selectat de către utilizator, dar nu poate fi modificat.'),
    new InputAttribute('disabled', 'Câmpul este dezactivat. Acesta nu poate fi modificat, iar la trimiterea formularului valoarea acestuia nu va fi trimisă.'),
    new InputAttribute('name', 'Numele câmpului. Din moment ce formularul este transmis către server într-o manieră cheie-valoare, setarea acestui atribut este importantă, deoarece reprezintă cheia.'),
    new InputAttribute('min', 'Valoarea din câmp nu poate fi mai mică decât valoarea setată în acest atribut.', 'number, range, date, datetime-local.'),
    new InputAttribute('max', 'Valoarea din câmp nu poate fi mai mare decât valoarea setată în acest atribut.', 'number, range, date, datetime-local.'),
    new InputAttribute('maxlength', 'Lungimea textului nu poate fi mai mare decât valoarea setată.'),
    new InputAttribute('pattern', 'Specifică o expresie regulată cu care conținutul câmpului este verificat la trimiterea formularului.', 'text, date, search, url, tel, email și password.'),
    new InputAttribute('placeholder', 'Text afișat când câmpul este necompletat.'),
    new InputAttribute('multiple', 'Se poate introduce mai mult de o valoare în câmp.', 'file și email.'),
  ];

  ngOnInit(): void {
  }

}

class InputAttribute {
  constructor(public name: string, public description: string, public availableFor?: string) {}
}
