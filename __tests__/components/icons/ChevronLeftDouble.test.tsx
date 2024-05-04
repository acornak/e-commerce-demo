import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ChevronLeftDouble from "@/components/icon/ChevronLeftDouble";

describe("ChevronLeftDouble", () => {
	it("renders an icon", () => {
		render(<ChevronLeftDouble />);

		const icon = screen.getByTestId("ChevronLeftDoubleicon");

		expect(icon).toBeInTheDocument();
	});
});
