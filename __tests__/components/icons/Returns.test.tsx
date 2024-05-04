import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ReturnsIcon from "@/components/icon/Returns";

describe("ReturnsIcon", () => {
	it("renders an icon", () => {
		render(<ReturnsIcon />);

		const icon = screen.getByTestId("Returnsicon");

		expect(icon).toBeInTheDocument();
	});
});
