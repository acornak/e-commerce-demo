import { Brand } from "../config/types";

/**
 * Fetch all brands from the API and set them using setBrands
 * @param setBrands - Function to set brands in the state
 */
export const fetchAllBrands = async (setBrands: (brands: Brand[]) => void) => {
	await fetch("/api/brands")
		.then((response) => response.json())
		.then((data) => setBrands(data.brands))
		.catch((error) => console.error("Fetching brands failed:", error));
};

// TODO in API
/**
 * Fetch a brand by its ID from the API and set it using setBrand
 * @param brandId - Brand ID
 * @param setBrand - Function to set the brand in the state
 */
export const fetchBrandById = async (
	brandId: number,
	setBrand: (brand: Brand) => void,
) => {
	await fetch(`/api/brands?brandId=${brandId}`)
		.then((response) => response.json())
		.then((data) => setBrand(data.brand))
		.catch((error) => console.error("Fetching brand by id failed:", error));
};
