import { Component } from '@angular/core';
import { Contact } from '../contact.model'

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent {
  public contacts: Contact[] = [
    new Contact(
      '1',
      "Keaton Flake",
      'fake@gmail.com',
      '123-123-1234',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqwAAvi4NCdXTtnOorcVP4EwxffOPI20YJcA&s'
    ),

    new Contact(
      '1',
      "chicken joe",
      'fake@gmail.com',
      '123-123-1234',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfmhDhWL5OwYP03Lrp3oNqNj5N5MzCGbghrg&s',
    )
  ]

}
