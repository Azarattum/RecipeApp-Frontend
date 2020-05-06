import Controller from "../../common/controller.abstract";
import Tagify from "@yaireo/tagify";

/**
 * Service that represents template for a new services
 */
export default class Search extends Controller<"suggested" | "searched">() {
	private tagify: any;
	private input: HTMLInputElement | null = null;
	private strict: HTMLInputElement | null = null;

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
		this.input = this.container.querySelector("input[type='text']");
		this.strict = this.container.querySelector("input[type='checkbox']");

		this.tagify = new Tagify(this.input);
		this.tagify.settings.enforceWhitelist = true;
		this.tagify.settings.delimiters = /[\n&]/g;
		this.tagify.on("input", this.loadSuggestions.bind(this));
		this.tagify.on("keydown", (e: any) => {
			setTimeout(() => {
				const isEnter = e.detail.originalEvent.which == 13;
				const isEmpty = e.detail.tagify.DOM.input.textContent == "";
				if (isEnter && isEmpty) {
					this.search();
				}
			}, 0);
		});

		this.expose("search");
	}

	/**
	 * Searches the items
	 */
	public search(): void {
		if (!this.strict || !this.input) return;

		const ingredients: string[] = this.tagify.value.map(
			(x: { value: string }) => x.value
		);
		this.emit("searched", ingredients, this.strict.checked);
	}

	/**
	 * Starts loading suggestions sequence
	 * @param event Event data
	 */
	private loadSuggestions(event: { detail: any }): void {
		if (event.detail.value.endsWith("&")) {
			return;
		}

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
