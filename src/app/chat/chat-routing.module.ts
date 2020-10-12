import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesResolver } from './messages/messages.resolver';

const routers: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [{
      path: ':id',
      component: MessagesComponent,
      resolve: { room: MessagesResolver }
    }]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routers)
  ],
  exports: [
    RouterModule
  ],
  providers: [MessagesResolver]

})
export class ChatRoutingModule { }
