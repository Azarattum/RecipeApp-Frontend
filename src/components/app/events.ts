import { IComponent } from "../common/manager.class";
import Search from "./controllers/search.controller";
import Fetcher from "./services/fetcher.service";
import IRecipe, { IIngredient } from "./models/recipe.interface";
import { IRecipeResult } from "./models/results.interface";
import Recipes from "./controllers/recipes.controller";

/**
 * Event handler for application components
 */
export default class EnvetsHandler {
	private searchController: Search;
	private recipesController: Recipes;
	private fetcherService: typeof Fetcher;
	/**
	 * Creates new envet handler for components
	 * @param components Components to handle interactions with
	 */
	public constructor(components: IComponent[]) {
		const component: { [name: string]: IComponent } = {};
		components.forEach(x => (component[x.name] = x));

		//Defining all components
		this.searchController = component["Search"] as Search;
		this.recipesController = component["Recipes"] as Recipes;
		this.fetcherService = component["Fetcher"] as typeof Fetcher;
	}

	/**
	 * Registers all events for components
	 */
	public async registerEvents(): Promise<void> {
		//Search suggest event
		this.searchController.on("suggested", (value: string) => {
			this.fetcherService.searchIngredients(value);
		});

		//Search for recipe event
		this.searchController.on(
			"searched",
			(ingredients: string[], strict: boolean) => {
				if (ingredients.length <= 0) return;
				this.recipesController.setLoading();
				this.fetcherService.searchRecipes(ingredients, strict);
			}
		);

		//Requested recipe data event
		this.recipesController.on("reciped", (recipeId: number) => {
			if (!recipeId) return;
			this.fetcherService.getRecipe(recipeId);
		});

		//Fetcher got ingredient results event
		this.fetcherService.on(
			"gotingredients",
			(ingredients: IIngredient[] | null) => {
				this.searchController.addSuggestions(
					ingredients ? ingredients.map(x => x.name) : []
				);
			}
		);

		//Fetcher got recipe results event
		this.fetcherService.on(
			"gotrecipes",
			(recipes: IRecipeResult[] | null) => {
				this.recipesController.updateRecipes(recipes ? recipes : []);
			}
		);

		//Fetcher got recipe data event
		this.fetcherService.on("gotrecipe", (recipe: IRecipe | null) => {
			if (!recipe) return;
			this.recipesController.updateRecipeData(recipe.id, recipe);
		});
	}
}
