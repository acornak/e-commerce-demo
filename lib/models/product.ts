import mockProducts from "../../__mocks__/products/products.mock";

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
	previewImage?: string;
	images?: string[];
	brandId: number;
	perex: string;
	sizeIds: number[];
	categories: number[];
	rating?: number;
	countInStock?: number;
	variants?: Variant[];
	reviews?: string[];
	tags: string[];
	specialOffer?: boolean;
	description?: string;
};

/**
 * Get all products
 * @returns array of products
 */
export function getAllProducts(): Product[] {
	return mockProducts;
}

/**
 * Get product by ID
 * @param products - array of products
 * @param id - product ID
 * @returns product object
 */
export function getProductById(
	products: Product[],
	id: number,
): Product | undefined {
	return products.find((product) => product.id === id);
}

/**
 * Get products by category
 * @param products - array of products
 * @param categoryId - category id to filter by
 * @returns array of products
 */
export function getProductsByCategory(
	products: Product[],
	categoryId: number,
): Product[] {
	return products.filter((product) =>
		product.categories.includes(categoryId),
	);
}

/**
 * Get products by tag
 * @param products - array of products
 * @param tags - array of tags to filter by
 * @returns array of products
 */
export function getProductsByTags(
	products: Product[],
	tags: string[],
): Product[] {
	return products.filter((product) =>
		tags.some((tag) => product.tags.includes(tag)),
	);
}

/**
 * Get product by brand
 * @param products - array of products
 * @param brandId - brand id to filter by
 * @returns array of products
 */
export function getProductsByBrand(
	products: Product[],
	brandId: number,
): Product[] {
	return products.filter((product) => product.brandId === brandId);
}

/**
 * Get product by sizes
 * @param products - array of products
 * @param sizeIds - array of size ids to filter by
 * @returns array of products
 */
export function getProductsBySizes(
	products: Product[],
	sizeIds: number[],
): Product[] {
	return products.filter((product) =>
		sizeIds.some((sizeId) => product.sizeIds.includes(sizeId)),
	);
}
