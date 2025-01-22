/**
 * @jest-environment node
 */
import { GET } from "@/app/api/sizes/route";
import { getAllSizes } from "@/lib/models/size";
import { NextRequest } from "next/server";

jest.mock("@/lib/models/size", () => ({
	getAllSizes: jest.fn(),
}));

describe("GET /api/sizes", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return a size by ID", async () => {
		const mockSize = { id: 1, name: "Small" };
		(getAllSizes as jest.Mock).mockReturnValue([mockSize]);

		const request = new NextRequest("http://localhost/api/sizes?sizeId=1");
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ size: mockSize });
	});

	it("should return 404 if size not found", async () => {
		(getAllSizes as jest.Mock).mockReturnValue([]);

		const request = new NextRequest("http://localhost/api/sizes?sizeId=1");
		const response = await GET(request);

		expect(response.status).toBe(404);
	});

	it("should return a list of sizes", async () => {
		const mockSizes = [
			{ id: 1, name: "Small" },
			{ id: 2, name: "Medium" },
			{ id: 3, name: "Large" },
		];
		(getAllSizes as jest.Mock).mockReturnValue(mockSizes);

		const request = new NextRequest("http://localhost/api/sizes");
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ sizes: mockSizes });
	});
});
