import Controller from "../../common/controller.abstract";
import { IRecipeResult } from "../models/results.interface";

/**
 * Service that represents template for a new services
 */
export default class Recipes extends Controller<"">() {
	private template: HTMLTemplateElement | null = null;
	private list: HTMLInputElement | null = null;
	private url: string = "";

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
		this.template = this.container.querySelector("template.recipe-template");
		this.list = this.container.querySelector(".recipes-list");
		this.url = resourcesUrl;
	}
	
	/**
	 * Updates recipes in the container
	 * @param recipes New recipes to add
	 */
	public updateRecipes(recipes: IRecipeResult[]): void {
		if (!this.list || !this.template) return;
		
		this.list.innerHTML = "";
		for (const recipe of recipes) {
			const node = this.template.content.cloneNode(true) as HTMLElement;
			const title = node.querySelector(".title");
			const description = node.querySelector(".description");
			const time = node.querySelector(".time");
			const picture = node.querySelector(".picture") as HTMLImageElement;

			if (title) title.innerHTML = recipe.title;
			if (description) description.innerHTML = recipe.description;
			if (time) time.innerHTML = recipe.time;
			if (picture) picture.src = this.url + recipe.picture;

			this.list.appendChild(node);
		}
	}
}
