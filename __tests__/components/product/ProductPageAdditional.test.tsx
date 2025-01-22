import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ProductPageAdditional from "@/components/product/ProductPageAdditional";

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

describe("ProductPageAdditional", () => {
	it("should render the product additional information", () => {
		render(<ProductPageAdditional imageUrl="/path/to/image" />);

		expect(
			screen.getByTestId("product-page-additional"),
		).toBeInTheDocument();
	});
});
