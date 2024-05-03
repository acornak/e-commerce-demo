import { Brand } from "../models/brand";

export const fetchAllBrands = (setBrands: (brands: Brand[]) => void) => {
	fetch("/api/brands")
		.then((response) => response.json())
		.then((data) => setBrands(data.brands))
		.catch((error) => console.error("Fetching brands failed:", error));
};

// TODO in API
export const fetchBrandById = (
	brandId: number,
	setBrands: (brand: Brand) => void,
) => {
	fetch(`/api/brands?brandId=${brandId}`)
		.then((response) => response.json())
		.then((data) => setBrands(data.brand))
		.catch((error) => console.error("Fetching brand by id failed:", error));
};
