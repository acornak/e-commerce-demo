import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import BagIcon from "@/components/icon/Bag";

describe("BagIcon", () => {
	it("renders an icon", () => {
		render(<BagIcon />);

		const icon = screen.getByTestId("Bagicon");

		expect(icon).toBeInTheDocument();
	});
});
