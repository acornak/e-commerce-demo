// dummy data
import dummyProducts from "./dummy-products";

export type Variant = {
	id: number;
	name: string;
	image: string;
	price: number;
	previousPrice?: number;
	countInStock: number;
};

export type Product = {
	id: number;
	name: string;
	slug: string;
	price: number;
	previousPrice?: number;
	brand: string;
	description: string;
	categories: string[];
	rating?: number;
	countInStock?: number;
	variants?: Variant[];
	reviews?: string[];
	tags: string[];
	specialOffer?: boolean;
};

/**
 * Get all products
 * @returns array of products
 */
export function getAllProducts(): Product[] {
	return dummyProducts;
}

/**
 * Get product by ID
 * @param products - array of products
 * @param id - product ID
 * @returns product object
 */
export function getProductsById(
	products: Product[],
	id: number,
): Product | undefined {
	return products.find((product) => product.id === id);
}

/**
 * Get products by category
 * @param products - array of products
 * @param category - category to filter by (e.g. "top")
 * @returns array of products
 */
export function getProductsByCategory(
	products: Product[],
	category: string,
): Product[] {
	return products.filter((product) =>
		product.categories.includes(category.toLowerCase()),
	);
}
