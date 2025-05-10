import { Component } from '@angular/core';
import { Recipe } from "../recipe.model"

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {


  recipes: Recipe[] = [
    new Recipe("A Test Recipe", "This is a literal test", "https://balchem.com/wp-content/uploads/2024/10/cereal-markets-scaled.jpeg")
  ]

  constructor() { }

  ngOnInit() {
  }
}
