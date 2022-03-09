import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab4',
  templateUrl: './lab4.component.html',
  styleUrls: ['./lab4.component.scss']
})
export class Lab4Component implements OnInit {

  constructor() { }

  arithmeticOperators: JsOperator[] = [
    new JsOperator('+', 'Adunare'),
    new JsOperator('-', 'Scădere'),
    new JsOperator('*', 'Înmulțire'),
    new JsOperator('**', 'Ridicare la putere'),
    new JsOperator('/', 'Împărțire'),
    new JsOperator('%', 'Modulo (restul împărțirii)'),
    new JsOperator('++', 'Incrementare'),
    new JsOperator('--', 'Decrementare'),
  ];

  assignmentOperators: JsOperator[] = [
    new JsOperator('=', null, null, null, "x = y"),
    new JsOperator('+=', null, null, null, "x += y // x = x + y"),
    new JsOperator('-=', null, null, null, "x -= y // x = x - y"),
    new JsOperator('*=', null, null, null, "x *= y // x = x * y"),
    new JsOperator('**=', null, null, null, "x **= y // x = x ** y"),
    new JsOperator('/=', null, null, null, "x /= y // x = x / y"),
    new JsOperator('%=', null, null, null, "x %= y // x = x % y"),
  ];

  comparisonOperators: JsOperator[] = [
    new JsOperator('==', 'Egal cu'),
    new JsOperator('===', 'Valoare și tip egale'),
    new JsOperator('!=', 'Diferit de'),
    new JsOperator('!==', 'Valoare și tip diferite de'),
    new JsOperator('>', 'Mai mare'),
    new JsOperator('<', 'Mai mic'),
    new JsOperator('>=', 'Mai mare sau egal'),
    new JsOperator('<=', 'Mai mic sau egal'),
    new JsOperator(
      '?', 
      'Operatorul ternal',
      "Returnează prima valoare dacă condiția e adevărată și pe a doua în caz contrar.",
      'condition ? value1 : value2',
      'x % 2 == 0 ? "par" : "impar"'
    ),
  ];

  logicalOperators: JsOperator[] = [
    new JsOperator('&&', 'Și'),
    new JsOperator('||', 'Sau'),
    new JsOperator('!', 'Not'),
  ];

  ngOnInit(): void {
  }

}

class JsOperator {
  constructor(public symbol: string, public name: string, public description?: string,
    public syntax?: string, public example?: string) {}
}
