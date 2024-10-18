import React from "react";
// Next
import { usePathname, redirect } from "next/navigation";
// Testing
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
// Store
import { useModalsStore } from "@/lib/stores/modals-store";
import { useAuthStore } from "@/lib/stores/auth-store";
// Components
import LayoutWrapper from "@/components/wrapper/LayoutWrapper";

jest.mock("next/navigation", () => ({
	usePathname: jest.fn(),
	redirect: jest.fn(),
}));

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

const mockModalsStore = useModalsStore as unknown as jest.Mock;
const mockAuthStore = useAuthStore as unknown as jest.Mock;

jest.mock("@/components/navbar/Navbar", () => ({
	__esModule: true,
	default: () => <div>Navbar</div>,
}));

jest.mock("@/components/navbar/NavbarAdmin", () => ({
	__esModule: true,
	default: () => <div>NavbarAdmin</div>,
}));
jest.mock("@/components/navbar/SearchBar", () => ({
	__esModule: true,
	default: () => <div>SearchBar</div>,
}));
jest.mock("@/components/navbar/ShoppingCart", () => ({
	__esModule: true,
	default: () => <div>ShoppingCart</div>,
}));
jest.mock("@/components/footer/Sitemap", () => ({
	__esModule: true,
	default: () => <div>Sitemap</div>,
}));

jest.mock("@/components/footer/Footer", () => ({
	__esModule: true,
	default: () => <div>Footer</div>,
}));

jest.mock("@/components/modal/LoginModal", () => ({
	__esModule: true,
	default: () => <div>LoginModal</div>,
}));

jest.mock("@/components/modal/CookieConsent", () => ({
	__esModule: true,
	default: () => <div>CookieConsent</div>,
}));

jest.mock("@/components/modal/ProductAddedModal", () => ({
	__esModule: true,
	default: () => <div>ProductAddedModal</div>,
}));

jest.mock("@/components/modal/ProductPreviewModal", () => ({
	__esModule: true,
	default: () => <div>ProductPreviewModal</div>,
}));

jest.mock("@/components/modal/DeliveryInfoModal", () => ({
	__esModule: true,
	default: () => <div>DeliveryInfoModal</div>,
}));

jest.mock("@/components/modal/SizeGuideModal", () => ({
	__esModule: true,
	default: () => <div>SizeGuideModal</div>,
}));

jest.mock("@/components/modal/AskQuestionModal", () => ({
	__esModule: true,
	default: () => <div>AskQuestionModal</div>,
}));

jest.mock("@/components/modal/ProductImageModal", () => ({
	__esModule: true,
	default: () => <div>ProductImageModal</div>,
}));

jest.mock("@/components/styled/Loading", () => ({
	__esModule: true,
	default: () => <div>Loading</div>,
}));

jest.mock("react-google-recaptcha-v3", () => ({
	GoogleReCaptchaProvider: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

describe("LayoutWrapper Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders non-admin layout correctly", () => {
		(usePathname as jest.Mock).mockReturnValue("/");
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				loginModalOpen: false,
				productAddedModalOpen: false,
				productPreviewModalOpen: false,
				cartBarOpen: false,
				searchBarOpen: false,
				drawerMenuOpen: false,
				deliveryInfoModalOpen: false,
				sizeGuideModalOpen: false,
				askQuestionModalOpen: false,
				productImageModalOpen: false,
				setLoginModalOpen: jest.fn(),
				setProductAddedModalOpen: jest.fn(),
				setProductPreviewModalOpen: jest.fn(),
				setCartBarOpen: jest.fn(),
				setSearchBarOpen: jest.fn(),
				setDrawerMenuOpen: jest.fn(),
				setDeliveryInfoModalOpen: jest.fn(),
				setSizeGuideModalOpen: jest.fn(),
				setAskQuestionModalOpen: jest.fn(),
				setProductImageModalOpen: jest.fn(),
			});
		});

		render(
			<LayoutWrapper>
				<div>Content</div>
			</LayoutWrapper>,
		);

		expect(screen.getByText("Navbar")).toBeInTheDocument();
		expect(screen.getByText("SearchBar")).toBeInTheDocument();
		expect(screen.getByText("ShoppingCart")).toBeInTheDocument();
		expect(screen.getByText("Footer")).toBeInTheDocument();
		expect(screen.getByText("Sitemap")).toBeInTheDocument();
		expect(screen.getByText("Content")).toBeInTheDocument();
	});

	test("renders admin layout when user is authenticated", () => {
		(usePathname as jest.Mock).mockReturnValue("/admin/dashboard");

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				user: { email: "me@example.com" },
				initialLoading: false,
			});
		});

		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				loginModalOpen: false,
				productAddedModalOpen: false,
				productPreviewModalOpen: false,
				cartBarOpen: false,
				searchBarOpen: false,
				drawerMenuOpen: false,
				deliveryInfoModalOpen: false,
				sizeGuideModalOpen: false,
				askQuestionModalOpen: false,
				productImageModalOpen: false,
				setLoginModalOpen: jest.fn(),
				setProductAddedModalOpen: jest.fn(),
				setProductPreviewModalOpen: jest.fn(),
				setCartBarOpen: jest.fn(),
				setSearchBarOpen: jest.fn(),
				setDrawerMenuOpen: jest.fn(),
				setDeliveryInfoModalOpen: jest.fn(),
				setSizeGuideModalOpen: jest.fn(),
				setAskQuestionModalOpen: jest.fn(),
				setProductImageModalOpen: jest.fn(),
			});
		});

		render(
			<LayoutWrapper>
				<div>Admin Content</div>
			</LayoutWrapper>,
		);

		expect(screen.getByText("NavbarAdmin")).toBeInTheDocument();
		expect(screen.getByText("Footer")).toBeInTheDocument();
		expect(screen.getByText("Admin Content")).toBeInTheDocument();
	});

	test("admin layout fade drawer", () => {
		(usePathname as jest.Mock).mockReturnValue("/admin/dashboard");

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				user: { email: "me@example.com" },
				initialLoading: false,
			});
		});

		const setDrawerMenuOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				loginModalOpen: false,
				productAddedModalOpen: false,
				productPreviewModalOpen: false,
				cartBarOpen: false,
				searchBarOpen: false,
				drawerMenuOpen: true,
				deliveryInfoModalOpen: false,
				sizeGuideModalOpen: false,
				askQuestionModalOpen: false,
				productImageModalOpen: false,
				setLoginModalOpen: jest.fn(),
				setProductAddedModalOpen: jest.fn(),
				setProductPreviewModalOpen: jest.fn(),
				setCartBarOpen: jest.fn(),
				setSearchBarOpen: jest.fn(),
				setDrawerMenuOpen,
				setDeliveryInfoModalOpen: jest.fn(),
				setSizeGuideModalOpen: jest.fn(),
				setAskQuestionModalOpen: jest.fn(),
				setProductImageModalOpen: jest.fn(),
			});
		});

		render(
			<LayoutWrapper>
				<div>Admin Content</div>
			</LayoutWrapper>,
		);

		const fadeOverlay = screen.getByTestId("fade-overlay-admin");
		expect(fadeOverlay).toBeInTheDocument();

		fireEvent.click(fadeOverlay);
		expect(setDrawerMenuOpen).toHaveBeenCalledWith(false);
	});

	test("redirects to login page when not authenticated on admin path", () => {
		(usePathname as jest.Mock).mockReturnValue("/admin/dashboard");

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({ user: null, initialLoading: false });
		});

		const mockRedirect = jest.fn();
		(jest.mocked(redirect) as jest.Mock).mockImplementation(mockRedirect);

		render(
			<LayoutWrapper>
				<div>Admin Content</div>
			</LayoutWrapper>,
		);

		expect(mockRedirect).toHaveBeenCalledWith(
			"/login?redirect=admin/dashboard",
		);
	});

	test("shows fade overlay when any modal is open", () => {
		(usePathname as jest.Mock).mockReturnValue("/");

		const setLoginModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				loginModalOpen: true,
				productAddedModalOpen: false,
				productPreviewModalOpen: false,
				cartBarOpen: false,
				searchBarOpen: false,
				drawerMenuOpen: false,
				deliveryInfoModalOpen: false,
				sizeGuideModalOpen: false,
				askQuestionModalOpen: false,
				productImageModalOpen: false,
				setLoginModalOpen,
				setProductAddedModalOpen: jest.fn(),
				setProductPreviewModalOpen: jest.fn(),
				setCartBarOpen: jest.fn(),
				setSearchBarOpen: jest.fn(),
				setDrawerMenuOpen: jest.fn(),
				setDeliveryInfoModalOpen: jest.fn(),
				setSizeGuideModalOpen: jest.fn(),
				setAskQuestionModalOpen: jest.fn(),
				setProductImageModalOpen: jest.fn(),
			});
		});

		render(
			<LayoutWrapper>
				<div>Content</div>
			</LayoutWrapper>,
		);

		const fadeOverlay = screen.getByTestId("fade-overlay");
		expect(fadeOverlay).toBeInTheDocument();

		fireEvent.click(fadeOverlay);
		expect(setLoginModalOpen).toHaveBeenCalledWith(false);
	});

	test("closes modals when Escape key is pressed", () => {
		(usePathname as jest.Mock).mockReturnValue("/");

		const setLoginModalOpen = jest.fn();
		const setProductAddedModalOpen = jest.fn();
		const setProductPreviewModalOpen = jest.fn();
		const setCartBarOpen = jest.fn();
		const setSearchBarOpen = jest.fn();
		const setDrawerMenuOpen = jest.fn();
		const setDeliveryInfoModalOpen = jest.fn();
		const setSizeGuideModalOpen = jest.fn();
		const setAskQuestionModalOpen = jest.fn();
		const setProductImageModalOpen = jest.fn();

		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				loginModalOpen: true,
				productAddedModalOpen: true,
				productPreviewModalOpen: true,
				cartBarOpen: true,
				searchBarOpen: true,
				drawerMenuOpen: true,
				deliveryInfoModalOpen: true,
				sizeGuideModalOpen: true,
				askQuestionModalOpen: true,
				productImageModalOpen: true,
				setLoginModalOpen,
				setProductAddedModalOpen,
				setProductPreviewModalOpen,
				setCartBarOpen,
				setSearchBarOpen,
				setDrawerMenuOpen,
				setDeliveryInfoModalOpen,
				setSizeGuideModalOpen,
				setAskQuestionModalOpen,
				setProductImageModalOpen,
			});
		});

		render(
			<LayoutWrapper>
				<div>Content</div>
			</LayoutWrapper>,
		);

		act(() => {
			fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
		});

		expect(setLoginModalOpen).toHaveBeenCalledWith(false);
		expect(setProductAddedModalOpen).toHaveBeenCalledWith(false);
		expect(setProductPreviewModalOpen).toHaveBeenCalledWith(false);
		expect(setCartBarOpen).toHaveBeenCalledWith(false);
		expect(setSearchBarOpen).toHaveBeenCalledWith(false);
		expect(setDrawerMenuOpen).toHaveBeenCalledWith(false);
		expect(setDeliveryInfoModalOpen).toHaveBeenCalledWith(false);
		expect(setSizeGuideModalOpen).toHaveBeenCalledWith(false);
		expect(setAskQuestionModalOpen).toHaveBeenCalledWith(false);
	});
});
