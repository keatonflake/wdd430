import { Params } from '@angular/router';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = []
  maxDocumentId: number

  @Output() documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();


  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http.get<Document[]>('https://wdd-430-cms-be399-default-rtdb.firebaseio.com/documents.json')
      .subscribe({
        next: (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => +a.id - +b.id);
          this.documentChangedEvent.next(this.documents.slice());
        },
        error: (error: any) => {
          console.log(error);
        }
      });

    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    return this.documents.find(document => document.id === id) || null;
  }

  storeDocuments() {
    const documents = JSON.stringify(this.documents)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://wdd-430-cms-be399-default-rtdb.firebaseio.com/documents.json', documents, { headers: headers })
      .subscribe({
        next: () => {
          this.documentChangedEvent.next(this.documents.slice());
        }
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    this.http.delete(`https://wdd-430-cms-be399-default-rtdb.firebaseio.com/documents/${document.id}.json`)
      .subscribe({
        next: () => {
          const pos = this.documents.indexOf(document);
          if (pos >= 0) {
            this.documents.splice(pos, 1);
            this.documentChangedEvent.next(this.documents.slice());
          }
        },
        error: (error: any) => {
          console.log('Delete failed:', error);
        }
      });
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    this.maxDocumentId++;
    document.id = this.maxDocumentId.toString();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(`https://wdd-430-cms-be399-default-rtdb.firebaseio.com/documents/${document.id}.json`,
      JSON.stringify(document),
      { headers: headers })
      .subscribe({
        next: () => {
          this.documents.push(document);
          this.documentChangedEvent.next(this.documents.slice());
        },
        error: (error: any) => {
          console.log('Add failed:', error);
        }
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(`https://wdd-430-cms-be399-default-rtdb.firebaseio.com/documents/${originalDocument.id}.json`,
      JSON.stringify(newDocument),
      { headers: headers })
      .subscribe({
        next: () => {
          this.documents[pos] = newDocument;
          this.documentChangedEvent.next(this.documents.slice());
        },
        error: (error: any) => {
          console.log('Update failed:', error);
        }
      });
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
