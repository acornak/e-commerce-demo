import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import BarsIcon from "@/components/icon/Bars";

describe("BarsIcon", () => {
	it("renders an icon", () => {
		render(<BarsIcon />);

		const icon = screen.getByTestId("Barsicon");

		expect(icon).toBeInTheDocument();
	});
});
