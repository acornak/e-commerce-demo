/**
 * @jest-environment node
 */
import { GET } from "@/app/api/products/route";
import {
	getAllProducts,
	getProductById,
	getProductsByBrand,
	getProductsByCategory,
	getProductsBySizes,
	getProductsByTags,
} from "@/lib/models/product";
import { sortOptions } from "@/lib/config/constants";
import { NextRequest } from "next/server";

jest.mock("@/lib/models/product", () => ({
	getAllProducts: jest.fn(),
	getProductById: jest.fn(),
	getProductsByBrand: jest.fn(),
	getProductsByCategory: jest.fn(),
	getProductsBySizes: jest.fn(),
	getProductsByTags: jest.fn(),
}));

jest.mock("@/lib/config/constants", () => ({
	sortOptions: [
		{
			value: "price",
			sortFunc: jest.fn().mockImplementation((products) => products),
		},
		// Include other sort options as necessary
	],
}));

describe("GET /api/products", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return a product by ID", async () => {
		const mockProduct = { id: 1, name: "Test Product", price: 100 };
		(getProductById as jest.Mock).mockReturnValue(mockProduct);

		const request = new NextRequest(
			"http://localhost/api/products?productId=1",
		);
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ product: mockProduct });
	});

	it("should return 404 if product not found", async () => {
		(getProductById as jest.Mock).mockReturnValue(null);

		const request = new NextRequest(
			"http://localhost/api/products?productId=1",
		);
		const response = await GET(request);

		expect(response.status).toBe(404);
		expect(await response.json()).toEqual({ message: "Product not found" });
	});

	it("should return products filtered by category", async () => {
		const mockProducts = [{ id: 1, name: "Test Product", price: 100 }];
		(getProductsByCategory as jest.Mock).mockReturnValue(mockProducts);

		const request = new NextRequest(
			"http://localhost/api/products?categoryId=1",
		);
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			products: mockProducts,
			totalPages: 1,
		});
	});

	it("should return products filtered by size", async () => {
		const mockProducts = [{ id: 1, name: "Test Product", price: 100 }];
		(getProductsBySizes as jest.Mock).mockReturnValue(mockProducts);

		const request = new NextRequest(
			"http://localhost/api/products?sizeIds=1,2",
		);
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			products: mockProducts,
			totalPages: 1,
		});
	});

	it("should return products filtered by tags", async () => {
		const mockProducts = [{ id: 1, name: "Test Product", price: 100 }];
		(getProductsByTags as jest.Mock).mockReturnValue(mockProducts);

		const request = new NextRequest(
			"http://localhost/api/products?tags=tag1,tag2",
		);
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			products: mockProducts,
			totalPages: 1,
		});
	});

	it("should return products filtered by brand", async () => {
		const mockProducts = [{ id: 1, name: "Test Product", price: 100 }];
		(getProductsByBrand as jest.Mock).mockReturnValue(mockProducts);

		const request = new NextRequest(
			"http://localhost/api/products?brandId=1",
		);
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			products: mockProducts,
			totalPages: 1,
		});
	});

	it("should return products filtered by price range", async () => {
		const mockProducts = [{ id: 1, name: "Test Product", price: 100 }];
		(getAllProducts as jest.Mock).mockReturnValue(mockProducts);

		const request = new NextRequest(
			"http://localhost/api/products?priceRange=50-150",
		);
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			products: mockProducts,
			totalPages: 1,
		});
	});

	it("should return products sorted by a given criteria", async () => {
		const mockProducts = [{ id: 1, name: "Test Product", price: 100 }];
		const sortFunc = jest.fn().mockReturnValue(mockProducts);

		// Mock the sortOptions to include the sorting function
		sortOptions.find((opt) => opt.value === "price")!.sortFunc = sortFunc;

		(getAllProducts as jest.Mock).mockReturnValue(mockProducts);

		const request = new NextRequest(
			"http://localhost/api/products?sortBy=price",
		);
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			products: mockProducts,
			totalPages: 1,
		});
	});

	it("should handle pagination correctly", async () => {
		const mockProducts = Array.from({ length: 50 }, (_, i) => ({
			id: i + 1,
			name: `Product ${i + 1}`,
			price: 100,
		}));
		(getAllProducts as jest.Mock).mockReturnValue(mockProducts);

		const request = new NextRequest(
			"http://localhost/api/products?page=2&limit=10",
		);
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			products: mockProducts.slice(10, 20),
			totalPages: 5,
		});
	});

	it("should use default limit when limit is invalid", async () => {
		const mockProducts = Array.from({ length: 100 }, (_, i) => ({
			id: i + 1,
			name: `Product ${i + 1}`,
			price: 100,
		}));
		const defaultLimit = 100; // Default limit

		(getAllProducts as jest.Mock).mockReturnValue(mockProducts);

		const request = new NextRequest(
			"http://localhost/api/products?limit=invalid",
		);
		const response = await GET(request);
		const { products } = await response.json();

		expect(response.status).toBe(200);
		expect(products.length).toBe(defaultLimit); // Should return products up to the default limit
	});
});
