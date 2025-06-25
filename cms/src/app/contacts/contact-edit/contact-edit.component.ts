import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  standalone: false
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact | null = null;
  contact: Contact = new Contact();
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        this.contact = new Contact();
        this.groupContacts = [];
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);

      if (!this.originalContact) {
        return;
      }

      this.editMode = true;

      this.contact = new Contact();
      this.contact.id = this.originalContact.id;
      this.contact.name = this.originalContact.name;
      this.contact.email = this.originalContact.email;
      this.contact.phone = this.originalContact.phone;
      this.contact.imageUrl = this.originalContact.imageUrl;
      this.contact.group = this.originalContact.group;

      if (this.contact.group) {
        this.groupContacts = [...this.contact.group];
      } else {
        this.groupContacts = [];
      }
    });
  }

  onContactDropped(event: CdkDragDrop<Contact[]>) {
    console.log('Contact dropped:', event);

    if (event.previousContainer === event.container) {
      // Reordering within the group
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Dropping from external source (contact list)
      const draggedContact = event.item.data;

      // Check if contact is already in group and only add individual contacts
      if (draggedContact &&
        !draggedContact.group && // Only individual contacts
        !this.groupContacts.find(c => c.id === draggedContact.id)) {
        // Add to group (don't remove from original list)
        this.groupContacts.push(draggedContact);
        console.log('Contact added to group:', draggedContact.name);
      } else {
        console.log('Contact not added - either already in group or is a group contact');
      }
    }
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact();
    newContact.id = value.id || '';
    newContact.name = value.name || '';
    newContact.email = value.email || '';
    newContact.phone = value.phone || '';
    newContact.imageUrl = value.imageUrl || '';
    newContact.group = this.groupContacts && this.groupContacts.length > 0 ? [...this.groupContacts] : null;

    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onRemoveItem(index: number) {
    if (this.groupContacts && index >= 0 && index < this.groupContacts.length) {
      this.groupContacts.splice(index, 1);
      console.log('Contact removed from group');
    }
  }
}