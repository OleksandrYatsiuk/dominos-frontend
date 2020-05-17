import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appMenu]'
})
export class MenuDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }
  @HostListener('window:resize', [])
  ngAfterViewInit() {
    if (window.innerWidth < 840 || !window.navigator.userAgent.includes('Chrome')) {
      this.element.nativeElement.style.display = 'none';
      document.querySelector('.mini-menu')['style'].display = 'block';
    } else {
      this.element.nativeElement.style.display = 'block';
      document.querySelector('.mini-menu')['style'].display = 'none';
    }
  }
}
