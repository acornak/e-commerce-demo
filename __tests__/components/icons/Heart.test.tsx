import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeartIcon from "@/components/icons/Heart";

describe("HeartIcon", () => {
	it("renders an icon", () => {
		render(<HeartIcon />);

		const icon = screen.getByTestId("Hearticon");

		expect(icon).toBeInTheDocument();
	});
});
