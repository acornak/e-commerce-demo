/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from "next/server";
import { getAllBrands } from "@/lib/models/brand";

/**
 * Get all brands
 * @param {NextRequest} request - Request object
 * @returns {NextResponse} - Response with brands
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);
	let limit = 1000;

	if (Number(searchParams.get("limit"))) {
		limit = Number(searchParams.get("limit"));
	}

	const brands = getAllBrands();

	return NextResponse.json({ brands: brands.slice(0, limit) });
}
