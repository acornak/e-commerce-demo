/* eslint-disable import/prefer-default-export */
import { getAllProducts } from "@/lib/models/product";

export async function GET() {
	const products = getAllProducts();

	const maxPrice = Math.max(...products.map((product) => product.price));

	return Response.json({ maxPrice });
}
