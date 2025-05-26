import { Recipe } from "./recipe.model"

export default class RecipeService {
    private recipes: Recipe[] = [
        new Recipe("A Test Recipe", "This is a literal test", "https://balchem.com/wp-content/uploads/2024/10/cereal-markets-scaled.jpeg")
    ]

    getRecipes() {
        return this.recipes.slice()
    }
}