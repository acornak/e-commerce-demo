import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/hero/HomepageHero", () => ({
	__esModule: true,
	default: () => <div data-testid="homepage-hero" />,
}));

jest.mock("@/components/homepage/Collection", () => ({
	__esModule: true,
	default: () => <div data-testid="collection" />,
}));

jest.mock("@/components/product/Explore", () => ({
	__esModule: true,
	default: () => <div data-testid="explore" />,
}));

jest.mock("@/components/product/TopProducts", () => ({
	__esModule: true,
	default: () => <div data-testid="top-products" />,
}));

jest.mock("@/components/homepage/Newsletter", () => ({
	__esModule: true,
	default: () => <div data-testid="newsletter" />,
}));

jest.mock("@/components/footer/Social", () => ({
	__esModule: true,
	default: () => <div data-testid="social" />,
}));

// Fully tested
describe("Home Page", () => {
	it("renders the home page", () => {
		render(<Home />);

		expect(screen.getByTestId("homepage-hero")).toBeInTheDocument();
		expect(screen.getByTestId("collection")).toBeInTheDocument();
		expect(screen.getByTestId("explore")).toBeInTheDocument();
		expect(screen.getByTestId("top-products")).toBeInTheDocument();
		expect(screen.getByTestId("newsletter")).toBeInTheDocument();
		expect(screen.getByTestId("social")).toBeInTheDocument();
	});
});
