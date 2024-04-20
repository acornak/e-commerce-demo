import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import HeartIcon from "@/components/icons/Heart";

describe("HeartIcon", () => {
	it("renders an icon", () => {
		render(<HeartIcon />);

		const icon = screen.getByTestId("Hearticon");

		expect(icon).toBeInTheDocument();
	});
});
