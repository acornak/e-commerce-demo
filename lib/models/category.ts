import dummyCategories from "./dummy-categories";

export type Category = {
	id: number;
	name: string;
	slug: string;
	image?: string;
};

/**
 * Get all categories
 * @returns array of categories
 */
export function getAllCategories(): Category[] {
	return dummyCategories;
}
