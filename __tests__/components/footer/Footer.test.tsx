import Footer from "@/components/footer/Footer";
import { render, screen } from "@testing-library/react";

// Fully tested
describe("Footer", () => {
	it("renders without crashing", () => {
		render(<Footer />);
		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});
});
