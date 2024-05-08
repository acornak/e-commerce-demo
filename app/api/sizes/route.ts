/* eslint-disable import/prefer-default-export */
import { getAllSizes } from "@/lib/models/size";

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url);
	const sizes = getAllSizes();
	const sizeId = searchParams.get("sizeId");

	if (sizeId) {
		const size = sizes.find((s) => s.id === Number(sizeId));
		if (size) {
			return new Response(JSON.stringify({ size }), { status: 200 });
		}
		return new Response(JSON.stringify({ message: "Size not found" }), {
			status: 404,
		});
	}

	return Response.json({ sizes });
}
