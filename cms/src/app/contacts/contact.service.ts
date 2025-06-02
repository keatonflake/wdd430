import { Injectable, EventEmitter, Output } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();

  getContacts(): Contact[] {
    return this.contacts.slice()
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}