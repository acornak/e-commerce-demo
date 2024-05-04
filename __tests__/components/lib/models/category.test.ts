import { getAllCategories, getCategoryById } from "@/lib/models/category";
import mockCategories from "@/__mocks__/categories/categories.mock";

describe("getAllCategories", () => {
	it("should return all categories", () => {
		const categories = getAllCategories();
		expect(categories).toEqual(mockCategories);
	});
});

describe("getCategoryById", () => {
	it("should return category by id", () => {
		const categories = getCategoryById(1);
		expect(categories).toEqual(mockCategories[0]);
	});
});
