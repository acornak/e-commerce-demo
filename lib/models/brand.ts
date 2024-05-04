import mockBrands from "../../__mocks__/brands/brands.mock";

export type Brand = {
	id: number;
	name: string;
	slug: string;
	image?: string;
};

/**
 * Get all brands
 * @returns array of brands
 */
export function getAllBrands(): Brand[] {
	return mockBrands;
}

/**
 * Get brand by id
 * @param id
 * @returns brand
 */
export function getBrandById(id: number): Brand | undefined {
	return mockBrands.find((brand) => brand.id === id);
}
