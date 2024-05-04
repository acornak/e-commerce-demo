import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ReturnsPadIcon from "@/components/icon/ReturnsPad";

describe("ReturnsPadIcon", () => {
	it("renders an icon", () => {
		render(<ReturnsPadIcon />);

		const icon = screen.getByTestId("ReturnsPadicon");

		expect(icon).toBeInTheDocument();
	});
});
