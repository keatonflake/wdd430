import { EventEmitter, Injectable } from '@angular/core';
import Message from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = []
  maxMessageId: number;
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new EventEmitter<Message[]>()

  constructor(private http: HttpClient) {
    this.messages = this.getMessages()
    this.maxMessageId = this.getMaxId()
  }

  getMessages(): Message[] {
    this.http.get<Message[]>('https://wdd-430-cms-be399-default-rtdb.firebaseio.com/messages.json')
      .subscribe({
        next: (messages: Message[]) => {
          console.log(messages)
          this.messages = messages || [];
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.emit(this.messages.slice())
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    return this.messages.slice()
  }

  getMessage(id: string): Message | null {
    return this.messages.find(message => message.id === id) || null
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message) => {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://wdd-430-cms-be399-default-rtdb.firebaseio.com/messages.json', messages, { headers: headers })
      .subscribe({
        next: () => {
          this.messageChangedEvent.emit(this.messages.slice())
        }
      })
  }

  addMessage(message: Message) {
    this.maxMessageId++;
    message.id = this.maxMessageId.toString();

    this.messages.push(message)
    console.log('Message added:', message);
    this.storeMessages()
  }
}