import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Message } from '../message.model'
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit { // Add OnInit
  messages: Message[] = []
  @Output() selectedMessage = new EventEmitter<Message>()

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();

    console.log(this.messages)

    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );

    if (this.messages.length > 0) {
      this.messageService.messageSelectedEvent.emit(this.messages[0]);
    }
  }
}