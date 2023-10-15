import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[columnHeader]',
  standalone: true
})
export class ColumnHeaderDirective {

  @Input('columnHeader') templateId = ''; 

  public ref = inject(TemplateRef<any>)

  constructor() { }

}
