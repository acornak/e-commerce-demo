import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BagIcon from "@/components/icons/Bag";

describe("BagIcon", () => {
	it("renders an icon", () => {
		render(<BagIcon />);

		const icon = screen.getByTestId("Bagicon");

		expect(icon).toBeInTheDocument();
	});
});
