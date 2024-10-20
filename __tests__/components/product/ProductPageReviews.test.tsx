import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ProductPageReviews from "@/components/product/ProductPageReviews";
// Mocks
import mockProducts from "@/__mocks__/products/products.mock";

describe("ProductPageReviews", () => {
	it("should render the product reviews", () => {
		render(<ProductPageReviews product={mockProducts[0]} />);

		// TODO
		expect(screen.getByText("No reviews yet")).toBeInTheDocument();
	});

	it("should render the product reviews", () => {
		render(<ProductPageReviews product={mockProducts[1]} />);

		expect(screen.getByText("No reviews yet")).toBeInTheDocument();
	});
});
