import ProductsPage from "@/app/products/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/hero/StyledHero", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-hero" />,
}));

jest.mock("@/components/common/Newsletter", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-newsletter" />,
}));

jest.mock("@/components/product/ProductGrid", () => ({
	__esModule: true,
	default: () => <div data-testid="product-grid" />,
}));

jest.mock("@/components/product/ProductsFilter", () => ({
	__esModule: true,
	default: () => <div data-testid="products-filter" />,
}));

describe("Products Page", () => {
	it("renders the products page", () => {
		render(<ProductsPage />);

		expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
		expect(screen.getByTestId("mock-newsletter")).toBeInTheDocument();
	});
});
