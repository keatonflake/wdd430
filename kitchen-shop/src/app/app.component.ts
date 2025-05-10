import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kitchen-shop';
  loadedFeature: string = 'recipe'

  onNavigate(feature: string) {
    this.loadedFeature = feature
  }
}
