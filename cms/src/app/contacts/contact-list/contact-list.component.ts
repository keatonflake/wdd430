import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Contact } from '../contact.model'

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  public contacts: Contact[] = [
    new Contact(
      '1',
      "Keaton Flake",
      'fake@gmail.com',
      '123-123-1234',
      'images/barzeer.jpg'
    ),

    new Contact(
      '2',
      "chicken joe",
      'fake@gmail.com',
      '123-123-1234',
      'images/jacksonk.jpg',
    )
  ]

  @Output() selectedContactEvent = new EventEmitter<Contact>();

  ngOnInit() {
    // Emit the first contact by default
    if (this.contacts.length > 0) {
      this.selectedContactEvent.emit(this.contacts[0]);
    }
  }

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}