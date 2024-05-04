import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import DiamondIcon from "@/components/icon/Diamond";

describe("DiamondIcon", () => {
	it("renders an icon", () => {
		render(<DiamondIcon />);

		const icon = screen.getByTestId("Diamondicon");

		expect(icon).toBeInTheDocument();
	});
});
