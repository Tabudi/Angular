import { Directive , Input } from '@angular/core';

@Directive({
  selector: '[field-length]',

  host: {
    '(keypress)': '_onKeypress($event)',
  }
})
export class FieldLengthDirective {

  constructor() { }
  @Input('field-length') limitTo; 
      _onKeypress(e) {
         const limit = +this.limitTo;
         if (e.target.value.length === limit) e.preventDefault();
      }

}
