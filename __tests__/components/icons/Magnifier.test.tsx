import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import MagnifierIcon from "@/components/icon/Magnifier";

describe("MagnifierIcon", () => {
	it("renders an icon", () => {
		render(<MagnifierIcon />);

		const icon = screen.getByTestId("Magnifiericon");

		expect(icon).toBeInTheDocument();
	});
});
