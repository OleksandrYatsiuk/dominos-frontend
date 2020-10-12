import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Message, Event } from '../models/message.model';
import { Observable } from 'rxjs';
import { Room } from 'src/app/chat/chat.interface';

@Injectable({ providedIn: 'root' })

export class SocketService {
  public socket: SocketIOClient.Socket
  public url = 'http://localhost:5000';
  constructor() { }

  public initSocket() {
    this.socket = socketIo(this.url);
  }

  public send(message: any): void {
    this.socket.emit('message', message);
  }
  public join(room: string): void {
    this.socket.emit('joinToRoom', room)
  }
  public sendToRoom(data: any): void {
    this.socket.emit('roomMessage', data);
  }
  public getMessages(room: string): void {
    this.socket.emit('roomMessage', room);
  }
  public removeMessage(message: any): void {
    this.socket.emit('remove', message);
  }

  public getRoom(room: string) {
    this.socket.emit('getRoom', room);
    return new Observable<any>(observer => {
      this.socket.on('getRoom', (data: any) => observer.next(data));
    });
  }

  public createRoom(room: Room) {
    this.socket.emit('createRoom', room);
    return new Observable<any>(observer => {
      this.socket.on('createRoom', (data: any) => observer.next(data));
    });
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('roomMessage', (data: any) => observer.next(data));
    });
  }

  public onRemoveMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('remove', (data: any) => observer.next(data));
    });
  }


  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

}
