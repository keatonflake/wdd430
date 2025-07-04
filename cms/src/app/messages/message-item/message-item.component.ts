import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender?: string;

  constructor() { }

  ngOnInit() {
    this.setSender();
  }

  private setSender() {
    if (this.message.sender) {
      if (this.isContact(this.message.sender)) {
        this.messageSender = this.message.sender.name;
      } else {
        this.messageSender = `Contact ID: ${this.message.sender}`;
      }
    } else {
      this.messageSender = 'Unknown Sender';
    }
  }

  private isContact(sender: Contact | string): sender is Contact {
    return typeof sender === 'object' && sender !== null && 'name' in sender;
  }
}