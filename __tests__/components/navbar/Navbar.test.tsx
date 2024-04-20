import React from "react";
// Testing
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// Components
import Navbar from "@/components/navbar/Navbar";
import { NavItems } from "@/components/navbar/NavItems";
// Types
import { NavItem } from "@/config/types";

describe("Navbar", () => {
	it("renders the navigation items", () => {
		render(<Navbar />);
		NavItems.forEach((item: NavItem) => {
			const navItem = screen.queryAllByText(item.title);
			expect(navItem).toHaveLength(2);
		});
	});

	it("renders all icons", () => {
		render(<Navbar />);
		const bagIcon = screen.queryAllByTestId("Bagicon");
		const heartIcon = screen.queryAllByTestId("Hearticon");
		const magnifierIcon = screen.queryAllByTestId("Magnifiericon");
		const userIcon = screen.queryAllByTestId("Usericon");

		expect(bagIcon).toHaveLength(2);
		expect(heartIcon).toHaveLength(1);
		expect(magnifierIcon).toHaveLength(2);
		expect(userIcon).toHaveLength(2);
	});

	it("changes text color on mouse enter - navitem", async () => {
		render(<Navbar />);
		const hoveredNavItem = screen.queryAllByText(NavItems[0].title);
		const notHoveredNavItem = screen.queryAllByText(NavItems[1].title);

		fireEvent.mouseEnter(hoveredNavItem[1]);
		await waitFor(() => {
			expect(hoveredNavItem[1].parentElement).toHaveStyle(
				"color: rgb(255, 99, 71);",
			);
		});

		expect(notHoveredNavItem[1].parentElement).toHaveStyle(
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
