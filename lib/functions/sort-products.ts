import { Product } from "../config/types";

export function sortProductsByPriceAsc(products: Product[]): Product[] {
	return [...products].sort((a, b) => a.price - b.price);
}

export function sortProductsByPriceDesc(products: Product[]): Product[] {
	return [...products].sort((a, b) => b.price - a.price);
}

export function sortProductsByNameAsc(products: Product[]): Product[] {
	return [...products].sort((a, b) => a.name.localeCompare(b.name));
}

export function sortProductsByNameDesc(products: Product[]): Product[] {
	return [...products].sort((a, b) => b.name.localeCompare(a.name));
}
