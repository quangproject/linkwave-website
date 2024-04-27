import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  getMessage(): Observable<string> {
    return this.socket.fromEvent('chat');
  }
}
