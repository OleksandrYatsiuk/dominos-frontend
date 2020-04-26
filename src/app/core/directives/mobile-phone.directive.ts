import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[mobile-phone]'
})
export class MobilePhoneDirective {

  constructor(private element: ElementRef) { }
  @HostBinding('style.border')
  border: string;

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 13) {
      trimmed = trimmed.substring(0, 13)
    }
    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 3) {
      numbers.push(trimmed.substring(i, i + 3));
    }
    input.value = numbers.join(' ');
  }



}
