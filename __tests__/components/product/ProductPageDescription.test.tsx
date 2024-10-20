import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ProductPageDescription from "@/components/product/ProductPageDescription";
// Mocks
import mockProducts from "@/__mocks__/products/products.mock";

describe("ProductPageDescription", () => {
	it("should render the product perex", () => {
		render(<ProductPageDescription product={mockProducts[0]} />);

		expect(screen.getByText(mockProducts[0].perex)).toBeInTheDocument();
	});
});
