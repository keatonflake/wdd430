import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model'
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null = null;
  document: Document = new Document();
  editMode: boolean = false;


  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id']
        if (!id) {
          this.editMode = false
          return
        }

        this.originalDocument = this.documentService.getDocument(id)

        if (!this.originalDocument) {
          return
        }

        this.editMode = true
        this.document = { ...this.originalDocument }
      }
    )
  }

  onSubmit(form: NgForm) {
    let value = form.value
    let newDocument = new Document()
    newDocument.id = value.id
    newDocument.name = value.name
    newDocument.description = value.description
    newDocument.url = value.url
    newDocument.children = value?.children || null

    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else {
      this.documentService.addDocument(newDocument)
    }

    this.router.navigate(['/documents'])
  }

  onCancel() {
    this.router.navigate(['/documents'])
  }
}
