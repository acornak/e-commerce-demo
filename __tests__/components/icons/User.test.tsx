import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import UserIcon from "@/components/icon/User";

describe("UserIcon", () => {
	it("renders an icon", () => {
		render(<UserIcon />);

		const icon = screen.getByTestId("Usericon");

		expect(icon).toBeInTheDocument();
	});
});
