import {
	fetchAllCategories,
	fetchCategoryById,
} from "@/lib/functions/category-fetcher";
import { Category } from "@/lib/models/category";

describe("fetchAllCategories function", () => {
	let mockSetCategories: jest.Mock<void, [Category[]]>;

	const mockCategories: Category[] = [
		{ id: 1, name: "Category 1", slug: "category-1" },
		{ id: 2, name: "Category 2", slug: "category-2" },
	];

	beforeEach(() => {
		mockSetCategories = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ categories: mockCategories }),
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch all categoreis and set them using setCategories", async () => {
		await fetchAllCategories(mockSetCategories);

		expect(global.fetch).toHaveBeenCalledWith("/api/categories");
		expect(mockSetCategories).toHaveBeenCalledWith(mockCategories);
	});

	it("should log error if fetching categories fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await fetchAllCategories(mockSetCategories);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching categories failed:",
			"Fetch failed",
		);
	});
});

describe("fetchCategoryById function", () => {
	let mockSetCategory: jest.Mock<void, [Category]>;

	const mockCategory: Category = {
		id: 1,
		name: "Category 1",
		slug: "category-1",
	};

	beforeEach(() => {
		mockSetCategory = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ category: mockCategory }),
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch category by id and set it using setCategory", async () => {
		await fetchCategoryById(1, mockSetCategory);

		expect(global.fetch).toHaveBeenCalledWith(
			"/api/categories?categoryId=1",
		);
		expect(mockSetCategory).toHaveBeenCalledWith(mockCategory);
	});

	it("should log error if fetching category by id fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await fetchCategoryById(1, mockSetCategory);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching category by id failed:",
			"Fetch failed",
		);
	});
});
