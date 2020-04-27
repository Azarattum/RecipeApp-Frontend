import { IComponent } from "../common/manager.class";
import Search from "./controllers/search.controller";
import Fetcher from "./services/fetcher.service";
import { IIngredient } from "./models/recipe.interface";

/**
 * Event handler for application components
 */
export default class EnvetsHandler {
	private searchController: Search;
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

		//Fetcher got ingredient results event
		this.fetcherService.on(
			"gotingredients",
			(ingredients: IIngredient[] | null) => {
				this.searchController.addSuggestions(
					ingredients ? ingredients.map(x => x.name) : []
				);
			}
		);
	}
}
