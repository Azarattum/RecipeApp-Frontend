import Service from "../../common/service.abstract";
import { IIngredientResult, IRecipeResult } from "../models/results.interface";
import IRecipe from "../models/recipe.interface";

/**
 * Service for fetching user data from the remote API
 */
export default class Fetcher extends Service<
	"gotingredients" | "gotrecipes" | "gotrecipe"
>() {
	private static url: string;
	private static abortIngredientsController: AbortController;
	private static abortSearchController: AbortController;
	private static abortRecipeController: AbortController;

	/**
	 * Initialization of Fetcher service
	 */
	public static async initialize(url: string): Promise<void> {
		this.url = url;
		this.abortIngredientsController = new AbortController();
		this.abortSearchController = new AbortController();
		this.abortRecipeController = new AbortController();
	}

	/**
	 * Fetches the available ingredients by name
	 * @param name Ingredient search name
	 */
	public static async searchIngredients(
		name: string
	): Promise<IIngredientResult[] | null> {
		if (!name) {
			this.emit("gotingredients", null);
			return null;
		}

		this.abortIngredientsController.abort();
		this.abortIngredientsController = new AbortController();

		let response = null;
		try {
			response = await fetch(
				`${
					this.url
				}/api/ingredients/search/${name.toLocaleLowerCase()}`,
				{ mode: "cors", signal: this.abortIngredientsController.signal }
			);
		} catch (DOMException) {
			this.emit("gotingredients", null);
			return null;
		}

		let json = null;
		try {
			json = await response.json();
		} catch (SyntaxError) {
			//Do nothing
		}

		this.emit("gotingredients", json);
		return json as IIngredientResult[] | null;
	}

	/**
	 * Fetches the recipe data by its id
	 * @param id Recipe id
	 */
	public static async searchRecipes(
		ingredients: string[],
		strict: boolean = false
	): Promise<IRecipeResult[] | null> {
		this.abortSearchController.abort();
		this.abortSearchController = new AbortController();

		let response;
		try {
			response = await fetch(
				`${this.url}/api/recipe/search/${ingredients.join("&")}${
					strict ? "/strict" : ""
				}`,
				{
					mode: "cors",
					signal: this.abortSearchController.signal
				}
			);
		} catch (DOMException) {
			return null;
		}

		let json = null;
		try {
			json = await response.json();
		} catch (SyntaxError) {
			//Do nothing
		}

		this.emit("gotrecipes", json);
		return json as IRecipeResult[] | null;
	}

	/**
	 * Fetches the recipe data by its id
	 * @param id Recipe id
	 */
	public static async getRecipe(id: number): Promise<IRecipe | null> {
		this.abortRecipeController.abort();
		this.abortRecipeController = new AbortController();

		let response;
		try {
			response = await fetch(`${this.url}/api/recipe/get/${id}`, {
				mode: "cors",
				signal: this.abortRecipeController.signal
			});
		} catch (DOMException) {
			return null;
		}

		let json = null;
		try {
			json = await response.json();
		} catch (SyntaxError) {
			//Do nothing
		}

		this.emit("gotrecipe", json);
		return json as IRecipe | null;
	}
}
