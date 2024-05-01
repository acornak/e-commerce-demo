/* eslint-disable import/prefer-default-export */
// Types and constants
import {
	getAllProducts,
	getProductById,
	getProductsByCategory,
	getProductsByTag,
} from "@/lib/models/product";

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url);
	const categoryId = searchParams.get("categoryId");
	const productId = searchParams.get("productId");
	const tags = searchParams.getAll("tags");
	const page = parseInt(searchParams.get("page") || "1", 10);

	let limit: number;

	const products = getAllProducts();
	let filteredProducts = products;

	if (Number(searchParams.get("limit"))) {
		limit = parseInt(searchParams.get("limit") || "12", 10);
	} else {
		limit = 100;
	}

	if (categoryId) {
		filteredProducts = getProductsByCategory(products, Number(categoryId));
	} else if (tags.length) {
		filteredProducts = getProductsByTag(products, tags);
	} else if (productId) {
		const product = getProductById(products, Number(productId));
		if (product) {
			return new Response(JSON.stringify({ product }), { status: 200 });
		}
		return new Response(JSON.stringify({ message: "Product not found" }), {
			status: 404,
		});
	}

	const startIndex = (page - 1) * limit;
	const paginatedProducts = filteredProducts.slice(
		startIndex,
		startIndex + limit,
	);
	const totalPages = Math.ceil(filteredProducts.length / limit);

	return new Response(
		JSON.stringify({ products: paginatedProducts, totalPages }),
		{
			status: 200,
		},
	);
}
