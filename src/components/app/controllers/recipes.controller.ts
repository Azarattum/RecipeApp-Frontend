import Controller from "../../common/controller.abstract";
import { IRecipeResult } from "../models/results.interface";
import IRecipe from "../models/recipe.interface";

/**
 * Service that represents template for a new services
 */
export default class Recipes extends Controller<"reciped">() {
	private list: HTMLInputElement | null = null;
	private url: string = "";
	private activeRecipeId: number = 0;
	private recipes: IRecipeResult[] = [];
	public loading: boolean = false;

	/**
	 * Creates Recipes controller
	 */
	public constructor() {
		super("Recipes");
	}

	/**
	 * Initialization of Recipes controller
	 */
	public async initialize(resourcesUrl: string): Promise<void> {
		this.bind();

		this.list = this.container.querySelector(".recipes-list");
		this.url = resourcesUrl;

		this.expose("selectRecipe");
		this.expose("deselectRecipe");
	}

	/**
	 * Removes current active recipe and reveals the rest
	 */
	public deselectRecipe(): void {
		if (!this.list) return;

		const index = this.recipes.findIndex(x => x.id == this.activeRecipeId);
		this.safe = false;
		this.data.recipes[index].description = this.recipes[index].description;
		this.safe = true;

		this.activeRecipeId = 0;
		this.list.querySelector(".backdrop")?.classList.remove("active");
		this.list.querySelectorAll(".recipe").forEach(recipe => {
			recipe.classList.remove("active");
		});
	}

	/**
	 * Loads a recipe by its id
	 * @param recipeId Id of selected recipe
	 */
	public selectRecipe(recipeId: number): void {
		if (!this.list) return;
		if (recipeId === this.activeRecipeId) return;
		const selected = this.list.querySelector(
			`.recipe[data-id="${recipeId}"]`
		);

		if (!selected) return;

		this.list.querySelector(".backdrop")?.classList.add("active");

		this.activeRecipeId = recipeId;

		selected.classList.add("active");
		//Show loader if no data was previously available
		if (selected.querySelector(".ingredients")?.children.length == 1) {
			selected.querySelector(".loader")?.classList.remove("hidden");
		}

		this.emit("reciped", recipeId);
	}

	/**
	 * Sets loading state
	 * @param isLoading Is content loading
	 */
	public setLoading(isLoading: boolean = true): void {
		this.loading = isLoading;
		const loader = this.container.querySelector(".loader");
		if (isLoading) {
			loader?.classList.remove("hidden");
		} else {
			loader?.classList.add("hidden");
		}
	}

	/**
	 * Updates recipes in the container and disbles the loading state
	 * @param recipes New recipes to add
	 */
	public updateRecipes(recipes: IRecipeResult[]): void {
		for (const recipe of recipes) {
			recipe.picture = this.url + recipe.picture;
		}

		for (const recipe of recipes) {
			if (recipe.description.length > 100) {
				recipe.description = recipe.description.slice(0, 100) + "...";
			}
		}

		this.safe = false;
		this.data.recipes = recipes;
		this.safe = true;

		this.recipes = recipes;
		this.activeRecipeId = 0;
		this.setLoading(false);
	}

	/**
	 * Updates recipe's data by it's id
	 * @param id Recipe id to update
	 * @param data New recipe data
	 */
	public updateRecipeData(id: number, data: IRecipe): void {
		if (!this.list) return;
		//Hide loader
		this.list
			.querySelector(`.recipe[data-id="${id}"] .loader`)
			?.classList.add("hidden");

		//Add recipe data
		const index = this.recipes.findIndex(x => x.id == id);
		const parts = data.text.split("\n");
		const steps = parts
			.filter(x => x)
			.map((x, i) => {
				return {
					picture: data.steps[i] ? this.url + data.steps[i] : "",
					display: data.steps[i] ? "inherit" : "none",
					text: x
				};
			});

		this.safe = false;
		this.data.recipes[index].description = data.description;
		this.data.recipes[index].steps = steps;
		this.data.recipes[index].ingredients = data.ingredients;
		this.safe = true;
	}
}
