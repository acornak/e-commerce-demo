import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ChevronRightIcon from "@/components/icons/ChevronRight";

describe("ChevronRightIcon", () => {
	it("renders an icon", () => {
		render(<ChevronRightIcon />);

		const icon = screen.getByTestId("ChevronRighticon");

		expect(icon).toBeInTheDocument();
	});
});
