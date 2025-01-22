import AboutPage from "@/app/about/page";
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
describe("About Page", () => {
	it("renders the about page", () => {
		render(<AboutPage />);

		expect(screen.getByTestId("about-our-story")).toBeInTheDocument();
		expect(screen.getByTestId("about-our-brand")).toBeInTheDocument();
		expect(screen.getByTestId("about-our-commitment")).toBeInTheDocument();
		expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
		expect(screen.getByTestId("mock-newsletter")).toBeInTheDocument();
	});
});
