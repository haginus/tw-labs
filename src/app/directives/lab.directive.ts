import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[labHost]',
})
export class LabDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
