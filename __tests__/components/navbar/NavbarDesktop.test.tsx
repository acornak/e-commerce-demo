import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavbarDesktop from "@/components/navbar/NavbarDesktop";

describe("NavbarDesktop", () => {
	it("renders a desktop navbar", () => {
		render(<NavbarDesktop />);

		const bagIcon = screen.getByTestId("Bagicon");
		const heartIcon = screen.getByTestId("Hearticon");
		const magnifierIcon = screen.getByTestId("Magnifiericon");
		const userIcon = screen.getByTestId("Usericon");

		expect(bagIcon).toBeInTheDocument();
		expect(heartIcon).toBeInTheDocument();
		expect(magnifierIcon).toBeInTheDocument();
		expect(userIcon).toBeInTheDocument();
	});
});
