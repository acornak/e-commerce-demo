import { Brand } from "../models/brand";

export const fetchAllBrands = async (setBrands: (brands: Brand[]) => void) => {
	await fetch("/api/brands")
		.then((response) => response.json())
		.then((data) => setBrands(data.brands))
		.catch((error) => console.error("Fetching brands failed:", error));
};

// TODO in API
export const fetchBrandById = async (
	brandId: number,
	setBrand: (brand: Brand) => void,
) => {
	await fetch(`/api/brands?brandId=${brandId}`)
		.then((response) => response.json())
		.then((data) => setBrand(data.brand))
		.catch((error) => console.error("Fetching brand by id failed:", error));
};
