/* eslint-disable import/prefer-default-export */
import { getAllBrands } from "@/lib/models/brand";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	let limit = 1000;

	if (Number(searchParams.get("limit"))) {
		limit = Number(searchParams.get("limit"));
	}

	const brands = getAllBrands();

	return Response.json({ brands: brands.slice(0, limit) });
}
