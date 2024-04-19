import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserIcon from "@/components/icons/User";

describe("UserIcon", () => {
	it("renders an icon", () => {
		render(<UserIcon />);

		const icon = screen.getByTestId("Usericon");

		expect(icon).toBeInTheDocument();
	});
});
