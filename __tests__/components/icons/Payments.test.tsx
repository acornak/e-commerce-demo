import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import PaymentsIcon from "@/components/icon/Payments";

describe("PaymentsIcon", () => {
	it("renders an icon", () => {
		render(<PaymentsIcon />);

		const icon = screen.getByTestId("Paymentsicon");

		expect(icon).toBeInTheDocument();
	});
});
