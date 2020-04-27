/**
 * Represents ingredient result model
 */
export interface IIngredientResult {
	name: string;
	relevancy: number;
}

/**
 * Represents ingredient result model
 */
export interface IRecipeResult {
	id: number;
	title: string;
	description: string;
	time: string;
	picture: string;
	relevancy: number;
}
