import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import WarrantyIcon from "@/components/icon/Warranty";

describe("WarrantyIcon", () => {
	it("renders an icon", () => {
		render(<WarrantyIcon />);

		const icon = screen.getByTestId("Warrantyicon");

		expect(icon).toBeInTheDocument();
	});
});
