/**
 * @jest-environment node
 */
import { GET } from "@/app/api/products/max-price/route";

jest.mock("@/lib/models/product", () => ({
	getAllProducts: () => [{ price: 1000 }, { price: 500 }, { price: 750 }],
}));

describe("GET /api/products/max-price", () => {
	it("should return the max price of all products", async () => {
		const response = await GET();

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			maxPrice: 1000,
		});
	});
});
