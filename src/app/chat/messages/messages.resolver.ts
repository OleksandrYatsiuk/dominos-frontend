import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ChatDataService } from '../chat-data.service';
import { pluck } from 'rxjs/operators';
import { SocketService } from 'src/app/core/services/socket.service';

@Injectable()
export class MessagesResolver implements Resolve<any> {
  room: Observable<any>;

  constructor(private http: ChatDataService, private socket: SocketService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    return this.http.getItem(route.params.id);
  }
}
