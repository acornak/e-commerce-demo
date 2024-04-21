import React from "react";
// Testing
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// Components
import Navbar from "@/components/navbar/Navbar";
import { NavItems } from "@/components/navbar/NavItems";
// Types and constants
import { NavItem } from "@/config/types";

describe("Navbar", () => {
	it("renders the navigation items", () => {
		render(<Navbar />);
		NavItems.forEach((item: NavItem) => {
			const navItem = screen.getByText(item.title);
			expect(navItem).toBeInTheDocument();
		});
	});

	it("renders all icons", () => {
		render(<Navbar />);
		const bagIcon = screen.getAllByTestId("Bagicon");
		const heartIcon = screen.getAllByTestId("Hearticon");
		const magnifierIcon = screen.getAllByTestId("Magnifiericon");
		const userIcon = screen.getAllByTestId("Usericon");

		expect(bagIcon).toHaveLength(2);
		expect(heartIcon).toHaveLength(1);
		expect(magnifierIcon).toHaveLength(2);
		expect(userIcon).toHaveLength(1);
	});

	it("changes text color on mouse enter - navitem", async () => {
		render(<Navbar />);
		const hoveredNavItem = screen.getByText(NavItems[0].title);
		const notHoveredNavItem = screen.getByText(NavItems[1].title);

		fireEvent.mouseEnter(hoveredNavItem);
		await waitFor(() => {
			expect(hoveredNavItem.parentElement).toHaveStyle(
				"color: rgb(255, 99, 71);",
			);
		});

		expect(notHoveredNavItem.parentElement).toHaveStyle(
			"color: rgb(51, 51, 51);",
		);
	});

	it("changes text color on mouse enter - icon", async () => {
		render(<Navbar />);
		const hoveredNavIcon = screen.queryAllByTestId("Magnifiericon")[1];

		fireEvent.mouseEnter(hoveredNavIcon);
		await waitFor(() => {
			const hoveredNavIconUnderline =
				screen.queryAllByTestId("MagnifierUnderline")[1];
			expect(hoveredNavIconUnderline).not.toHaveClass("hidden");
		});
	});
});
