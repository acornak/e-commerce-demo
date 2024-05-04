import { Category } from "../models/category";

export const fetchAllCategories = async (
	setCategories: (categories: Category[]) => void,
) => {
	await fetch("/api/categories")
		.then((response) => response.json())
		.then((data) => setCategories(data.categories))
		.catch((error) => console.error("Fetching categories failed:", error));
};

// TODO in API
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
