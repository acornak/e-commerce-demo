import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MagnifierIcon from "@/components/icons/Magnifier";

describe("MagnifierIcon", () => {
	it("renders an icon", () => {
		render(<MagnifierIcon />);

		const icon = screen.getByTestId("Magnifiericon");

		expect(icon).toBeInTheDocument();
	});
});
