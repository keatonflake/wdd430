import { Component } from '@angular/core';
import Message from '../message.model'

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages = [
    new Message("1", 'Work', "You Good to work tomorrow?", "Joey"),
    new Message("2", 'Food', "You Good to work tomorrow?", "Jan"),
    new Message("3", 'Fun', "You Good to work tomorrow?", "Bob"),
    new Message("4", 'Play', "You Good to work tomorrow?", "Bill"),
    new Message("5", 'IDK', "You Good to work tomorrow?", "Jose"),
  ]


  onAddMessage(message: Message) {
    this.messages.push(message)
  }

}