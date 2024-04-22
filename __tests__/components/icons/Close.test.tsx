import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import CloseIcon from "@/components/icon/Close";

describe("CloseIcon", () => {
	it("renders an icon", () => {
		render(<CloseIcon />);

		const icon = screen.getByTestId("Closeicon");

		expect(icon).toBeInTheDocument();
	});
});
