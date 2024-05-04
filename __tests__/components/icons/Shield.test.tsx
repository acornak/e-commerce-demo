import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ShieldIcon from "@/components/icon/Shield";

describe("ShieldIcon", () => {
	it("renders an icon", () => {
		render(<ShieldIcon />);

		const icon = screen.getByTestId("Shieldicon");

		expect(icon).toBeInTheDocument();
	});
});
