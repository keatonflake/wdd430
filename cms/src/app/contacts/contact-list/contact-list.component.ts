import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit, OnDestroy {
  public contacts: Contact[] = []
  subscription: Subscription | null = null

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

    if (this.contacts.length > 0) {
      this.contactService.contactSelectedEvent.emit(this.contacts[0]);
    }

    this.subscription = this.contactService.contactChangedEvent
      .subscribe(
        (newContacts: Contact[]) => {
          this.contacts = newContacts
        })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe
    }
  }

}