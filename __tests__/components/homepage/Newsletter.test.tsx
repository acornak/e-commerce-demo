import HomepageNewsletter from "@/components/homepage/Newsletter";
import { render, screen } from "@testing-library/react";

// Fully tested
describe("HomepageNewsletter", () => {
	it("renders without crashing", () => {
		render(<HomepageNewsletter />);
		expect(screen.getByTestId("homepage-newsletter")).toBeInTheDocument();
	});
});
