import React from "react";
// Testing
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Components
import MobileItems from "@/components/navbar/NavbarMobile";
// Types and constants
import { NavItem } from "@/lib/config/types";
// Mocking dependencies
import { useModalsStore } from "@/lib/stores/modals-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { MotionGlobalConfig } from "framer-motion";

MotionGlobalConfig.skipAnimations = true;

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));
const mockModalsStore = useModalsStore as unknown as jest.Mock;

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));
const mockAuthStore = useAuthStore as unknown as jest.Mock;

jest.mock("@/components/login/HandleLoginForm", () => ({
	__esModule: true,
	default: () => <div>Mocked HandleLoginForm</div>,
}));

describe("MobileItems Component", () => {
	const items: NavItem[] = [
		{ title: "Home", url: "/" },
		{ title: "Shop", url: "/shop" },
	];

	const setDrawerMenuOpenMock = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders when drawerMenuOpen is true", () => {
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: true,
				setDrawerMenuOpen: setDrawerMenuOpenMock,
			});
		});

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		render(<MobileItems items={items} />);

		expect(screen.getByText("Menu")).toBeInTheDocument();
	});

	it("does not render when drawerMenuOpen is false", () => {
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: false,
				setDrawerMenuOpen: setDrawerMenuOpenMock,
			});
		});

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		render(<MobileItems items={items} />);

		expect(screen.queryByText("Menu")).not.toBeInTheDocument();
	});

	it("shows menu items when showLogin is false", () => {
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: true,
				setDrawerMenuOpen: setDrawerMenuOpenMock,
			});
		});

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		render(<MobileItems items={items} />);

		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Shop")).toBeInTheDocument();
	});

	it("shows login form when Login button is clicked and user is not logged in", () => {
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: true,
				setDrawerMenuOpen: setDrawerMenuOpenMock,
			});
		});

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		render(<MobileItems items={items} />);

		const loginButton = screen.getByText("Login");
		fireEvent.click(loginButton);

		expect(screen.getByText("Mocked HandleLoginForm")).toBeInTheDocument();
	});

	it("shows logged-in menu when user is logged in and showLogin is true", () => {
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: true,
				setDrawerMenuOpen: setDrawerMenuOpenMock,
			});
		});

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "test@example.com" },
			});
		});

		render(<MobileItems items={items} />);

		const loggedInButton = screen.getByText("Logged in");
		fireEvent.click(loggedInButton);

		expect(
			screen.getByText("Logged in as test@example.com"),
		).toBeInTheDocument();
		expect(screen.getByText("Your Account")).toBeInTheDocument();
		expect(screen.getByText("Account Settings")).toBeInTheDocument();
		expect(screen.getByText("Logout")).toBeInTheDocument();
	});

	it("calls logOut when Logout button is clicked", async () => {
		const mockLogOut = jest.fn();

		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: true,
				setDrawerMenuOpen: setDrawerMenuOpenMock,
			});
		});

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "test@example.com" },
				logOut: mockLogOut,
			});
		});

		render(<MobileItems items={items} />);

		const loggedInButton = screen.getByText("Logged in");
		fireEvent.click(loggedInButton);

		await waitFor(() => {
			expect(screen.getByTestId("logout-button")).toBeInTheDocument();
		});

		const logoutButton = screen.getByTestId("logout-button");
		fireEvent.click(logoutButton);

		expect(mockLogOut).toHaveBeenCalledTimes(1);
	});

	it("closes the menu when Close button is clicked", () => {
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: true,
				setDrawerMenuOpen: setDrawerMenuOpenMock,
			});
		});

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		render(<MobileItems items={items} />);

		const closeButton = screen.getByText("Close");
		fireEvent.click(closeButton);

		expect(setDrawerMenuOpenMock).toHaveBeenCalledWith(false);
	});

	it("calls setDrawerMenuOpen(false) when Menu button is clicked and showLogin is false", () => {
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: true,
				setDrawerMenuOpen: setDrawerMenuOpenMock,
			});
		});

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		render(<MobileItems items={items} />);

		const menuButton = screen.getByText("Menu");
		fireEvent.click(menuButton);

		expect(setDrawerMenuOpenMock).toHaveBeenCalledWith(false);
	});

	it("sets showLogin to false when Menu button is clicked and showLogin is true", () => {
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: true,
				setDrawerMenuOpen: setDrawerMenuOpenMock,
			});
		});

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		render(<MobileItems items={items} />);

		const loginButton = screen.getByText("Login");
		fireEvent.click(loginButton);

		expect(screen.getByText("Mocked HandleLoginForm")).toBeInTheDocument();

		const menuButton = screen.getByText("Menu");
		fireEvent.click(menuButton);

		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Shop")).toBeInTheDocument();
	});

	it('shows "Logged in" when user is logged in', () => {
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: true,
				setDrawerMenuOpen: setDrawerMenuOpenMock,
			});
		});

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "test@example.com" },
			});
		});

		render(<MobileItems items={items} />);

		expect(screen.getByText("Logged in")).toBeInTheDocument();
	});

	it("closes the menu when Login button is clicked and showLogin is true", () => {
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: true,
				setDrawerMenuOpen: setDrawerMenuOpenMock,
			});
		});

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		render(<MobileItems items={items} />);

		const loginButton = screen.getByText("Login");
		fireEvent.click(loginButton);

		expect(screen.getByText("Mocked HandleLoginForm")).toBeInTheDocument();

		fireEvent.click(loginButton);

		expect(setDrawerMenuOpenMock).toHaveBeenCalledWith(false);
	});

	it("changes color on hover over navitems", async () => {
		const user = userEvent.setup();

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "test@example.com" },
			});
		});

		render(<MobileItems items={items} />);

		const menuItem = screen.getByTestId("nav-item-0");
		await user.hover(menuItem);

		await waitFor(() => {
			expect(menuItem).toHaveStyle("color: rgb(255, 99, 71);");
		});

		await user.unhover(menuItem);

		await waitFor(() => {
			expect(menuItem).toHaveStyle("color: rgb(51, 51, 51);");
		});

		const loggedInButton = screen.getByText("Logged in");
		fireEvent.click(loggedInButton);

		await waitFor(() => {
			expect(screen.getByTestId("nav-item-4")).toBeInTheDocument();
		});

		const accountItem = screen.getByTestId("nav-item-3");
		const settingsItem = screen.getByTestId("nav-item-4");

		expect(accountItem).toBeInTheDocument();
		expect(settingsItem).toBeInTheDocument();

		await user.hover(accountItem);

		await waitFor(() => {
			expect(accountItem).toHaveStyle("color: rgb(255, 99, 71);");
		});

		expect(settingsItem).toHaveStyle("color: rgb(51, 51, 51);");

		await user.unhover(accountItem);

		await waitFor(() => {
			expect(accountItem).toHaveStyle("color: rgb(51, 51, 51);");
		});

		await user.hover(settingsItem);

		await waitFor(() => {
			expect(settingsItem).toHaveStyle("color: rgb(255, 99, 71);");
		});

		await user.unhover(settingsItem);

		await waitFor(() => {
			expect(settingsItem).toHaveStyle("color: rgb(51, 51, 51);");
		});
	});
});
