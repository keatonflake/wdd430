import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import Message from '../message.model';

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

  @Output() addMessageEvent = new EventEmitter<Message>()

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const messageValue = this.message.nativeElement.value;


    const newMessage = new Message(
      this.currentSenderId,
      subjectValue,
      messageValue,
      this.currentSender
    );

    this.addMessageEvent.emit(newMessage);

    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.message.nativeElement.value = '';
  }
}
