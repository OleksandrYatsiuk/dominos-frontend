import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CreatePizzaGuard implements CanActivate {
  constructor(
    private notification: NotificationService
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (localStorage.getItem('auth')) {
      return true;
    } else {
      this.notification.open({ data: 'You are have not have permissions!' });
      return false;
    }
  }
}
