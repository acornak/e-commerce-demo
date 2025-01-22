/**
 * @jest-environment node
 */
import { GET } from "@/app/api/categories/route";
import { NextRequest } from "next/server";

jest.mock("@/lib/models/category", () => ({
	getAllCategories: () => [
		{ id: 1, name: "Category 1" },
		{ id: 2, name: "Category 2" },
		{ id: 3, name: "Category 3" },
	],
}));

describe("GET /api/categories", () => {
	it("should return a list of categories", async () => {
		const url = new URL("http://localhost:3000/api/categories?limit=2");
		const request = {
			url: url.toString(),
			nextUrl: url,
		} as unknown as NextRequest;

		const response = await GET(request);

		const jsonResponse = await response.json();

		expect(response.status).toBe(200);
		expect(jsonResponse).toEqual({
			categories: [
				{ id: 1, name: "Category 1" },
				{ id: 2, name: "Category 2" },
			],
		});
	});
});
