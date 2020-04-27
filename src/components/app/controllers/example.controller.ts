import Controller from "../../common/controller.abstract";

/**
 * Service that represents template for a new services
 */
export default class Example extends Controller<"">() {
	/**
	 * Creates template controller
	 */
	public constructor() {
		super("Example");
	}

	/**
	 * Initialization of Example service
	 */
	public async initialize(): Promise<void> {
		///Service initialization logic goes here
	}
}
