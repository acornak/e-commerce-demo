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

/**
 * Get category by id
 * @param id
 * @returns category
 */
export function getCategoryById(id: number): Category | undefined {
	return dummyCategories.find((category) => category.id === id);
}
