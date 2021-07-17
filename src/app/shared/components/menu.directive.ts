import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostListener, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';

@Directive({
  selector: '[appMenu]'
})
export class MenuDirective implements AfterViewInit {
  isBrowser: boolean;

  constructor(private element: ElementRef, @Inject(PLATFORM_ID) private _pid: any) {
    this.isBrowser = isPlatformBrowser(_pid);
  }
  @HostListener('window:resize', [])
  ngAfterViewInit() {
    if (this.isBrowser) {
      if (window.innerWidth < 840 || !window.navigator.userAgent.includes('Mozilla' || 'Chrome')) {
        this.element.nativeElement.style.display = 'none';
        document.querySelector('.mini-menu')['style'].display = 'block';
      } else {
        this.element.nativeElement.style.display = 'block';
        document.querySelector('.mini-menu')['style'].display = 'none';
      }
    }

  }
}
