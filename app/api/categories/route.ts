/* eslint-disable import/prefer-default-export */
import { getAllCategories } from "@/lib/models/category";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get all categories
 * @param {NextRequest} request - Request object
 * @returns {NextResponse} - Response with categories
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);
	let limit = 1000;

	if (Number(searchParams.get("limit"))) {
		limit = Number(searchParams.get("limit"));
	}

	const categories = getAllCategories();

	return NextResponse.json({ categories: categories.slice(0, limit) });
}
