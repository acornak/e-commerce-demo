/* eslint-disable import/prefer-default-export */
import { getAllProducts } from "@/lib/models/product";
import { NextResponse } from "next/server";

/**
 * Get the maximum price of all products.
 * @returns The maximum price of all products.
 */
export async function GET(): Promise<NextResponse> {
	const products = getAllProducts();

	const maxPrice = Math.max(...products.map((product) => product.price));

	return NextResponse.json({ maxPrice });
}
