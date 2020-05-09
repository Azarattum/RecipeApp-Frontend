import Service from "../../common/service.abstract";

/**
 * Service for fetching user data from the remote API
 */
export default class ColorMatcher extends Service<"">() {
	private static propertyName: string;

	/**
	 * Initialization of Fetcher service
	 */
	public static async initialize(propertyName: string): Promise<void> {
		this.propertyName = propertyName;

		const theme = document.getElementById("theme");
		if (!theme) return;
		const element = theme.nextElementSibling;
		if (!element) return;

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		document.addEventListener("touchstart", () => {}, true);

		this.updateColor(element);
		theme.addEventListener("input", () => {
			this.updateColor(element);
		});
	}

	/**
	 *
	 * @param source Source color element
	 */
	private static updateColor(source: Element): void {
		const color = getComputedStyle(source).getPropertyValue(
			this.propertyName
		);

		document.body.style.backgroundColor = color;
	}
}
