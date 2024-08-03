import NotFound from "@/app/not-found";
import { render, screen } from "@testing-library/react";

describe("Not Found Page", () => {
	it("renders the not found page", () => {
		render(<NotFound />);

		expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
	});
});
