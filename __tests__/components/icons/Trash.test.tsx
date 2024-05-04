import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import TrashIcon from "@/components/icon/Trash";

describe("TrashIcon", () => {
	it("renders an icon", () => {
		render(<TrashIcon />);

		const icon = screen.getByTestId("Trashicon");

		expect(icon).toBeInTheDocument();
	});
});
