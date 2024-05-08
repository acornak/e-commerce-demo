import mockCategories from "../../__mocks__/categories/categories.mock";
import { Category } from "../config/types";

/**
 * Get all categories
 * @returns array of categories
 */
export function getAllCategories(): Category[] {
	return mockCategories;
}

/**
 * Get category by id
 * @param id
 * @returns category
 */
export function getCategoryById(id: number): Category | undefined {
	return mockCategories.find((category) => category.id === id);
}
