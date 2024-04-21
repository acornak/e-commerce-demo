/* eslint-disable import/prefer-default-export */
// Types and constants
import { Product } from "@/lib/models/Product";
// dummy data
import products from "./data";

/**
 * Get products by category
 * @param category - category to filter by (e.g. "top")
 * @returns array of products
 */
function getProductsByCategory(category: string): Product[] {
	return products.filter((product) =>
		product.category.includes(category.toLowerCase()),
	);
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const category = searchParams.get("category");
	let limit = 100;

	if (Number(searchParams.get("limit"))) {
		limit = Number(searchParams.get("limit"));
	}

	if (category) {
		return Response.json({
			products: getProductsByCategory(category).slice(0, limit),
		});
	}

	return Response.json({ products: products.slice(0, limit) });
}
