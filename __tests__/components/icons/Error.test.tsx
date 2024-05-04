import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ErrorIcon from "@/components/icon/Error";

describe("ErrorIcon", () => {
	it("renders an icon", () => {
		render(<ErrorIcon />);

		const icon = screen.getByTestId("Erroricon");

		expect(icon).toBeInTheDocument();
	});
});
