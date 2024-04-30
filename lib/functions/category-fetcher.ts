import { Category } from "../models/category";

export const fetchAllCategories = (
	setCategories: (categories: Category[]) => void,
) => {
	fetch("/api/categories")
		.then((response) => response.json())
		.then((data) => setCategories(data.categories))
		.catch((error) => console.error("Fetching categories failed:", error));
};

// TODO in API
export const fetchCategoryById = (
	categoryId: number,
	setCategory: (category: Category) => void,
) => {
	fetch(`/api/categories?categoryId=${categoryId}`)
		.then((response) => response.json())
		.then((data) => setCategory(data.category))
		.catch((error) => console.error("Fetching category failed:", error));
};

export const fetchCategoryImage = (
	categoryId: number,
	setImageUrl: (url: string) => void,
) => {
	fetch(`/api/categories/image?categoryId=${categoryId}`)
		.then((response) => response.blob())
		.then((blob) => {
			const url = URL.createObjectURL(blob);
			setImageUrl(url);
			return () => URL.revokeObjectURL(url);
		})
		.catch((error) => console.error("Fetching image failed:", error));
};
