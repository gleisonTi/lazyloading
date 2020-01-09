import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class InputFocusDirective {

  @Input() focus: boolean;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    if (this.focus) {
      setTimeout(() => {
        this.element.nativeElement.focus();
      }, 0);
    }
  }
}
