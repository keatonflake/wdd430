import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;
  id!: string

  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id']
        this.contact = this.contactService.getContact(this.id)

        // If contact not found initially, subscribe to contactChangedEvent
        if (!this.contact) {
          this.contactService.contactChangedEvent.subscribe(() => {
            if (!this.contact) {
              this.contact = this.contactService.getContact(this.id);
            }
          });
        }
      })
  }

  onDelete() {
    if (!this.contact) {
      console.error('No contact to delete');
      return;
    }

    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
}