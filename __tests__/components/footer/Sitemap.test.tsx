import Sitemap from "@/components/footer/Sitemap";
import { render, screen } from "@testing-library/react";

// Fully tested
describe("Sitemap", () => {
	it("renders without crashing", () => {
		render(<Sitemap />);
		expect(screen.getByTestId("sitemap-footer")).toBeInTheDocument();
	});
});
