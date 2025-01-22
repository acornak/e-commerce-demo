import { MenuIcons, adminIcons, NavIcons } from "@/components/navbar/NavIcons";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useModalsStore } from "@/lib/stores/modals-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import mockRouter from "next-router-mock";
import { usePathname } from "next/navigation";
import { NavIcon } from "@/lib/config/types";
import { act } from "react-dom/test-utils";

jest.mock("next/navigation", () => {
	// eslint-disable-next-line global-require
	const { useRouter } = require("next-router-mock");
	// eslint-disable-next-line no-shadow
	const usePathname = jest.fn();
	return { useRouter, usePathname };
});

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

describe("MenuIcons", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the icons and handles interactions", () => {
		const handleDropdown = jest.fn();
		const cartItems = 3;
		const loggedIn = true;

		(usePathname as jest.Mock).mockReturnValue("/");

		const mockSetSearchBarOpen = jest.fn();
		const mockSetCartBarOpen = jest.fn();
		const mockSetLoginModalOpen = jest.fn();
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				searchBarOpen: false,
				setSearchBarOpen: mockSetSearchBarOpen,
				cartBarOpen: false,
				setCartBarOpen: mockSetCartBarOpen,
				loginModalOpen: false,
				setLoginModalOpen: mockSetLoginModalOpen,
			});
		});

		const icons = MenuIcons(cartItems, loggedIn, handleDropdown);
		const { rerender } = render(
			<>
				{icons.map((icon) => (
					<div key={icon.title} onClick={icon.onClick}>
						{icon.icon}
					</div>
				))}
			</>,
		);

		// Check that the icons are rendered
		const magnifierIcon = screen.getByTestId("Magnifiericon");
		const userIcon = screen.getByTestId("Usericon");
		const heartIcon = screen.getByTestId("Hearticon");
		const bagIcon = screen.getByTestId("Bagicon");

		expect(magnifierIcon).toBeInTheDocument();
		expect(userIcon).toBeInTheDocument();
		expect(heartIcon).toBeInTheDocument();
		expect(bagIcon).toBeInTheDocument();
		expect(screen.getByText(cartItems)).toBeInTheDocument();

		// Simulate clicking on the Magnifier icon
		fireEvent.click(magnifierIcon);
		expect(mockSetSearchBarOpen).toHaveBeenCalledWith(true);

		// Simulate clicking on the User icon when logged in
		fireEvent.click(userIcon);
		expect(handleDropdown).toHaveBeenCalled();

		// Re-render with logged out state
		rerender(
			<>
				{MenuIcons(cartItems, false, handleDropdown).map((icon) => (
					<div key={icon.title} onClick={icon.onClick}>
						{icon.icon}
					</div>
				))}
			</>,
		);

		// Simulate clicking on the User icon when logged out
		fireEvent.click(userIcon);
		expect(mockSetLoginModalOpen).toHaveBeenCalledWith(true);

		// Simulate clicking on the Cart icon
		fireEvent.click(bagIcon);
		expect(mockSetCartBarOpen).toHaveBeenCalledWith(true);
	});

	it("does not render the Cart icon on the /cart page", () => {
		const handleDropdown = jest.fn();
		const cartItems = 3;
		const loggedIn = true;

		(usePathname as jest.Mock).mockReturnValue("/cart");

		render(
			<>
				{MenuIcons(cartItems, loggedIn, handleDropdown).map((icon) => (
					<div key={icon.title} onClick={icon.onClick}>
						{icon.icon}
					</div>
				))}
			</>,
		);

		// Check that the Cart icon is not rendered
		expect(screen.queryByTestId("Bagicon")).not.toBeInTheDocument();
	});
});

describe("adminIcons", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders and toggles the dropdown", () => {
		const handleDropdown = jest.fn();
		const dropdownOpen = false;
		const icons = adminIcons(dropdownOpen, handleDropdown);

		const { rerender } = render(icons[0].icon);

		expect(screen.queryByText("Settings")).not.toBeInTheDocument();

		fireEvent.click(
			screen.getByRole("button", { name: /toggle user menu/i }),
		);
		expect(handleDropdown).toHaveBeenCalledTimes(1);

		rerender(adminIcons(true, handleDropdown)[0].icon);

		expect(screen.getByText("Settings")).toBeInTheDocument();
		expect(screen.getByText("Profile")).toBeInTheDocument();
		expect(screen.getByText("Logout")).toBeInTheDocument();
	});

	it("calls logOut when Logout is clicked", () => {
		const handleDropdown = jest.fn();
		const mockLogOut = jest.fn();
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				logOut: mockLogOut,
			});
		});

		render(adminIcons(true, handleDropdown)[0].icon);

		fireEvent.click(screen.getByText("Logout"));
		expect(mockLogOut).toHaveBeenCalledTimes(1);
	});
});

describe("NavIcons", () => {
	const icons: NavIcon[] = [
		{
			title: "Magnifier",
			icon: <div aria-label="Magnifier" />,
			url: "/search",
		},
		{ title: "User", icon: <div aria-label="User" /> },
		{ title: "Heart", icon: <div aria-label="Heart" />, url: "/wishlist" },
		{ title: "Cart", icon: <div aria-label="Cart" />, onClick: jest.fn() },
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders icons and handles interactions", async () => {
		const setSelected = jest.fn();
		const selected = null;

		const mockSetSearchBarOpen = jest.fn();
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				setSearchBarOpen: mockSetSearchBarOpen,
			});
		});

		mockRouter.push("/");

		render(
			<NavIcons
				selected={selected}
				setSelected={setSelected}
				icons={icons}
				navItems={[]}
				mobile={false}
			/>,
		);

		expect(screen.getByLabelText("Magnifier")).toBeInTheDocument();
		expect(screen.getByLabelText("User")).toBeInTheDocument();
		expect(screen.getByLabelText("Heart")).toBeInTheDocument();
		expect(screen.getByLabelText("Cart")).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(screen.getByLabelText("Magnifier"));
		});

		await waitFor(() => {
			expect(mockRouter).toMatchObject({
				asPath: "/search",
				pathname: "/search",
				query: {},
			});
		});

		await act(async () => {
			fireEvent.click(screen.getByLabelText("Heart"));
		});

		await waitFor(() => {
			expect(mockRouter).toMatchObject({
				asPath: "/wishlist",
				pathname: "/wishlist",
				query: {},
			});
		});

		await act(async () => {
			fireEvent.click(screen.getByLabelText("Cart"));
		});

		expect(icons[3].onClick).toHaveBeenCalled();

		// test setSelected
		await act(async () => {
			fireEvent.mouseEnter(screen.getByLabelText("User"));
		});

		expect(setSelected).toHaveBeenCalledWith(1);

		await act(async () => {
			fireEvent.mouseLeave(screen.getByLabelText("User"));
		});

		expect(setSelected).toHaveBeenCalledWith(null);
	});

	it("renders icons and handles interactions in mobile", async () => {
		const setSelected = jest.fn();

		const mockSetSearchBarOpen = jest.fn();
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				setSearchBarOpen: mockSetSearchBarOpen,
			});
		});

		mockRouter.push("/");

		render(
			<NavIcons
				selected={null}
				setSelected={setSelected}
				icons={icons}
				navItems={[]}
				mobile
			/>,
		);

		expect(screen.getByLabelText("Magnifier")).toBeInTheDocument();
		expect(screen.queryByLabelText("User")).not.toBeInTheDocument();
		expect(screen.queryByLabelText("Heart")).not.toBeInTheDocument();
		expect(screen.getByLabelText("Cart")).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(screen.getByLabelText("Magnifier"));
		});

		await waitFor(() => {
			expect(mockRouter).toMatchObject({
				asPath: "/search",
				pathname: "/search",
				query: {},
			});
		});

		await act(async () => {
			fireEvent.click(screen.getByLabelText("Cart"));
		});

		expect(icons[3].onClick).toHaveBeenCalled();

		// test setSelected
		await act(async () => {
			fireEvent.mouseEnter(screen.getByLabelText("Magnifier"));
		});

		expect(setSelected).toHaveBeenCalledWith(0);

		await act(async () => {
			fireEvent.mouseLeave(screen.getByLabelText("Magnifier"));
		});

		expect(setSelected).toHaveBeenCalledWith(null);
	});
});
