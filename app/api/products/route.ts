/* eslint-disable import/prefer-default-export */
// Types and constants
import {
	getAllProducts,
	getProductsById,
	getProductsByCategory,
	getProductsByTag,
} from "@/lib/models/product";

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url);
	const categoryId = searchParams.get("categoryId");
	const productId = searchParams.get("productId");
	const tags = searchParams.getAll("tags");

	const products = getAllProducts();

	let limit = 100;

	if (Number(searchParams.get("limit"))) {
		limit = Number(searchParams.get("limit"));
	}

	if (categoryId) {
		return Response.json({
			products: getProductsByCategory(products, Number(categoryId)).slice(
				0,
				limit,
			),
		});
	}

	if (tags.length) {
		return Response.json({
			products: getProductsByTag(products, tags).slice(0, limit),
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
