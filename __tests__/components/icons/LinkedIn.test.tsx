import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import LinkedInIcon from "@/components/icon/LinkedIn";

describe("LinkedInIcon", () => {
	it("renders an icon", () => {
		render(<LinkedInIcon />);

		const icon = screen.getByTestId("LinkedInicon");

		expect(icon).toBeInTheDocument();
	});
});
