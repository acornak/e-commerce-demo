import WishlistPage from "@/app/wishlist/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

jest.mock("@/components/product/WishlistTable", () => {
	return {
		__esModule: true,
		default: () => <div data-testid="mock-wishlist-table" />,
	};
});

jest.mock("@/components/hero/StyledHero", () => {
	return {
		__esModule: true,
		default: () => <div data-testid="mock-hero" />,
	};
});

jest.mock("@/components/common/LoginPrompt", () => {
	return {
		__esModule: true,
		default: () => <div data-testid="login-prompt" />,
	};
});

describe("Wishlist Page", () => {
	it("renders the wishlist page", () => {
		render(<WishlistPage />);

		expect(screen.getByTestId("mock-styled-heading")).toBeInTheDocument();
		expect(screen.getByTestId("login-prompt")).toBeInTheDocument();
		expect(screen.getByTestId("mock-wishlist-table")).toBeInTheDocument();
		expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
	});
});
