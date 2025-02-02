import { fetchAllSizes, fetchSizeById } from "@/lib/functions/size-fetcher";
import { Size } from "@/lib/config/types";

describe("fetchAllSizes function", () => {
	const mockSizes = [
		{ id: 1, name: "S" },
		{ id: 2, name: "M" },
	];

	beforeEach(() => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ sizes: mockSizes }),
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch all sizes and set them using setSizes", async () => {
		const response = await fetchAllSizes();

		expect(global.fetch).toHaveBeenCalledWith("/api/sizes");

		expect(response).toEqual(mockSizes);
	});

	it("should throw error if fetching sizes fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await expect(fetchAllSizes()).rejects.toThrow(
			"Fetching sizes failed: Fetch failed",
		);
	});
});

describe("fetchSizeById function", () => {
	let mockSetSize: jest.Mock<void, [Size]>;

	const mockSize = { id: 1, name: "S" };

	beforeEach(() => {
		mockSetSize = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ size: mockSize }),
			}),
		) as jest.Mock;
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch size by ID and set it using setSize", async () => {
		await fetchSizeById(1, mockSetSize);

		expect(global.fetch).toHaveBeenCalledWith("/api/sizes?sizeId=1");
		expect(mockSetSize).toHaveBeenCalledWith(mockSize);
	});

	it("should log error if fetching size by id fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await fetchSizeById(1, mockSetSize);

		expect(console.error).toHaveBeenCalledWith(
			"Fetching size by id failed:",
			"Fetch failed",
		);
	});
});
