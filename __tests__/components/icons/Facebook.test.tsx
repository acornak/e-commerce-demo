import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import FacebookIcon from "@/components/icon/Facebook";

describe("FacebookIcon", () => {
	it("renders an icon", () => {
		render(<FacebookIcon />);

		const icon = screen.getByTestId("Facebookicon");

		expect(icon).toBeInTheDocument();
	});
});
