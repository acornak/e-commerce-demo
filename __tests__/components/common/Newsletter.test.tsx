import NewsletterBanner from "@/components/common/Newsletter";
import { render, screen } from "@testing-library/react";

// Fully tested
describe("NewsletterBanner", () => {
	it("renders correctly", () => {
		render(<NewsletterBanner />);

		expect(screen.getByTestId("newsletter-banner")).toBeInTheDocument();
	});
});
