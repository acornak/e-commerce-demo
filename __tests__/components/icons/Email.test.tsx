import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import EmailIcon from "@/components/icon/Email";

describe("EmailIcon", () => {
	it("renders an icon", () => {
		render(<EmailIcon />);

		const icon = screen.getByTestId("Emailicon");

		expect(icon).toBeInTheDocument();
	});
});
