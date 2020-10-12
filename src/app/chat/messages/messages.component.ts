import { Component, OnInit, ViewChild, ElementRef, AfterContentChecked, Output, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
import { Message, Event } from 'src/app/core/models/message.model';
import { User } from 'src/app/auth/auth.model';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ChatDataService } from '../chat-data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit, AfterContentChecked, OnDestroy {
  public user: User
  public room = this.route.snapshot.params.id
  public ioConnection: any;
  public messages: Message[] = [];
  public messageContent: string;
  id: string;
  constructor(private socketService: SocketService, public userService: UserService,
    private route: ActivatedRoute, private http: ChatDataService) {
    console.log(route);
    // this.id = route.snapshot.data.chat;
    // console.log(this.route.snapshot.data);
    // this.socketService.getMessages(route.snapshot.params.id);
    // this.socketService.onMessage()
    //   .subscribe((messages: any) => {
    //     this.messages = messages;
    //     console.log(messages);
    //     this.scrollToBottom();
    //   });
  }
  ngOnDestroy(): void {
    this.messageContent = null;
    this.messages = [];
  }

  ngOnInit(): void {
    console.log(this.route);

    // this.http.getItem(this.id).subscribe(res => console.log(res));
    this.userService.currentUser.subscribe(user => this.user = user)
    this.socketService.initSocket();
    this.initIoConnection();
    this.socketService.getMessages(this.room);
    this.socketService.onMessage()
      .subscribe((messages: any) => {
        this.messages = messages;
        this.scrollToBottom();
      });
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  ngAfterContentChecked(): void {
    this.scrollToBottom();
  }

  private initIoConnection(): void {

    this.ioConnection = this.socketService.onMessage()
      .subscribe((messages: any) => {
        this.messages = messages;
        this.scrollToBottom();
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

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    this.socketService.sendToRoom({
      user: {
        id: this.user.id,
        fullName: this.user.fullName,
        image: this.user.image,
      },
      message: message,
      time: Date.now(),
      room: this.room
    });
    this.messageContent = null;
  }

  public remove(room): void {
    if (!room) {
      return;
    }
    this.socketService.removeMessage(room)
    this.socketService.onRemoveMessage()
      .subscribe((messages: any) => {
        this.messages = messages
        this.scrollToBottom();
      });
    this.scrollToBottom();
  }
}
