import "./recipes.scss";
import Template from "./recipes.pug";
import View from "../../../common/view.abstract";

/**
 * Recipes view
 */
export default class Recipes extends View {
	public constructor() {
		super(Recipes.name);
		this.template = Template;
	}
}
