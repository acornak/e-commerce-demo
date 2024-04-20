import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ChevronLeftIcon from "@/components/icons/ChevronLeft";

describe("ChevronLeftIcon", () => {
	it("renders an icon", () => {
		render(<ChevronLeftIcon />);

		const icon = screen.getByTestId("ChevronLefticon");

		expect(icon).toBeInTheDocument();
	});
});
