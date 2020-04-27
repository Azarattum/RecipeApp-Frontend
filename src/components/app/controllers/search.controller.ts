import Controller from "../../common/controller.abstract";
import Tagify from "@yaireo/tagify";

/**
 * Service that represents template for a new services
 */
export default class Search extends Controller<"suggested">() {
	private tagify: any;

	/**
	 * Creates search controller
	 */
	public constructor() {
		super("Search");
	}

	/**
	 * Initialization of Search controller
	 */
	public async initialize(): Promise<void> {
		this.tagify = new Tagify(this.container);
		this.tagify.settings.enforceWhitelist = true;
		this.tagify.on("input", this.loadSuggestions.bind(this));
	}

	/**
	 * Starts loading suggestions sequence
	 * @param event Event data
	 */
	private loadSuggestions(event: { detail: any }): void {
		this.tagify.loading(true);
		this.emit("suggested", event.detail.value);
	}

	/**
	 * Adds suggestions to the element
	 * @param suggestions Suggestions list
	 */
	public addSuggestions(suggestions: string[]): void {
		this.tagify.loading(false);
		this.tagify.settings.whitelist = suggestions;
		this.tagify.dropdown.show.call(this.tagify, "");
	}
}
