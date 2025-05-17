import { Component, EventEmitter, Output } from '@angular/core';
import Document from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  documents: Document[] = [
    new Document(
      '1',
      'first document',
      'this is the first document',
      'https://google.com',
    ),

    new Document(
      '2',
      'Second document',
      'this is the second document',
      'https://google.com',
    ),

    new Document(
      '3',
      'Third document',
      'this is the third document',
      'https://google.com',
    ),

    new Document(
      '4',
      'Fourth document',
      'this is the fourth document',
      'https://google.com',
    ),

    new Document(
      '5',
      'Fifth document',
      'this is the fifth document',
      'https://google.com',
    ),
  ]

  @Output() selectedDocumentEvent = new EventEmitter<Document>()

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document)
  }
}
