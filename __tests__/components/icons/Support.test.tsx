import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import SupportIcon from "@/components/icon/Support";

describe("SupportIcon", () => {
	it("renders an icon", () => {
		render(<SupportIcon />);

		const icon = screen.getByTestId("Supporticon");

		expect(icon).toBeInTheDocument();
	});
});
