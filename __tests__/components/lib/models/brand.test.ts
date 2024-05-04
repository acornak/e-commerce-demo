import { getAllBrands, getBrandById } from "@/lib/models/brand";
import mockBrands from "@/__mocks__/brands/brands.mock";

describe("getAllBrands", () => {
	it("should return all brands", () => {
		const brands = getAllBrands();
		expect(brands).toEqual(mockBrands);
	});
});

describe("getBrandById", () => {
	it("should return brand by id", () => {
		const brands = getBrandById(1);
		expect(brands).toEqual(mockBrands[0]);
	});
});
