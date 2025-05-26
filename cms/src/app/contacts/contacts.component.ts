import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {
  selectedContact?: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    // Subscribe to the contactSelectedEvent from the service
    this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => {
        this.selectedContact = contact;
      }
    );
  }
}