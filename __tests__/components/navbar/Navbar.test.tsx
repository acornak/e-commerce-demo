import React from "react";
// Testing
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// Components
import Navbar from "@/components/navbar/Navbar";
import { NavItemsDesktop } from "@/components/navbar/NavItems";
// Types and constants
import { NavItem } from "@/lib/config/types";

jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			prefetch: () => null,
		};
	},
	usePathname() {
		return "/";
	},
}));

describe("Navbar", () => {
	it("renders the navigation items", () => {
		render(<Navbar />);
		NavItemsDesktop.forEach((item: NavItem) => {
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
		const hoveredNavItem = screen.getByText(NavItemsDesktop[0].title);
		const notHoveredNavItem = screen.getByText(NavItemsDesktop[1].title);

		fireEvent.mouseEnter(hoveredNavItem);
		await waitFor(() => {
			expect(hoveredNavItem).toHaveStyle("color: rgb(255, 99, 71);");
			expect(hoveredNavItem.childNodes[1]).toHaveClass(
				"absolute left-0 bottom-0 h-0.5 bg-secondary",
			);
		});

		expect(notHoveredNavItem).toHaveStyle("color: rgb(51, 51, 51);");
	});

	it("changes text color on mouse enter - icon", async () => {
		render(<Navbar />);
		const hoveredNavIcon = screen.queryAllByTestId("Magnifiericon")[0];

		fireEvent.mouseEnter(hoveredNavIcon);
		await waitFor(() => {
			const hoveredNavIconUnderline =
				screen.getByTestId("MagnifierUnderline");
			expect(hoveredNavIconUnderline).not.toHaveClass("hidden");
		});
	});
});
