import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import Message from '../message.model'
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit, OnDestroy {
  @Input() message!: Message;
  messageSender?: string;
  private contactSubscription?: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.setSender();

    this.contactSubscription = this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.setSender();
      }
    );
  }

  ngOnDestroy() {
    if (this.contactSubscription) {
      this.contactSubscription.unsubscribe();
    }
  }

  private setSender() {
    const contact: Contact | null = this.contactService.getContact(this.message.sender);
    if (contact) {
      this.messageSender = contact.name;
    } else {
      this.messageSender = 'Unknown Sender';
    }
  }
}