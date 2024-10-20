import mockProducts from "@/__mocks__/products/products.mock";
import {
	sortProductsByNameAsc,
	sortProductsByNameDesc,
	sortProductsByPriceAsc,
	sortProductsByPriceDesc,
	sortProductsDefault,
} from "@/lib/functions/sort-products";

describe("sortProductsByPriceAsc", () => {
	it("should correctly return default products sorting", () => {
		const products = mockProducts.slice(0, 4);

		const sortedProducts = sortProductsDefault(products);

		expect(sortedProducts).toEqual(products);
	});

	it("should correctly sort the products in ascending order of price", () => {
		const products = mockProducts.slice(0, 4);

		const sortedProducts = sortProductsByPriceAsc(products);

		sortedProducts.forEach((product, index) => {
			if (index < sortedProducts.length - 1) {
				expect(product.price).toBeLessThanOrEqual(
					sortedProducts[index + 1].price,
				);
			}
		});
	});

	it("should not change the original products array", () => {
		const products = mockProducts.slice(0, 4);

		const productsCopy = [...products];
		sortProductsByPriceAsc(products);

		expect(products).toEqual(productsCopy);
	});
});

describe("sortProductsByPriceDesc", () => {
	it("should correctly sort the products in descending order of price", () => {
		const products = mockProducts.slice(0, 4);

		const sortedProducts = sortProductsByPriceDesc(products);

		sortedProducts.forEach((product, index) => {
			if (index < sortedProducts.length - 1) {
				expect(product.price).toBeGreaterThanOrEqual(
					sortedProducts[index + 1].price,
				);
			}
		});
	});

	it("should not change the original products array", () => {
		const products = mockProducts.slice(0, 4);

		const productsCopy = [...products];
		sortProductsByPriceDesc(products);

		expect(products).toEqual(productsCopy);
	});
});

describe("sortProductsByNameAsc", () => {
	it("should correctly sort the products in ascending order of name", () => {
		const products = mockProducts.slice(0, 4);

		const sortedProducts = sortProductsByNameAsc(products);

		sortedProducts.forEach((product, index) => {
			if (index < sortedProducts.length - 1) {
				expect(
					product.name.localeCompare(sortedProducts[index + 1].name),
				).toBeLessThanOrEqual(0);
			}
		});
	});

	it("should not change the original products array", () => {
		const products = mockProducts.slice(0, 4);

		const productsCopy = [...products];
		sortProductsByNameAsc(products);

		expect(products).toEqual(productsCopy);
	});
});

describe("sortProductsByNameDesc", () => {
	it("should correctly sort the products in descending order of name", () => {
		const products = mockProducts.slice(0, 4);

		const sortedProducts = sortProductsByNameDesc(products);

		sortedProducts.forEach((product, index) => {
			if (index < sortedProducts.length - 1) {
				expect(
					product.name.localeCompare(sortedProducts[index + 1].name),
				).toBeGreaterThanOrEqual(0);
			}
		});
	});

	it("should not change the original products array", () => {
		const products = mockProducts.slice(0, 4);

		const productsCopy = [...products];
		sortProductsByNameDesc(products);

		expect(products).toEqual(productsCopy);
	});
});
