import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';

@Injectable()
export class CreatePizzaGuard implements CanActivate {
  constructor(
    private storage: UserService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.storage.isAuthorized()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
