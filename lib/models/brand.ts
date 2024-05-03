import mockBrands from "../../__mocks__/brands/mock-brands";

export type Brand = {
	id: number;
	name: string;
	slug: string;
	image?: string;
};

/**
 * Get all categories
 * @returns array of categories
 */
export function getAllBrands(): Brand[] {
	return mockBrands;
}

/**
 * Get category by id
 * @param id
 * @returns category
 */
export function getBrandById(id: number): Brand | undefined {
	return mockBrands.find((brand) => brand.id === id);
}
