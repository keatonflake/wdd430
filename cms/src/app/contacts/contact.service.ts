// ContactService fixes
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
    this.http.get<Contact[]>('http://localhost:3000/contacts')
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Send as JSON object, not stringified
    this.http.put('http://localhost:3000/contacts', this.contacts, { headers: headers })
      .subscribe({
        next: () => {
          this.contactChangedEvent.next(this.contacts.slice());
        }
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) return;

    this.http.delete(`http://localhost:3000/contacts/${contact.id}`)
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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<Contact>('http://localhost:3000/contacts', contact, { headers: headers })
      .subscribe({
        next: (newContact: Contact) => {
          console.log('New contact created:', newContact);

          if (newContact && newContact.id) {
            this.contacts.push(newContact);
            this.maxContactId = this.getMaxId();
            this.contactChangedEvent.next(this.contacts.slice());
          } else {
            console.error('New contact does not have an ID:', newContact);
          }
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

    this.http.put<Contact>(`http://localhost:3000/contacts/${originalContact.id}`, newContact, { headers: headers })
      .subscribe({
        next: (updatedContact: Contact) => {
          this.contacts[pos] = updatedContact;
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
