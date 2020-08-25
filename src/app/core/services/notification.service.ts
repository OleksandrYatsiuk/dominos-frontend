import { Injectable } from '@angular/core';

export interface ToastConfig {
  class?: string;
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  toasts: any[] = [];

  constructor() { }

  private show(message: string, options: ToastConfig = {}): void {
    this.toasts.push({ message, ...options });
  }

  public showSuccess(message: string, autoClose = true): void {
    this.show(message, {
      class: 'bg-success text-light',
      autoClose
    })
  }

  public showDanger(message: string, autoClose = true): void {
    this.show(message, { class: 'bg-danger text-light', autoClose })
  }

  public remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
