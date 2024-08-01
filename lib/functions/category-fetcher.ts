import { Category } from "../config/types";

/**
 * Fetch all categories from the API and set them using setCategories
 * @param setCategories - Function to set categories in the state
 */
export const fetchAllCategories = async (
	setCategories: (categories: Category[]) => void,
) => {
	await fetch("/api/categories")
		.then((response) => response.json())
		.then((data) => setCategories(data.categories))
		.catch((error) => console.error("Fetching categories failed:", error));
};

// TODO in API
/**
 * Fetch a category by its ID from the API and set it using setCategory
 * @param categoryId - Category ID
 * @param setCategory - Function to set the category in the state
 */
export const fetchCategoryById = async (
	categoryId: number,
	setCategory: (category: Category) => void,
) => {
	await fetch(`/api/categories?categoryId=${categoryId}`)
		.then((response) => response.json())
		.then((data) => setCategory(data.category))
		.catch((error) =>
			console.error("Fetching category by id failed:", error),
		);
};
