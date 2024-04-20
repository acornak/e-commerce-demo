import React from "react";
// Testing
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// Components
import NavbarDesktop from "@/components/navbar/NavbarDesktop";
import { NavItems } from "@/components/navbar/ NavItems";
// Types
import { NavItem } from "@/config/types";

describe("NavbarDesktop", () => {
	it("renders the logo and navigation items", () => {
		render(<NavbarDesktop />);
		const logo = screen.getByText("Demo Project");
		expect(logo).toBeInTheDocument();

		NavItems.forEach((item: NavItem) => {
			const navItem = screen.getByText(item.title);
			expect(navItem).toBeInTheDocument();
		});
	});

	it("renders all icons", () => {
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

	it("changes text color on mouse enter - navitem", async () => {
		render(<NavbarDesktop />);
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
		render(<NavbarDesktop />);
		const hoveredNavIcon = screen.getByTestId("Magnifiericon");

		fireEvent.mouseEnter(hoveredNavIcon);
		await waitFor(() => {
			const hoveredNavIconUnderline =
				screen.getByTestId("MagnifierUnderline");
			expect(hoveredNavIconUnderline).toBeInTheDocument();
		});
	});
});
