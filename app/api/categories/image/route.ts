/* eslint-disable import/prefer-default-export */
import fs, { Dirent } from "fs";
import path from "path";

function getFileExtension(file: string): string {
	return file.split(".").pop() || "";
}

/**
 * Get category image by category ID
 * @param {Request} request - Request object
 * @returns {Response} - Response with image
 */
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const categoryId = searchParams.get("categoryId");

	if (!categoryId) {
		return Response.json(
			{ error: "Category ID is required" },
			{ status: 400 },
		);
	}

	const matchedFiles: string[] = [];
	const directoryPath = path.resolve(".", "public/categories");

	const dirFiles = fs.readdirSync(directoryPath, { withFileTypes: true });

	dirFiles.forEach((file: Dirent) => {
		if (
			file.isFile() &&
			file.name.startsWith(`category${categoryId}_preview`)
		) {
			matchedFiles.push(path.join(directoryPath, file.name));
		}
	});

	if (matchedFiles.length === 0) {
		return new Response(null, { status: 404 });
	}

	const imageBuffer = fs.readFileSync(matchedFiles[0]);

	return new Response(imageBuffer, {
		headers: {
			"Content-Type": `image/${getFileExtension(matchedFiles[0])}`,
		},
	});
}
