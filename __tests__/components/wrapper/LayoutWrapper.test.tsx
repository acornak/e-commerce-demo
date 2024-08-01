import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { usePathname } from "next/navigation";
import { useModalsStore } from "@/lib/stores/modals-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import LayoutWrapper from "@/components/wrapper/LayoutWrapper";

jest.mock("next/navigation", () => ({
	usePathname: jest.fn(),
	redirect: jest.fn(),
	useRouter: jest.fn(),
}));

jest.mock("react-google-recaptcha-v3", () => ({
	GoogleReCaptchaProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

jest.mock("@/components/navbar/NavbarAdmin", () =>
	jest.fn(() => <div>NavbarAdmin</div>),
);
jest.mock("@/components/footer/Footer", () => jest.fn(() => <div>Footer</div>));
jest.mock("@/components/styled/Loading", () =>
	jest.fn(() => <div>StyledLoading</div>),
);
jest.mock("@/components/navbar/Navbar", () => jest.fn(() => <div>Navbar</div>));
jest.mock("@/components/footer/Sitemap", () =>
	jest.fn(() => <div>Sitemap</div>),
);
jest.mock("@/components/modal/LoginModal", () =>
	jest.fn(() => <div>LoginModal</div>),
);
jest.mock("@/components/modal/ProductPreviewModal", () =>
	jest.fn(() => <div>ProductPreviewModal</div>),
);
jest.mock("@/components/modal/ProductAddedModal", () =>
	jest.fn(() => <div>ProductAddedModal</div>),
);
jest.mock("@/components/modal/DeliveryInfoModal", () =>
	jest.fn(() => <div>DeliveryInfoModal</div>),
);
jest.mock("@/components/modal/SizeGuideModal", () =>
	jest.fn(() => <div>SizeGuideModal</div>),
);
jest.mock("@/components/modal/AskQuestionModal", () =>
	jest.fn(() => <div>AskQuestionModal</div>),
);
jest.mock("@/components/modal/ProductImageModal", () =>
	jest.fn(() => <div>ProductImageModal</div>),
);
jest.mock("@/components/navbar/SearchBar", () =>
	jest.fn(() => <div>SearchBar</div>),
);
jest.mock("@/components/navbar/Cart", () =>
	jest.fn(() => <div>ShoppingCart</div>),
);

describe("LayoutWrapper", () => {
	let setSearchBarOpen: jest.Mock;
	let setDrawerMenuOpen: jest.Mock;
	let setLoginModalOpen: jest.Mock;
	let setCartBarOpen: jest.Mock;
	let setProductAddedModalOpen: jest.Mock;
	let setProductPreviewModalOpen: jest.Mock;
	let setDeliveryInfoModalOpen: jest.Mock;
	let setSizeGuideModalOpen: jest.Mock;
	let setAskQuestionModalOpen: jest.Mock;
	let setProductImageModalOpen: jest.Mock;

	beforeEach(() => {
		setSearchBarOpen = jest.fn();
		setDrawerMenuOpen = jest.fn();
		setLoginModalOpen = jest.fn();
		setCartBarOpen = jest.fn();
		setProductAddedModalOpen = jest.fn();
		setProductPreviewModalOpen = jest.fn();
		setDeliveryInfoModalOpen = jest.fn();
		setSizeGuideModalOpen = jest.fn();
		setAskQuestionModalOpen = jest.fn();
		setProductImageModalOpen = jest.fn();

		(useModalsStore as unknown as jest.Mock).mockReturnValue({
			loginModalOpen: false,
			productAddedModalOpen: false,
			productPreviewModalOpen: false,
			cartBarOpen: false,
			searchBarOpen: false,
			drawerMenuOpen: false,
			deliveryModalOpen: false,
			sizeGuideModalOpen: false,
			askQuestionModalOpen: false,
			productImageModalOpen: false,
			setLoginModalOpen,
			setProductAddedModalOpen,
			setProductPreviewModalOpen,
			setCartBarOpen,
			setDrawerMenuOpen,
			setSearchBarOpen,
			setDeliveryInfoModalOpen,
			setSizeGuideModalOpen,
			setAskQuestionModalOpen,
			setProductImageModalOpen,
		});

		(useAuthStore as unknown as jest.Mock).mockReturnValue({
			user: null,
			initialLoading: false,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should render loading screen when initial loading", () => {
		(usePathname as jest.Mock).mockReturnValue("/admin");

		(useAuthStore as unknown as jest.Mock).mockReturnValueOnce({
			user: null,
			initialLoading: true,
		});
		const { getByText } = render(
			<LayoutWrapper>
				<div>Content</div>
			</LayoutWrapper>,
		);
		expect(getByText("StyledLoading")).toBeInTheDocument();
	});

	it("should render the children when user is logged in", () => {
		(usePathname as jest.Mock).mockReturnValue("/admin");

		(useAuthStore as unknown as jest.Mock).mockReturnValueOnce({
			user: { id: 1, name: "Test User" },
			initialLoading: false,
		});
		const { getByText } = render(
			<LayoutWrapper>
				<div>Content</div>
			</LayoutWrapper>,
		);
		expect(getByText("NavbarAdmin")).toBeInTheDocument();
		expect(getByText("Content")).toBeInTheDocument();
	});

	it("should render the children when not on admin page", () => {
		(usePathname as jest.Mock).mockReturnValue("/");

		const { getByText } = render(
			<LayoutWrapper>
				<div>Content</div>
			</LayoutWrapper>,
		);

		expect(getByText("Navbar")).toBeInTheDocument();
		expect(getByText("Content")).toBeInTheDocument();
		expect(getByText("Footer")).toBeInTheDocument();
		expect(getByText("Sitemap")).toBeInTheDocument();
	});

	// TODO
	// Test escape key
	// Test show fade
	// test redirect to login
	// test outside click

	// it("should close login modal when open and escape key is pressed", () => {
	// 	(usePathname as jest.Mock).mockReturnValue("/");

	// 	(useAuthStore as unknown as jest.Mock).mockReturnValueOnce({
	// 		user: null,
	// 		initialLoading: false,
	// 	});

	// 	(useModalsStore as unknown as jest.Mock).mockReturnValueOnce({
	// 		loginModalOpen: true,
	// 		productAddedModalOpen: false,
	// 		productPreviewModalOpen: false,
	// 		cartBarOpen: false,
	// 		searchBarOpen: false,
	// 		drawerMenuOpen: false,
	// 		deliveryModalOpen: false,
	// 		sizeGuideModalOpen: false,
	// 		askQuestionModalOpen: false,
	// 		productImageModalOpen: false,
	// 		setLoginModalOpen,
	// 		setProductAddedModalOpen,
	// 		setProductPreviewModalOpen,
	// 		setCartBarOpen,
	// 		setDrawerMenuOpen,
	// 		setSearchBarOpen,
	// 		setDeliveryInfoModalOpen,
	// 		setSizeGuideModalOpen,
	// 		setAskQuestionModalOpen,
	// 		setProductImageModalOpen,
	// 	});

	// 	const { getByText } = render(
	// 		<LayoutWrapper>
	// 			<div>Content</div>
	// 		</LayoutWrapper>,
	// 	);

	// 	const modal = getByText("LoginModal");

	// 	expect(modal).toBeInTheDocument();

	// 	fireEvent.keyDown(modal, {
	// 		key: "Escape",
	// 		code: "Escape",
	// 		keyCode: 27,
	// 		charCode: 27,
	// 	});

	// 	expect(setLoginModalOpen).toHaveBeenCalledWith(false);
	// });
});
