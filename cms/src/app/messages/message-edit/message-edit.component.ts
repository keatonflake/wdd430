import { Component, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {

  currentSender = 'Keaton'
  currentSenderId = '1';

  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('message') message!: ElementRef;

  constructor(private messageService: MessageService) { }

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const messageValue = this.message.nativeElement.value;

    const newMessage: Message = {
      id: '',
      subject: subjectValue,
      msgText: messageValue,
      sender: this.currentSenderId
    };

    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.message.nativeElement.value = '';
  }
}