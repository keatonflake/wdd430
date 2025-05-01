import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingrediant.model';

@Component({
  selector: 'app-shopping-list',
  standalone: false,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatos", 15)

  ]

  constructor() { }

  ngOnInit(): void {

  }
}
