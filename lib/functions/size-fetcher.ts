import { Size } from "../config/types";

/**
 * Fetch all sizes from the API and set them using setSizes
 * @param setSizes - Function to set sizes in the state
 */
export const fetchAllSizes = async (setSizes: (sizes: Size[]) => void) => {
	await fetch("/api/sizes")
		.then((response) => response.json())
		.then((data) => setSizes(data.sizes))
		.catch((error) => console.error("Fetching sizes failed:", error));
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
