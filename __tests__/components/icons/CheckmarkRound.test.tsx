import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import CheckmarkRoundIcon from "@/components/icon/CheckmarkRound";

describe("CheckmarkRoundIcon", () => {
	it("renders an icon", () => {
		render(<CheckmarkRoundIcon />);

		const icon = screen.getByTestId("CheckmarkRoundicon");

		expect(icon).toBeInTheDocument();
	});
});
