export class Document {
    constructor(
        public id: string = '',
        public name: string | null = '',
        public url: string | null = '',
        public children: Document[] | null = null,
        public description?: string | null
    ) { }
}