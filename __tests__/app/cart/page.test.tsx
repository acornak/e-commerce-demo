import CartPage from "@/app/cart/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

jest.mock("@/components/product/CartTable", () => {
	return {
		__esModule: true,
		default: () => <div data-testid="mock-cart-table" />,
	};
});

jest.mock("@/components/common/LoginPrompt", () => {
	return {
		__esModule: true,
		default: () => <div data-testid="login-prompt" />,
	};
});

// Fully tested
describe("Cart Page", () => {
	it("renders the cart page", () => {
		render(<CartPage />);

		expect(screen.getByTestId("cart-page")).toBeInTheDocument();
		expect(screen.getByTestId("mock-styled-heading")).toBeInTheDocument();
		expect(screen.getByTestId("login-prompt")).toBeInTheDocument();
		expect(screen.getByTestId("mock-cart-table")).toBeInTheDocument();
	});
});
