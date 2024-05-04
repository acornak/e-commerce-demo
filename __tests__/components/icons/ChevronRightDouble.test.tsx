import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ChevronRightDouble from "@/components/icon/ChevronRightDouble";

describe("ChevronRightDouble", () => {
	it("renders an icon", () => {
		render(<ChevronRightDouble />);

		const icon = screen.getByTestId("ChevronRightDoubleicon");

		expect(icon).toBeInTheDocument();
	});
});
