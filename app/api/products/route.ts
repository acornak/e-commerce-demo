/* eslint-disable import/prefer-default-export */
// Types and constants
import { Product } from "@/lib/models/product_1";
// dummy data
import products from "./data";

/**
 * Get product by ID
 * @param id - product ID
 * @returns product object
 */
function getProductById(id: number): Product | undefined {
	return products.find((product) => product.id === id);
}

/**
 * Get products by category
 * @param category - category to filter by (e.g. "top")
 * @returns array of products
 */
function getProductsByCategory(category: string): Product[] {
	return products.filter((product) =>
		product.categories.includes(category.toLowerCase()),
	);
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const category = searchParams.get("category");
	const productId = searchParams.get("id");
	let limit = 100;

	if (Number(searchParams.get("limit"))) {
		limit = Number(searchParams.get("limit"));
	}

	if (category) {
		return Response.json({
			products: getProductsByCategory(category).slice(0, limit),
		});
	}

	if (productId) {
		const product = getProductById(Number(productId));
		if (product) {
			return Response.json({ product });
		}
		return Response.json({ message: "Product not found" }, { status: 404 });
	}

	return Response.json({ products: products.slice(0, limit) });
}
