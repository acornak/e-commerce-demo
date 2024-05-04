import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import PaperPlaneIcon from "@/components/icon/PaperPlane";

describe("PaperPlaneIcon", () => {
	it("renders an icon", () => {
		render(<PaperPlaneIcon />);

		const icon = screen.getByTestId("Paperplaneicon");

		expect(icon).toBeInTheDocument();
	});
});
