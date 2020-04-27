/**
 * Represents recipe model
 */
export default interface IRecipe {
	id: number;
	title: string;
	description: string;
	time: string;
	picture: string;
	text: string;
	steps: string;
	ingredients: IIngredient[];
}

/**
 * Represents ingredient model
 */
export interface IIngredient {
	name: string;
	amount: string;
}
