/* eslint-disable import/prefer-default-export */
import { getAllSizes } from "@/lib/models/size";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get a list of sizes based on the query parameters.
 * @param {NextRequest} request - Request object
 * @returns {NextResponse} - Response with a list of sizes
 * @throws {Error} - Throws an error if the size is not found
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);
	const sizes = getAllSizes();
	const sizeId = searchParams.get("sizeId");

	if (sizeId) {
		const size = sizes.find((s) => s.id === Number(sizeId));
		if (size) {
			return NextResponse.json({ size });
		}
		return NextResponse.json(
			{ message: "Size not found" },
			{ status: 404 },
		);
	}

	return NextResponse.json({ sizes });
}
