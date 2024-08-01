/**
 * @jest-environment node
 */
import { GET } from "@/app/api/brands/route";
import { NextRequest } from "next/server";

jest.mock("@/lib/models/brand", () => ({
	getAllBrands: () => [
		{ id: 1, name: "Brand 1" },
		{ id: 2, name: "Brand 2" },
		{ id: 3, name: "Brand 3" },
	],
}));

describe("GET /api/brands", () => {
	it("should return a list of brands", async () => {
		const url = new URL("http://localhost:3000/api/brands?limit=2");
		const request = {
			url: url.toString(),
			nextUrl: url,
		} as unknown as NextRequest;

		const response = await GET(request);

		const jsonResponse = await response.json();

		expect(response.status).toBe(200);
		expect(jsonResponse).toEqual({
			brands: [
				{ id: 1, name: "Brand 1" },
				{ id: 2, name: "Brand 2" },
			],
		});
	});
});
