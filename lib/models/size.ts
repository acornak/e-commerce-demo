import mockSizes from "../../__mocks__/sizes/sizes.mock";
import { Size } from "../config/types";

/**
 * Get all sizes
 * @returns array of sizes
 */
export function getAllSizes(): Size[] {
	return mockSizes;
}

/**
 * Get sizes by id
 * @param id
 * @returns size
 */
export function getSizeById(id: number): Size | undefined {
	return mockSizes.find((size) => size.id === id);
}
