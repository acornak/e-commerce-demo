import Collection from "@/components/homepage/Collection";
import { render, screen } from "@testing-library/react";

describe("Collection", () => {
	it("renders without crashing", () => {
		render(<Collection />);
		expect(screen.getByTestId("homepage-collection")).toBeInTheDocument();
	});

	// TODO: test carousel
});
