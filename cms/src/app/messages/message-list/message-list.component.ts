import { Component, EventEmitter, Output } from '@angular/core';
import Message from '../message.model'
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = []
  @Output() selectedMessage = new EventEmitter<Message>()

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();

    if (this.messages.length > 0) {
      this.messageService.messageSelectedEvent.emit(this.messages[0]);
    }
  }

  onAddMessage(message: Message) {
    this.messages.push(message)
  }

}