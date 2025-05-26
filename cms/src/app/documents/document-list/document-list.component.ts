import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Document from '../document.model';
import { DocumentService } from '../document.service'

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = []

  constructor(private documentService: DocumentService) { }

  @Output() selectedDocumentEvent = new EventEmitter<Document>()

  ngOnInit() {
    this.documents = this.documentService.getDocuments();

    if (this.documents.length > 0) {
      this.documentService.documentSelectedEvent.emit(this.documents[0]);
    }
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document)
  }
}
