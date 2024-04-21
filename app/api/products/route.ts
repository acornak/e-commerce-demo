// Types
import { Product } from "@/lib/models/Product";
// dummy data
import products from "./data";

function getProductsByCategory(category: string): Product[] {
	return products.filter((product) =>
		product.category.includes(category.toLowerCase()),
	);
}

// eslint-disable-next-line import/prefer-default-export
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
