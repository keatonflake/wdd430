import { Injectable, EventEmitter, Output } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    this.contacts = [];
    this.maxContactId = 0;
    this.getContacts();
  }

  getContacts(): Contact[] {
    this.http.get<Contact[]>('https://wdd-430-cms-be399-default-rtdb.firebaseio.com/contacts.json')
      .subscribe({
        next: (contacts: Contact[]) => {
          console.log(contacts)
          this.contacts = contacts || [];

          this.contacts = this.contacts.filter(contact => contact != null);

          this.maxContactId = this.getMaxId();
          if (this.contacts.length > 0) {
            this.contacts.sort((a, b) => {
              if (!a || !a.id) return 1;
              if (!b || !b.id) return -1;
              return +a.id - +b.id;
            });
          }
          this.contactChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.log(error);
        }
      });

    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    let result = this.contacts.find(contact => contact.id === id) || null;
    if (!result) {
      console.log(id + " sender not found")
    }
    return result
  }

  storeContacts() {
    const contacts = JSON.stringify(this.contacts);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://wdd-430-cms-be399-default-rtdb.firebaseio.com/contacts.json', contacts, { headers: headers })
      .subscribe({
        next: () => {
          this.contactChangedEvent.next(this.contacts.slice());
        }
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) return;

    this.http.delete(`https://wdd-430-cms-be399-default-rtdb.firebaseio.com/contacts/${contact.id}.json`)
      .subscribe({
        next: () => {
          const pos = this.contacts.indexOf(contact);
          if (pos >= 0) {
            this.contacts.splice(pos, 1);
            this.contactChangedEvent.next(this.contacts.slice());
          }
        },
        error: (error: any) => {
          console.log('Delete failed:', error);
        }
      });
  }

  addContact(contact: Contact) {
    if (!contact) return;

    if (!contact.id) {
      this.maxContactId++;
      contact.id = this.maxContactId.toString();
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(`https://wdd-430-cms-be399-default-rtdb.firebaseio.com/contacts/${contact.id}.json`,
      JSON.stringify(contact),
      { headers: headers })
      .subscribe({
        next: () => {
          this.contacts.push(contact);
          this.contactChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.log('Add failed:', error);
        }
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(`https://wdd-430-cms-be399-default-rtdb.firebaseio.com/contacts/${originalContact.id}.json`,
      JSON.stringify(newContact),
      { headers: headers })
      .subscribe({
        next: () => {
          this.contacts[pos] = newContact;
          this.contactChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.log('Update failed:', error);
        }
      });
  }

  getMaxId(): number {
    let maxId = 0;

    if (!this.contacts || this.contacts.length === 0) {
      return maxId;
    }

    this.contacts.forEach((contact) => {
      if (contact && contact.id) {
        const currentId = +contact.id;
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
    });
    return maxId;
  }
}