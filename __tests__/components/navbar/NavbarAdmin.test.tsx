import React from "react";
// Testing
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// Components
import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import { NavItemsAdmin } from "@/components/navbar/NavItems";
// Types and constants
import { NavItem } from "@/lib/config/types";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useModalsStore } from "@/lib/stores/modals-store";

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

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

const mockAuthStore = useAuthStore as unknown as jest.Mock;
const mockModalsStore = useModalsStore as unknown as jest.Mock;

describe("NavbarAdmin - renders and styles", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders without crashing", () => {
		render(<NavbarAdmin />);

		NavItemsAdmin.forEach((item: NavItem) => {
			const navItem = screen.getByText(item.title);
			expect(navItem).toBeInTheDocument();
		});
	});

	it("renders all icons", () => {
		render(<NavbarAdmin />);

		const userIcon = screen.getAllByTestId("Usericon");
		expect(userIcon).toHaveLength(1);
	});

	it("changes text color on mouse enter - navitem", async () => {
		render(<NavbarAdmin />);

		const hoveredNavItem = screen.getByText(NavItemsAdmin[0].title);
		const notHoveredNavItem = screen.getByText(NavItemsAdmin[1].title);

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
		render(<NavbarAdmin />);
		const hoveredNavIcon = screen.queryAllByTestId("Usericon")[0];

		fireEvent.mouseEnter(hoveredNavIcon);
		await waitFor(() => {
			const hoveredNavIconUnderline = screen.getByTestId("UserUnderline");
			expect(hoveredNavIconUnderline).not.toHaveClass("hidden");
		});
	});
});

describe("Navbar - events", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("calls logOut and closes the dropdown when Logout is clicked", async () => {
		const mockLogOut = jest.fn();

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
				logOut: mockLogOut,
			});
		});

		render(<NavbarAdmin />);

		const userIcon = screen.getByTestId("Usericon");
		fireEvent.click(userIcon);

		await waitFor(() => {
			expect(screen.getByText("Logout")).toBeInTheDocument();
		});

		const logoutButton = screen.getByText("Logout");
		fireEvent.click(logoutButton);

		expect(mockLogOut).toHaveBeenCalledTimes(1);
	});

	it("closes the dropdown when clicking outside of it", async () => {
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
				logOut: jest.fn(),
			});
		});

		render(<NavbarAdmin />);

		const userIcon = screen.getByTestId("Usericon");
		fireEvent.click(userIcon);

		await waitFor(() => {
			expect(screen.getByText("Settings")).toBeInTheDocument();
		});

		fireEvent.mouseDown(document);

		await waitFor(() => {
			expect(screen.queryByText("Settings")).not.toBeInTheDocument();
		});
	});

	it("closes the dropdown when Escape key is pressed", async () => {
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
				logOut: jest.fn(),
			});
		});

		render(<NavbarAdmin />);

		const userIcon = screen.getByTestId("Usericon");
		fireEvent.click(userIcon);

		await waitFor(() => {
			expect(screen.getByText("Settings")).toBeInTheDocument();
		});

		fireEvent.keyDown(window, { key: "Escape", code: "Escape" });

		await waitFor(() => {
			expect(screen.queryByText("Settings")).not.toBeInTheDocument();
		});
	});

	it("click on bars icon will toggle the drawer menu", async () => {
		const toggleDrawerMenuOpenMock = jest.fn();

		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: false,
				toggleDrawerMenuOpen: toggleDrawerMenuOpenMock,
			});
		});

		render(<NavbarAdmin />);
		const barsIcon = screen.getByTestId("Barsicon");
		fireEvent.click(barsIcon);

		await waitFor(() => {
			expect(toggleDrawerMenuOpenMock).toHaveBeenCalledTimes(1);
		});
	});
});
