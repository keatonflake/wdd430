export class Contact {
    public id: string = '';
    public name: string = '';
    public email: string = '';
    public phone: string = '';
    public imagePath: string = '';
    public group: Contact[] | null = null;

    constructor() { }
}