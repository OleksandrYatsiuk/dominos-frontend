import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from '../shared';
import { SocketService } from '../core/services/socket.service';
import { MessagesComponent } from './messages/messages.component';
import { MessagesResolver } from './messages/messages.resolver';
import { ChatDataService } from './chat-data.service';
import { UsersListComponent } from './users-list/users-list.component';



@NgModule({
  declarations: [
    ChatComponent,
    MessagesComponent,
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChatRoutingModule
  ],
  providers: [
    SocketService, MessagesResolver, ChatDataService
  ]
})
export class ChatModule { }
