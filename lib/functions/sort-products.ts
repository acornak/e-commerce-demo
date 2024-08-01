import { Product } from "../config/types";

/**
 * Sort products by price in ascending order
 * @param products - Array of products
 * @returns Array of products
 */
export function sortProductsByPriceAsc(products: Product[]): Product[] {
	return [...products].sort((a, b) => a.price - b.price);
}

/**
 * Sort products by price in descending order
 * @param products - Array of products
 * @returns Array of products
 */
export function sortProductsByPriceDesc(products: Product[]): Product[] {
	return [...products].sort((a, b) => b.price - a.price);
}

/**
 * Sort products by name in ascending order
 * @param products - Array of products
 * @returns Array of products
 */
export function sortProductsByNameAsc(products: Product[]): Product[] {
	return [...products].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Sort products by name in descending order
 * @param products - Array of products
 * @returns Array of products
 */
export function sortProductsByNameDesc(products: Product[]): Product[] {
	return [...products].sort((a, b) => b.name.localeCompare(a.name));
}
