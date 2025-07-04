
import { Contact } from '../contacts/contact.model';

export interface Message {
    id: string;
    subject: string;
    msgText: string;
    sender: Contact | string;
    _id?: string;
}