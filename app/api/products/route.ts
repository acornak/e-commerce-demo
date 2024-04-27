/* eslint-disable import/prefer-default-export */
// Types and constants
import {
	getAllProducts,
	getProductsById,
	getProductsByCategory,
} from "@/lib/models/product";

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url);
	const category = searchParams.get("category");
	const productId = searchParams.get("id");

	const products = getAllProducts();

	let limit = 100;

	if (Number(searchParams.get("limit"))) {
		limit = Number(searchParams.get("limit"));
	}

	if (category) {
		return Response.json({
			products: getProductsByCategory(products, category).slice(0, limit),
		});
	}

	if (productId) {
		const product = getProductsById(products, Number(productId));
		if (product) {
			return Response.json({ product });
		}
		return Response.json({ message: "Product not found" }, { status: 404 });
	}

	return Response.json({ products: products.slice(0, limit) });
}
