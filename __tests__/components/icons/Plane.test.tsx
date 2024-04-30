import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import PaperPlaneIcon from "@/components/icon/PaperPlane";

describe("PlaneIcon", () => {
	it("renders an icon", () => {
		render(<PaperPlaneIcon />);

		const icon = screen.getByTestId("Paperplaneicon");

		expect(icon).toBeInTheDocument();
	});
});
