/* eslint-disable import/prefer-default-export */
// Types and constants
import { sortOptions } from "@/lib/config/constants";
import { SortOption } from "@/lib/config/types";
import {
	getAllProducts,
	getProductById,
	getProductsByBrand,
	getProductsByCategory,
	getProductsBySizes,
	getProductsByTags,
} from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get a list of products based on the query parameters.
 * @param {NextRequest} request - Request object
 * @returns {NextResponse} - Response with a list of products
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);
	const categoryId = searchParams.get("categoryId");
	const brandId = searchParams.get("brandId");
	const productId = searchParams.get("productId");
	const sizeIds = searchParams
		.getAll("sizeIds")
		.map((sizeId) => sizeId.split(",").map(Number))
		.flat();

	const priceRange = searchParams.get("priceRange");
	const tags = searchParams.getAll("tags").map(decodeURIComponent);
	const sortBy = searchParams.get("sortBy");
	const page = parseInt(searchParams.get("page") || "1", 10);

	let products = getAllProducts();

	const limitParam = searchParams.get("limit");
	const limit =
		limitParam && !Number.isNaN(parseInt(limitParam, 10))
			? parseInt(limitParam, 10)
			: 100;

	if (productId) {
		const product = getProductById(products, Number(productId));
		if (product) {
			return NextResponse.json({ product });
		}
		return NextResponse.json(
			{ message: "Product not found" },
			{ status: 404 },
		);
	}

	if (categoryId) {
		products = getProductsByCategory(products, Number(categoryId));
	}

	if (sizeIds.length) {
		products = getProductsBySizes(products, sizeIds);
	}

	if (tags.length) {
		products = getProductsByTags(products, tags);
	}

	if (brandId) {
		products = getProductsByBrand(products, Number(brandId));
	}

	if (priceRange) {
		const [minPrice, maxPrice] = priceRange.split("-").map(Number);
		products = products.filter(
			(product) => product.price >= minPrice && product.price <= maxPrice,
		);
	}

	if (sortBy) {
		const sortFunc = sortOptions.find(
			(option: SortOption) => option.value === sortBy,
		)?.sortFunc;

		products = sortFunc!(products); // TODO: not sure about this
	}

	const startIndex = (page - 1) * limit;
	const paginatedProducts = products.slice(startIndex, startIndex + limit);
	const totalPages = Math.ceil(products.length / limit);

	return NextResponse.json({ products: paginatedProducts, totalPages });
}
