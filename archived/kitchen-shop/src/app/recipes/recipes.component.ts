import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService],
  standalone: false
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
