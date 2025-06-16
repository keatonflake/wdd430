import { Params } from '@angular/router';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = []
  maxDocumentId: number

  @Output() documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();


  constructor() {
    this.documents = MOCKDOCUMENTS
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice()
  }

  getDocument(id: string): Document | null {
    return this.documents.find(document => document.id === id) || null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }
    this.maxDocumentId++;
    document.id = this.maxDocumentId.toString();

    this.documents.push(document)
    this.documentChangedEvent.next(this.documents.slice())
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return
    }

    let pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return
    }

    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument
    this.documentChangedEvent.next(this.documents.slice())
  }

  getMaxId(): number {
    let maxId = 0
    this.documents.forEach((document) => {
      let currentId = +document.id
      if (currentId > maxId) {
        maxId = currentId
      }
    })
    return maxId
  }
}
