import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import InstagramIcon from "@/components/icons/Instagram";

describe("InstagramIcon", () => {
	it("renders an icon", () => {
		render(<InstagramIcon />);

		const icon = screen.getByTestId("Instagramicon");

		expect(icon).toBeInTheDocument();
	});
});
