import mockBrands from "../../__mocks__/brands/brands.mock";
import { Brand } from "../config/types";

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
