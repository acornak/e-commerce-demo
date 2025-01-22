/**
 * @jest-environment node
 */
import { GET } from "@/app/api/categories/image/route";
import { NextRequest } from "next/server";
import path from "path";
import fs, { Dirent } from "fs";

jest.mock("fs");
jest.mock("path");

describe("GET /api/categories/image", () => {
	const mockCategoryId = "123";
	const mockFilePath = `public/categories/category${mockCategoryId}_preview.webp`;
	const mockFileBuffer = Buffer.from("image data");

	beforeEach(() => {
		(path.resolve as jest.Mock).mockReturnValue("public/categories");
		(path.join as jest.Mock).mockReturnValue(mockFilePath);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return 400 if no category ID is provided", async () => {
		const request = {
			url: "http://localhost:3000/api/categories/image",
		} as unknown as NextRequest;

		const response = await GET(request);

		expect(response.status).toBe(400);
	});

	it("should return 404 if no matching files are found", async () => {
		(fs.readdirSync as jest.Mock).mockReturnValue([]);

		const request = {
			url: `http://localhost/api/category/image?categoryId=${mockCategoryId}`,
		} as unknown as NextRequest;

		const response = await GET(request);

		expect(response.status).toBe(404);
	});

	it("should return the image if a matching file is found", async () => {
		const mockDirent: Dirent = {
			name: `category${mockCategoryId}_preview.webp`,
			isFile: () => true,
			isDirectory: () => false,
			isBlockDevice: () => false,
			isCharacterDevice: () => false,
			isSymbolicLink: () => false,
			isFIFO: () => false,
			isSocket: () => false,
		} as unknown as Dirent;

		(fs.readdirSync as jest.Mock).mockReturnValue([mockDirent]);
		(fs.readFileSync as jest.Mock).mockReturnValue(mockFileBuffer);

		const request = {
			url: `http://localhost/api/category/image?categoryId=${mockCategoryId}`,
		} as unknown as NextRequest;

		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("image/webp");
		const arrayBuffer = await response.arrayBuffer();
		expect(Buffer.from(arrayBuffer)).toEqual(mockFileBuffer);
	});
});
