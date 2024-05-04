import { getAllSizes, getSizeById } from "@/lib/models/size";
import mockSizes from "@/__mocks__/sizes/sizes.mock";

describe("getAllSizes", () => {
	it("should return all sizes", () => {
		const sizes = getAllSizes();
		expect(sizes).toEqual(mockSizes);
	});
});

describe("getSizeById", () => {
	it("should return size by id", () => {
		const sizes = getSizeById(1);
		expect(sizes).toEqual(mockSizes[0]);
	});
});
