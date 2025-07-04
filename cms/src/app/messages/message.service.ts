import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs'; // Use Subject instead of EventEmitter for services


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = []
  maxMessageId: number;
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new Subject<Message[]>()

  constructor(private http: HttpClient) {
    this.messages = [];
    this.maxMessageId = 0;
    this.getMessages();
  }

  getMessages(): Message[] {
    this.http.get<Message[]>('http://localhost:3000/messages')
      .subscribe({
        next: (messages: Message[]) => {
          console.log("Messages received from backend:", messages)
          this.messages = messages || [];
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice())
        },
        error: (error: any) => {
          console.log("Error fetching messages:", error)
        }
      })
    return this.messages.slice()
  }

  getMessage(id: string): Message | null {
    return this.messages.find(message => message.id === id) || null
  }

  getMaxId(): number {
    let maxId = 0;
    if (this.messages && this.messages.length > 0) {
      this.messages.forEach((message) => {
        if (message && message.id) {
          const currentId = +message.id;
          if (currentId > maxId) {
            maxId = currentId;
          }
        }
      });
    }
    return maxId;
  }

  storeMessages() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('http://localhost:3000/messages', this.messages, { headers: headers })
      .subscribe({
        next: () => {
          this.messageChangedEvent.next(this.messages.slice())
        }
      })
  }

  addMessage(message: Message) {
    if (!message) {
      return
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    this.http.post<Message>('http://localhost:3000/messages', message, { headers: headers })
      .subscribe({
        next: (newMessage: Message) => {
          console.log('Message added:', newMessage);
          this.messages.push(newMessage);
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (error: any) => {
          console.log('Add message failed:', error);
        }
      });
  }
}