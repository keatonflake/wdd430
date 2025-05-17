import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core'; // Make sure ElementRef is imported

@Directive({
    selector: '[appDropdown]',
    standalone: false
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    @HostListener('document:click', ['$event.target']) closeDropdown(targetElement: Element) {
        const isClickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!isClickedInside && this.isOpen) {
            this.isOpen = false;
        }
    }

    constructor(private elementRef: ElementRef) { }
}