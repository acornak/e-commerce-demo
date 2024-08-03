import mockProducts from "@/__mocks__/products/products.mock";
import ProductPage from "@/app/products/[slug]/page";
import { Product } from "@/lib/config/types";
import { getAllProducts } from "@/lib/models/product";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

jest.mock("@/components/hero/StyledHero", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-hero" />,
}));

jest.mock("@/components/product/ProductPageOverview", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-product-page-overview" />,
}));

jest.mock("@/components/common/Newsletter", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-newsletter" />,
}));

const mockAllProducts: Product[] = mockProducts.slice(0, 5);

jest.mock("@/lib/models/product", () => ({
	getAllProducts: jest.fn(() => mockAllProducts),
}));

describe("Product Page", () => {
	beforeEach(() => {
		(getAllProducts as jest.Mock).mockReturnValue(mockProducts);
	});

	it("renders the product page", async () => {
		render(await ProductPage({ params: { slug: mockProducts[0].slug } }));

		await waitFor(() => {
			expect(
				screen.getByTestId("mock-product-page-overview"),
			).toBeInTheDocument();
		});
	});

	it("renders the product page with the correct product", async () => {
		render(await ProductPage({ params: { slug: "product-1" } }));

		await waitFor(() => {
			expect(
				screen.getByTestId("mock-styled-heading"),
			).toBeInTheDocument();
			expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
			expect(screen.getByTestId("product-not-found")).toBeInTheDocument();
		});
	});
});
