import Manager, { IComponent, ComponentArgs } from "../common/manager.class";
import EnvetsHandler from "./events";
import Fetcher from "./services/fetcher.service";
import Search from "./controllers/search.controller";
import SearchView from "./views/search/search.view";
import RecipesView from "./views/recipes/recipes.view";
import Offline from "./services/offline.service";
import Recipes from "./controllers/recipes.controller";
import FooterView from "./views/footer/footer.view";
import ColorMatcher from "./services/color.service";

/**
 * Main application class
 */
export default class App {
	private manger: Manager | null = null;
	private events: EnvetsHandler | null = null;

	/**
	 * Initializes the app
	 */
	public async initialize(): Promise<void> {
		document.body.style.backgroundColor;

		const components: IComponent[] = [
			Offline,
			Fetcher,
			ColorMatcher,
			new RecipesView(),
			new SearchView(),
			new FooterView(),
			new Search(),
			new Recipes()
		];

		this.manger = new Manager(components);
		this.events = new EnvetsHandler(components);

		const args = await this.getComponentArguments();
		await this.events.registerEvents();
		await this.manger.initialize(args);
	}

	/**
	 * Initializes arguments for the manager
	 */
	private async getComponentArguments(): Promise<ComponentArgs> {
		if (!this.manger) {
			throw new Error("Initialize manager first!");
		}

		return {
			ColorMatcher: ["--color-page"],
			Fetcher: ["https://recipe.hldns.ru"],
			Recipes: ["https://res.cloudinary.com/recipe-images/raw/upload/"]
		};
	}

	/**
	 * Closes the application
	 */
	public close(): void {
		if (this.manger) {
			this.manger.close();
			this.manger = null;
		}
		this.events = null;
	}
}
