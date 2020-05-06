import "./footer.scss";
import Template from "./footer.pug";
import View from "../../../common/view.abstract";

/**
 * Footer view
 */
export default class Footer extends View {
	public constructor() {
		super(Footer.name);
		this.template = Template;
	}
}
