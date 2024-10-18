import React from "react";
// Testing
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// Components
import Navbar from "@/components/navbar/Navbar";
import { NavItemsDesktop } from "@/components/navbar/NavItems";
// Store
import { useAuthStore } from "@/lib/stores/auth-store";
import { useModalsStore } from "@/lib/stores/modals-store";
import { useCartStore } from "@/lib/stores/cart-store";
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

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

jest.mock("@/lib/stores/cart-store", () => ({
	useCartStore: jest.fn(),
}));

const mockAuthStore = useAuthStore as unknown as jest.Mock;
const mockModalsStore = useModalsStore as unknown as jest.Mock;
const mockCartStore = useCartStore as unknown as jest.Mock;

describe("Navbar - renders and styles", () => {
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

describe("Navbar - useEffect loggedIn state", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("sets loggedIn to true when initialLoading is false and user exists", async () => {
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
				logOut: jest.fn(),
			});
		});

		render(<Navbar />);

		const userIcon = screen.getByTestId("Usericon");
		fireEvent.click(userIcon);

		await waitFor(() => {
			expect(screen.queryByText("Account")).toBeInTheDocument();
			expect(screen.queryByText("Orders")).toBeInTheDocument();
			expect(screen.queryByText("Logout")).toBeInTheDocument();
		});
	});

	it("sets loggedIn to false when user is null", async () => {
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
				logOut: jest.fn(),
			});
		});

		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				setLoginModalOpen: jest.fn(),
			});
		});

		render(<Navbar />);

		const userIcon = screen.getByTestId("Usericon");
		fireEvent.click(userIcon);

		await waitFor(() => {
			expect(screen.queryByText("Account")).not.toBeInTheDocument();
			expect(screen.queryByText("Orders")).not.toBeInTheDocument();
			expect(screen.queryByText("Logout")).not.toBeInTheDocument();
		});
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

		render(<Navbar />);

		const userIcon = screen.getByTestId("Usericon");
		fireEvent.click(userIcon);

		await waitFor(() => {
			expect(screen.getByText("Logout")).toBeInTheDocument();
		});

		const logoutButton = screen.getByText("Logout");
		fireEvent.click(logoutButton);

		expect(mockLogOut).toHaveBeenCalledTimes(1);

		await waitFor(() => {
			expect(screen.queryByText("Logout")).not.toBeInTheDocument();
		});
	});

	it("closes the dropdown when clicking outside of it", async () => {
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
				logOut: jest.fn(),
			});
		});

		render(<Navbar />);

		const userIcon = screen.getByTestId("Usericon");
		fireEvent.click(userIcon);

		await waitFor(() => {
			expect(screen.getByText("Account")).toBeInTheDocument();
		});

		fireEvent.mouseDown(document);

		await waitFor(() => {
			expect(screen.queryByText("Account")).not.toBeInTheDocument();
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

		render(<Navbar />);

		const userIcon = screen.getByTestId("Usericon");
		fireEvent.click(userIcon);

		await waitFor(() => {
			expect(screen.getByText("Account")).toBeInTheDocument();
		});

		fireEvent.keyDown(window, { key: "Escape", code: "Escape" });

		await waitFor(() => {
			expect(screen.queryByText("Account")).not.toBeInTheDocument();
		});
	});
});

describe("Navbar - scroll and mousemove functionality", () => {
	const setScrollPosition = (options: any) => {
		const { scrollY, scrollTop } = options;

		if (scrollY !== undefined) {
			Object.defineProperty(window, "scrollY", {
				writable: true,
				configurable: true,
				value: scrollY,
			});
		} else {
			window.scrollY = 0;
		}

		if (scrollTop !== undefined) {
			Object.defineProperty(document.documentElement, "scrollTop", {
				writable: true,
				configurable: true,
				value: scrollTop,
			});
		} else {
			document.documentElement.scrollTop = 0;
		}
	};

	beforeEach(() => {
		setScrollPosition({ scrollY: 0, scrollTop: 0 });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("uses document.documentElement.scrollTop when window.scrollY is undefined", async () => {
		setScrollPosition({ scrollY: undefined, scrollTop: 100 });

		const { container } = render(<Navbar />);
		const nav = container.querySelector("nav");

		expect(nav).toHaveClass("top-0");

		fireEvent.scroll(window);

		await waitFor(() => {
			expect(nav).toHaveClass("-top-full");
		});

		setScrollPosition({ scrollY: undefined, scrollTop: 50 });
		fireEvent.scroll(window);

		await waitFor(() => {
			expect(nav).toHaveClass("top-0");
		});
	});

	it("uses window.scrollY when document.documentElement.scrollTop is undefined", async () => {
		setScrollPosition({ scrollY: 100, scrollTop: undefined });

		const { container } = render(<Navbar />);
		const nav = container.querySelector("nav");

		expect(nav).toHaveClass("top-0");

		fireEvent.scroll(window);

		await waitFor(() => {
			expect(nav).toHaveClass("-top-full");
		});

		setScrollPosition({ scrollY: 50, scrollTop: undefined });
		fireEvent.scroll(window);

		await waitFor(() => {
			expect(nav).toHaveClass("top-0");
		});
	});

	it("handles zero scroll positions correctly", async () => {
		setScrollPosition({ scrollY: 0, scrollTop: 0 });

		const { container } = render(<Navbar />);
		const nav = container.querySelector("nav");

		expect(nav).toHaveClass("top-0");

		fireEvent.scroll(window);

		await waitFor(() => {
			expect(nav).toHaveClass("top-0");
		});
	});

	it("shows the Navbar when mouse is near the top using scrollTop", async () => {
		setScrollPosition({ scrollY: undefined, scrollTop: 100 });

		const { container } = render(<Navbar />);
		const nav = container.querySelector("nav");

		fireEvent.scroll(window);

		await waitFor(() => {
			expect(nav).toHaveClass("-top-full");
		});

		fireEvent.mouseMove(window, { clientY: 30 });

		await waitFor(() => {
			expect(nav).toHaveClass("top-0");
		});

		fireEvent.mouseMove(window, { clientY: 200 });

		await waitFor(() => {
			expect(nav).toHaveClass("-top-full");
		});
	});

	it("shows the Navbar when mouse is near the top using scrollY", async () => {
		setScrollPosition({ scrollY: 100, scrollTop: undefined });

		const { container } = render(<Navbar />);
		const nav = container.querySelector("nav");

		fireEvent.scroll(window);

		await waitFor(() => {
			expect(nav).toHaveClass("-top-full");
		});

		fireEvent.mouseMove(window, { clientY: 30 });

		await waitFor(() => {
			expect(nav).toHaveClass("top-0");
		});

		fireEvent.mouseMove(window, { clientY: 200 });

		await waitFor(() => {
			expect(nav).toHaveClass("-top-full");
		});
	});
});

describe("Navbar - clicking events", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("click on bars icon will toggle the drawer menu", async () => {
		const toggleDrawerMenuOpenMock = jest.fn();

		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				drawerMenuOpen: false,
				toggleDrawerMenuOpen: toggleDrawerMenuOpenMock,
				setLoginModalOpen: jest.fn(),
			});
		});

		render(<Navbar />);
		const barsIcon = screen.getByTestId("Barsicon");
		fireEvent.click(barsIcon);

		await waitFor(() => {
			expect(toggleDrawerMenuOpenMock).toHaveBeenCalledTimes(1);
		});
	});

	it("click on account item will toggle the dropdown menu", async () => {
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
			});
		});
		render(<Navbar />);

		const userIcon = screen.getByTestId("Usericon");
		fireEvent.click(userIcon);

		await waitFor(() => {
			expect(screen.queryByText("Account")).toBeInTheDocument();
			expect(screen.queryByText("Orders")).toBeInTheDocument();
			expect(screen.queryByText("Logout")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Account"));

		await waitFor(() => {
			expect(screen.queryByText("Account")).not.toBeInTheDocument();
			expect(screen.queryByText("Orders")).not.toBeInTheDocument();
			expect(screen.queryByText("Logout")).not.toBeInTheDocument();
		});

		fireEvent.click(userIcon);

		await waitFor(() => {
			expect(screen.queryByText("Account")).toBeInTheDocument();
			expect(screen.queryByText("Orders")).toBeInTheDocument();
			expect(screen.queryByText("Logout")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Orders"));

		await waitFor(() => {
			expect(screen.queryByText("Account")).not.toBeInTheDocument();
			expect(screen.queryByText("Orders")).not.toBeInTheDocument();
			expect(screen.queryByText("Logout")).not.toBeInTheDocument();
		});
	});

	it("renders the cartItems number", async () => {
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@exmample.com" },
			});
		});

		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: [
					{ id: "1", quantity: 1 },
					{ id: "2", quantity: 2 },
				],
			});
		});

		render(<Navbar />);

		await waitFor(() => {
			expect(screen.getAllByText("3")).toHaveLength(2);
		});
	});
});
