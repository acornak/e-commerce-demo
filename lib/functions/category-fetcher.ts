import { Category } from "../models/category";

export const fetchCategory = (
	categoryId: number,
	setCategory: (category: Category) => void,
) => {
	fetch(`/api/categories?id=${categoryId}`)
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
