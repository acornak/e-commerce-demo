/* eslint-disable import/prefer-default-export */
import { getAllSizes } from "@/lib/models/size";

export async function GET() {
	const sizes = getAllSizes();

	return Response.json({ sizes });
}
