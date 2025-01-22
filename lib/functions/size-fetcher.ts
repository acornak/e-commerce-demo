import { Size } from "../config/types";

/**
 * Fetch all sizes from the API and set them using setSizes
 * @returns Array of sizes
 */
export const fetchAllSizes = async (): Promise<Size[]> => {
	try {
		const response = await fetch("/api/sizes");
		const data = await response.json();

		return data.sizes;
	} catch (error: any) {
		throw new Error(`Fetching sizes failed: ${error}`);
	}
};

/**
 * Fetch a size by its ID from the API and set it using setSize
 * @param sizeId - Size ID
 * @param setSize - Function to set the size in the state
 */
export const fetchSizeById = async (
	sizeId: number,
	setSize: (size: Size) => void,
) => {
	await fetch(`/api/sizes?sizeId=${sizeId}`)
		.then((response) => response.json())
		.then((data) => setSize(data.size))
		.catch((error) => console.error("Fetching size by id failed:", error));
};
