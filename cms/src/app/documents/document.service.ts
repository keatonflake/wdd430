import { Injectable, Output, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import Document from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = []
  @Output() documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS
  }

  getDocuments(): Document[] {
    return this.documents.slice()
  }

  getDocument(id: string): Document | null {
    return this.documents.find(document => document.id === id) || null;
  }
}
