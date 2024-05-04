import mockProducts from "@/__mocks__/products/mock-products";
import {
	fetchProductById,
	fetchProductsPaginated,
} from "@/lib/functions/product-fetcher";
import { Product } from "@/lib/models/product";

describe("fetchProduct function", () => {
	let mockSetProduct: jest.Mock<void, [Product]>;

	beforeEach(() => {
		mockSetProduct = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ product: mockProducts[0] }),
				status: 200,
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch product and set ot using setProduct", async () => {
		await fetchProductById(1, mockSetProduct);

		expect(global.fetch).toHaveBeenCalledWith("/api/products?productId=1");
		expect(mockSetProduct).toHaveBeenCalledWith(mockProducts[0]);
	});

	it("should log error if fetching product fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await fetchProductById(1, mockSetProduct);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching product by id failed:",
			"Fetch failed",
		);
	});
});

describe("fetchProductsPaginated function", () => {
	let mockSetProducts: jest.Mock<void, [Product[]]>;
	let mockSetTotalPages: jest.Mock<void, [number]>;
	let mockSetLoading: jest.Mock<void, [boolean]>;

	beforeEach(() => {
		mockSetProducts = jest.fn();
		mockSetTotalPages = jest.fn();
		mockSetLoading = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						products: mockProducts.slice(0, 20),
						totalPages: 2,
					}),
				status: 200,
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch products and set ot using setProducts, setTotalPages and setLoading", async () => {
		await fetchProductsPaginated(
			mockSetProducts,
			mockSetTotalPages,
			1,
			1,
			1,
			mockSetLoading,
			16,
		);

		expect(global.fetch).toHaveBeenCalledWith(
			`/api/products?&page=1&categoryId=1&brandId=1
		&limit=16`,
		);
		expect(mockSetProducts).toHaveBeenCalledTimes(2);
		expect(mockSetProducts).toHaveBeenCalledWith([]);
		expect(mockSetProducts).toHaveBeenLastCalledWith(
			mockProducts.slice(0, 20),
		);

		expect(mockSetTotalPages).toHaveBeenCalledWith(2);

		expect(mockSetLoading).toHaveBeenCalledTimes(2);
		expect(mockSetLoading).toHaveBeenCalledWith(true);
		expect(mockSetLoading).toHaveBeenLastCalledWith(false);
	});

	it("should log error if fetching products fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await fetchProductsPaginated(
			mockSetProducts,
			mockSetTotalPages,
			1,
			1,
			1,
			mockSetLoading,
			10,
		);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching products failed:",
			"Fetch failed",
		);
	});
});
