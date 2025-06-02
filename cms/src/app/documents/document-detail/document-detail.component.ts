import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
  @Input() document!: Document | null;
  id!: string;
  nativeWindow: any

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) {
    this.nativeWindow = windRefService.getNativeWindow()
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id']
        this.document = this.documentService.getDocument(this.id)
      })
  }

  onView() {
    this.document?.url ? this.nativeWindow.open(this.document.url) : console.log('No URL found')
  }

  onDelete() {
    if (!this.document) {
      console.error('No document to delete');
      return;
    }

    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
