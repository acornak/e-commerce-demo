import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ChevronDownIcon from "@/components/icon/ChevronDown";

describe("ChevronDownIcon", () => {
	it("renders an icon", () => {
		render(<ChevronDownIcon />);

		const icon = screen.getByTestId("ChevronDownicon");

		expect(icon).toBeInTheDocument();
	});
});
