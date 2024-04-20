import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import PlaneIcon from "@/components/icons/Plane";

describe("PlaneIcon", () => {
	it("renders an icon", () => {
		render(<PlaneIcon />);

		const icon = screen.getByTestId("Planeicon");

		expect(icon).toBeInTheDocument();
	});
});
