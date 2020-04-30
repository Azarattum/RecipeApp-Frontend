import Controller from "../../common/controller.abstract";
import { IRecipeResult } from "../models/results.interface";
import IRecipe from "../models/recipe.interface";

/**
 * Service that represents template for a new services
 */
export default class Recipes extends Controller<"reciped">() {
	private recipeTemplate: HTMLTemplateElement | null = null;
	private ingredientTemplate: HTMLTemplateElement | null = null;
	private itemTemplate: HTMLTemplateElement | null = null;
	private list: HTMLInputElement | null = null;
	private url: string = "";
	private activeRecipeId: number = 0;
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
		this.recipeTemplate = this.container.querySelector(
			"template.recipe-template"
		);
		this.itemTemplate = this.container.querySelector(
			"template.recipe-item-template"
		);
		this.ingredientTemplate = this.container.querySelector(
			"template.ingredient-template"
		);
		this.list = this.container.querySelector(".recipes-list");
		this.url = resourcesUrl;

		this.expose("selectRecipe");
	}

	/**
	 * Loads a recipe by its id
	 * @param recipeId Id of selected recipe
	 */
	public selectRecipe(recipeId: number): void {
		if (!this.list) return;
		if (recipeId == this.activeRecipeId) return;

		this.activeRecipeId = recipeId;
		this.list.querySelectorAll(".recipe").forEach(recipe => {
			recipe.classList.add("hidden");
		});

		const selected = this.list.querySelector(
			`.recipe[data-id="${recipeId}"]`
		);
		selected?.classList.remove("hidden");
		selected?.classList.add("active");
		//Show loader if no data was previously available
		if (selected?.querySelector(".ingredients")?.children.length == 0) {
			selected?.querySelector(".loader")?.classList.remove("hidden");
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
		if (!this.list || !this.recipeTemplate) return;

		this.activeRecipeId = 0;
		this.setLoading(false);
		this.list.innerHTML = "";
		for (const recipe of recipes) {
			const node = this.recipeTemplate.content.cloneNode(
				true
			) as DocumentFragment;
			const title = node.querySelector(".title");
			const description = node.querySelector(".description");
			const time = node.querySelector(".time");
			const picture = node.querySelector(".picture") as HTMLImageElement;

			(node.firstChild as HTMLElement).dataset.id = recipe.id.toString();
			if (title) title.innerHTML = recipe.title;
			if (description) description.innerHTML = recipe.description;
			if (time) time.innerHTML = recipe.time;
			if (picture) picture.src = this.url + recipe.picture;

			this.list.appendChild(node);
		}
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
		const recipeData = this.list.querySelector(
			`.recipe[data-id="${id}"] .recipe-data`
		);
		if (!recipeData || !this.itemTemplate) return;

		recipeData.innerHTML = "";
		const steps = data.text.split("\n");
		for (const i in steps) {
			const node = this.itemTemplate.content.cloneNode(
				true
			) as DocumentFragment;

			const text = node.querySelector(".text");
			const step = node.querySelector(".step") as HTMLImageElement;
			if (!steps) continue;
			if (text) text.innerHTML = steps[i];
			if (data.steps[i] && step) step.src = this.url + data.steps[i];

			recipeData.appendChild(node);
		}

		//Add ingredient
		const ingredients = this.list.querySelector(
			`.recipe[data-id="${id}"] .ingredients`
		);
		if (!ingredients || !this.ingredientTemplate) return;

		ingredients.innerHTML = "";
		for (const igredient of data.ingredients) {
			const node = this.ingredientTemplate.content.cloneNode(
				true
			) as DocumentFragment;

			const name = node.querySelector(".name");
			const amount = node.querySelector(".amount");
			if (name) name.innerHTML = igredient.name;
			if (amount) amount.innerHTML = igredient.amount;

			ingredients.appendChild(node);
		}
	}
}
