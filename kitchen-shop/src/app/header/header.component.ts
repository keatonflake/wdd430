import { Component, EventEmitter, Output } from '@angular/core'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: false,
}

)
export class Header {
    @Output() featureSelected = new EventEmitter<string>()

    onSelect(feature: string) {
        this.featureSelected.emit(feature)
    }

}