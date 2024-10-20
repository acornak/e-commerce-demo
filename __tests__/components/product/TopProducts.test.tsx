import React from "react";
// Testing
import { render, screen, waitFor } from "@testing-library/react";
// Components
import TopProducts from "@/components/product/TopProducts";
// Functions
import { fetchProductsByCategory } from "@/lib/functions/product-fetcher";
// Mocks
import mockProducts from "@/__mocks__/products/products.mock";

jest.mock("@/components/product/ProductPreview", () => ({
	__esModule: true,
	default: ({ product }: any) => (
		<div data-testid="product-preview">
			<p>{product.name}</p>
		</div>
	),
}));

jest.mock("@/lib/functions/product-fetcher", () => ({
	fetchProductsByCategory: jest.fn(),
}));

describe("TopProducts", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render the related products", async () => {
		(fetchProductsByCategory as jest.Mock).mockImplementation(() =>
			Promise.resolve(mockProducts.slice(0, 4)),
		);

		render(<TopProducts />);

		await waitFor(() => {
			expect(fetchProductsByCategory).toHaveBeenCalled();
		});

		await waitFor(() => {
			expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
			expect(screen.getByText(mockProducts[1].name)).toBeInTheDocument();
			expect(screen.getByText(mockProducts[2].name)).toBeInTheDocument();
			expect(screen.getByText(mockProducts[3].name)).toBeInTheDocument();
		});
	});

	it("should not render related products when fetch resolves to error", async () => {
		(fetchProductsByCategory as jest.Mock).mockRejectedValue(
			new Error("Failed to fetch products"),
		);

		render(<TopProducts />);

		await waitFor(() => {
			expect(fetchProductsByCategory).toHaveBeenCalled();
		});

		expect(
			screen.queryByText(mockProducts[0].name),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText(mockProducts[1].name),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText(mockProducts[2].name),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText(mockProducts[3].name),
		).not.toBeInTheDocument();
	});
});
