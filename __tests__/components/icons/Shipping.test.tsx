import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ShippingIcon from "@/components/icon/Shipping";

describe("ShippingIcon", () => {
	it("renders an icon", () => {
		render(<ShippingIcon />);

		const icon = screen.getByTestId("Shippingicon");

		expect(icon).toBeInTheDocument();
	});
});
