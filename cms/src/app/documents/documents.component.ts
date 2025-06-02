import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service'

@Component({
  selector: 'app-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit {
  public selectedDocument: Document | undefined

  constructor(private documentService: DocumentService) { }

  onSelectedDocument(document: any) {
    this.selectedDocument = document;
  }

  ngOnInit() {
    // Subscribe to the documentSelectedEvent from the service
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }
}
