import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import SuccessIcon from "@/components/icon/Success";

describe("SuccessIcon", () => {
	it("renders an icon", () => {
		render(<SuccessIcon />);

		const icon = screen.getByTestId("Successicon");

		expect(icon).toBeInTheDocument();
	});
});
