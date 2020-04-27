import "./search.scss";
import "@yaireo/tagify/src/tagify.scss";
import Template from "./search.pug";
import View from "../../../common/view.abstract";

/**
 * Search view
 */
export default class Search extends View {
	public constructor() {
		super(Search.name);
		this.template = Template;
	}
}
