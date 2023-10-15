import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[columnCell]',
  standalone: true
})
export class ColumnCellDirective {

  @Input('columnCell') templateId = ''; 

  public ref = inject(TemplateRef<any>)

  constructor() { }

}
