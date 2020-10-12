import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
import { UserService } from 'src/app/core/services/user.service';
import { ChatDataService } from '../chat-data.service';
import { Router } from '@angular/router';
import { UserManagementDataService } from 'src/app/core/services/user-management-data.service';
import { User } from 'src/app/auth/auth.model';
import { Message, Event } from '../../core/models/message.model';
import { Room } from '../chat.interface';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public user: User;
  public ioConnection: any;
  public messages: Message[] = [];
  public messageContent: string;
  public rooms: Room[];
  public roomOpened = false;
  users: any;
  constructor(private socketService: SocketService,
    private userService: UserService,
    public roomService: ChatDataService,
    public router: Router, private http: UserManagementDataService) { }

  public getRooms() {
    this.roomService.getData({ page: 1, limit: 20, sort: 'updatedAt' }).subscribe(rooms => {
      this.rooms = rooms; console.log(rooms);
    });
  }
  public getUsers() {
    this.http.getUsers({ params: { page: 1, limit: 20 } })
      .pipe(pluck('result'))
      .subscribe(users => this.users = users)
  }

  public connectToRoom(room) {
    this.roomOpened = true
    this.router.navigateByUrl('/chat/' + room.id)
  }

  ngOnInit(): void {
    this.socketService.initSocket();
    this.getRooms();
    this.getUsers();
    this.userService.currentUser.subscribe(user => { if (user) { this.user = user } })
  }
  private initIoConnection(room: Room): void {

    this.ioConnection = this.socketService.onMessage()
      .subscribe((messages: any) => {
        this.messages = messages
      });


    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public createRoom(user: any): void {
    const room: Room = {
      sender: this.user,
      receiver: user
    }
    this.socketService.createRoom(room)
      .subscribe(room => this.router.navigateByUrl('/chat/' + room));
    // this.roomOpened = true;
  }

}
