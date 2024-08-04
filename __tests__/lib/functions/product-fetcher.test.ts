import {
	fetchAllProducts,
	fetchProductById,
	fetchProductImage,
	fetchProductsByCategory,
	fetchProductsByTag,
	fetchProductsMaxPrice,
	fetchProductsPaginated,
} from "@/lib/functions/product-fetcher";
import { Product } from "@/lib/config/types";
import mockProducts from "@/__mocks__/products/products.mock";
import { sortOptions } from "@/lib/config/constants";

describe("fetchProduct function", () => {
	beforeEach(() => {
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

	it("should fetch product and set it using setProduct", async () => {
		const resp = await fetchProductById(1);

		expect(global.fetch).toHaveBeenCalledWith("/api/products?productId=1");
		expect(resp).toEqual(mockProducts[0]);
	});

	it("should log error if fetching product fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		let resp;
		try {
			resp = await fetchProductById(1);
		} catch (error) {
			expect(error).toEqual("Fetch failed");
		}

		expect(console.error).toHaveBeenCalledWith(
			"Fetching product by id failed:",
			"Fetch failed",
		);

		expect(resp).toBeUndefined();
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

	it("should fetch filtered products and set it using setProducts, setTotalPages and setLoading", async () => {
		await fetchProductsPaginated(
			mockSetProducts,
			mockSetTotalPages,
			1,
			1,
			1,
			[1, 2],
			[0, 500],
			sortOptions[0],
			mockSetLoading,
			16,
		);

		expect(global.fetch).toHaveBeenCalledWith(
			`/api/products?&page=1&categoryId=1&brandId=1&sizeIds=1%2C2&priceRange=0-500&sortBy=default&limit=16`,
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

	it("should fetch products without filters and set it using setProducts, setTotalPages and setLoading", async () => {
		await fetchProductsPaginated(
			mockSetProducts,
			mockSetTotalPages,
			1,
			null,
			null,
			null,
			null,
			null,
			mockSetLoading,
		);

		expect(global.fetch).toHaveBeenCalledWith(
			`/api/products?&page=1&limit=10000`,
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
			[1, 2],
			[0, 500],
			sortOptions[0],
			mockSetLoading,
			10,
		);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching products failed:",
			"Fetch failed",
		);
	});
});

describe("fetchAllProducts function", () => {
	let mockSetProducts: jest.Mock<void, [Product[]]>;

	beforeEach(() => {
		mockSetProducts = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({ products: mockProducts.slice(0, 20) }),
				status: 200,
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch products and set it using setProducts", async () => {
		await fetchAllProducts(mockSetProducts, 100);

		expect(global.fetch).toHaveBeenCalledWith("/api/products?limit=100");
		expect(mockSetProducts).toHaveBeenCalledWith(mockProducts.slice(0, 20));
	});

	it("should log error if fetching products fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await fetchAllProducts(mockSetProducts);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching products failed:",
			"Fetch failed",
		);
	});
});

describe("fetchProductImage function", () => {
	const mockBlob = new Blob(["test data"], { type: "image/png" });

	beforeEach(() => {
		global.fetch = jest.fn().mockResolvedValue({
			blob: () => Promise.resolve(mockBlob),
		}) as jest.Mock;
		URL.createObjectURL = jest.fn(() => "image-url");
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch product image", async () => {
		const resp = await fetchProductImage(1);

		expect(global.fetch).toHaveBeenCalledWith(
			"/api/products/image?productId=1",
		);

		expect(URL.createObjectURL).toHaveBeenCalledWith(mockBlob);

		expect(resp).toEqual("image-url");
	});

	it("should log error if fetching product image fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		let resp;
		try {
			resp = await fetchProductImage(1);
		} catch (error) {
			expect(error).toEqual("Fetch failed");
		}

		expect(console.error).toHaveBeenCalledWith(
			"Fetching product image failed:",
			"Fetch failed",
		);

		expect(resp).toBeUndefined();
	});
});

describe("fetchProductsByCategory function", () => {
	let mockSetProducts: jest.Mock<void, [Product[]]>;

	beforeEach(() => {
		mockSetProducts = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({ products: mockProducts.slice(0, 20) }),
				status: 200,
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch products by category and set it using setProducts", async () => {
		await fetchProductsByCategory(1, mockSetProducts, 100);

		expect(global.fetch).toHaveBeenCalledWith(
			"/api/products?categoryId=1&limit=100",
		);
		expect(mockSetProducts).toHaveBeenCalledWith(mockProducts.slice(0, 20));
	});

	it("should log error if fetching products by category fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await fetchProductsByCategory(1, mockSetProducts);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching products by category failed:",
			"Fetch failed",
		);
	});
});

describe("fetchProductsByTag function", () => {
	let mockSetProducts: jest.Mock<void, [Product[]]>;
	const mockTags = ["tag1", "tag2"];

	beforeEach(() => {
		mockSetProducts = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({ products: mockProducts.slice(0, 20) }),
				status: 200,
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch products by category and set it using setProducts", async () => {
		await fetchProductsByTag(mockTags, mockSetProducts, 100);

		expect(global.fetch).toHaveBeenCalledWith(
			"/api/products?tags=tag1&tags=tag2&limit=100",
		);
		expect(mockSetProducts).toHaveBeenCalledWith(mockProducts.slice(0, 20));
	});

	it("should log error if fetching products by category fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await fetchProductsByTag(mockTags, mockSetProducts);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching products by tag failed:",
			"Fetch failed",
		);
	});
});

describe("fetchProductsMaxPrice function", () => {
	let mockSetMaxPrice: jest.Mock<void, [number]>;
	let mockSetPriceRange: jest.Mock<void, [[number, number]]>;
	let mockSetMax: jest.Mock<void, [number]>;

	beforeEach(() => {
		mockSetMaxPrice = jest.fn();
		mockSetPriceRange = jest.fn();
		mockSetMax = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ maxPrice: 500 }),
				status: 200,
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch products by category and set it using setProducts", async () => {
		await fetchProductsMaxPrice(
			mockSetMaxPrice,
			mockSetPriceRange,
			mockSetMax,
		);

		expect(global.fetch).toHaveBeenCalledWith("/api/products/max-price");
		expect(mockSetMaxPrice).toHaveBeenCalledWith(500);
		expect(mockSetPriceRange).toHaveBeenCalledWith([0, 500]);
		expect(mockSetMax).toHaveBeenCalledWith(500);
	});

	it("should log error if fetching products by category fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await fetchProductsMaxPrice(
			mockSetMaxPrice,
			mockSetPriceRange,
			mockSetMax,
		);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching max price failed:",
			"Fetch failed",
		);
	});
});
