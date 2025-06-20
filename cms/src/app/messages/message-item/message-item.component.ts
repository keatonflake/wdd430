import { Component, Input, OnInit } from '@angular/core';
import Message from '../message.model'
import { ContactService } from '../../contacts/contact.service';
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

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    const contact: Contact | null = this.contactService.getContact(this.message.sender);
    if (contact) {
      this.messageSender = contact.name;
    }
  }
}