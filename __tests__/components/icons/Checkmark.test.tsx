import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import CheckmarkIcon from "@/components/icon/Checkmark";

describe("CheckmarkIcon", () => {
	it("renders an icon", () => {
		render(<CheckmarkIcon />);

		const icon = screen.getByTestId("Checkmarkicon");

		expect(icon).toBeInTheDocument();
	});
});
