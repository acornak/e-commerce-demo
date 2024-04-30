/* eslint-disable import/prefer-default-export */
import { getAllCategories } from "@/lib/models/category";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	let limit = 100;

	if (Number(searchParams.get("limit"))) {
		limit = Number(searchParams.get("limit"));
	}

	const categories = getAllCategories();

	return Response.json({ categories: categories.slice(0, limit) });
}
