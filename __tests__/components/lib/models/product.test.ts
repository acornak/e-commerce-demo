import {
	getAllProducts,
	getProductById,
	getProductsByBrand,
	getProductsByCategory,
	getProductsByTags,
} from "@/lib/models/product";
import mockProducts from "@/__mocks__/products/products.mock";

describe("getAllProducts", () => {
	it("should return all products", () => {
		const products = getAllProducts();
		expect(products).toEqual(mockProducts);
	});
});

describe("getProductById", () => {
	it("should return product by id", () => {
		const products = getProductById(mockProducts.slice(0, 4), 1);
		expect(products).toEqual(mockProducts[0]);
	});

	it("should return empty array", () => {
		const products = getProductById(mockProducts, 100);
		expect(products).toEqual(undefined);
	});
});

describe("getProductsByCategory", () => {
	it("should return products by category id", () => {
		const products = getProductsByCategory(mockProducts.slice(0, 4), 1);
		expect(products).toEqual([mockProducts[2], mockProducts[3]]);
	});

	it("should return empty array", () => {
		const products = getProductsByCategory(mockProducts, 100);
		expect(products).toEqual([]);
	});
});

describe("getProductsByTags", () => {
	it("should return products by tags", () => {
		const products = getProductsByTags(mockProducts.slice(0, 4), [
			"nike",
			"round",
		]);
		expect(products).toEqual([
			mockProducts[1],
			mockProducts[2],
			mockProducts[3],
		]);
	});

	it("should return empty array", () => {
		const products = getProductsByTags(mockProducts, ["zidan"]);
		expect(products).toEqual([]);
	});
});

describe("getProductsByBrand", () => {
	it("should return products by tags", () => {
		const products = getProductsByBrand(mockProducts.slice(0, 4), 1);
		expect(products).toEqual([mockProducts[0]]);
	});

	it("should return empty array", () => {
		const products = getProductsByBrand(mockProducts, 999);
		expect(products).toEqual([]);
	});
});
