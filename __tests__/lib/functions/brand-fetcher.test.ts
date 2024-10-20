import { fetchAllBrands, fetchBrandById } from "@/lib/functions/brand-fetcher";
import { Brand } from "@/lib/config/types";

describe("fetchAllBrands function", () => {
	let mockSetBrands: jest.Mock<void, [Brand[]]>;

	const mockBrands = [
		{ id: 1, name: "Brand 1", slug: "brand-1" },
		{ id: 2, name: "Brand 2", slug: "brand-2" },
	];

	beforeEach(() => {
		mockSetBrands = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ brands: mockBrands }),
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch all brands and set them using setBrands", async () => {
		await fetchAllBrands(mockSetBrands);

		expect(global.fetch).toHaveBeenCalledWith("/api/brands");
		expect(mockSetBrands).toHaveBeenCalledWith(mockBrands);
	});

	it("should log error if fetching brands fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await fetchAllBrands(mockSetBrands);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching brands failed:",
			"Fetch failed",
		);
	});
});

describe("fetchBrandById function", () => {
	let mockSetBrand: jest.Mock<void, [Brand]>;

	const mockBrand = { id: 2, name: "Brand 2", slug: "brand-2" };

	beforeEach(() => {
		mockSetBrand = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ brand: mockBrand }),
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch brand by ID and set it using setBrands", async () => {
		await fetchBrandById(1, mockSetBrand);

		expect(global.fetch).toHaveBeenCalledWith("/api/brands?brandId=1");
		expect(mockSetBrand).toHaveBeenCalledWith(mockBrand);
	});

	it("should log error if fetching brand by id fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await fetchBrandById(1, mockSetBrand);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching brand by id failed:",
			"Fetch failed",
		);
	});
});
