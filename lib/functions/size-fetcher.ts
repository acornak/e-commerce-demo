import { Size } from "../config/types";

export const fetchAllSizes = async (setSizes: (sizes: Size[]) => void) => {
	await fetch("/api/sizes")
		.then((response) => response.json())
		.then((data) => setSizes(data.sizes))
		.catch((error) => console.error("Fetching sizes failed:", error));
};

export const fetchSizeById = async (
	sizeId: number,
	setSize: (size: Size) => void,
) => {
	await fetch(`/api/sizes?sizeId=${sizeId}`)
		.then((response) => response.json())
		.then((data) => setSize(data.size))
		.catch((error) => console.error("Fetching size by id failed:", error));
};
