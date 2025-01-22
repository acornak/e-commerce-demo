import BlogPage from "@/app/blog/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/hero/StyledHero", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-hero" />,
}));

jest.mock("@/components/common/Newsletter", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-newsletter" />,
}));

// Fully tested
describe("Blog Page", () => {
	it("renders the blog page", () => {
		render(<BlogPage />);

		expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
		expect(screen.getByTestId("mock-newsletter")).toBeInTheDocument();
	});
});
