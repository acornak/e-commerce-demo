import Social from "@/components/footer/Social";
import { render, screen } from "@testing-library/react";

describe("Social", () => {
	it("renders without crashing", () => {
		render(<Social />);
		expect(screen.getByTestId("social-footer")).toBeInTheDocument();
	});

	// TODO: test carousel
});
