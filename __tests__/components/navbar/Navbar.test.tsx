import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import Navbar from "@/components/navbar/Navbar";

describe("Navbar", () => {
	it("renders a desktop navbar", () => {
		render(<Navbar />);

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
