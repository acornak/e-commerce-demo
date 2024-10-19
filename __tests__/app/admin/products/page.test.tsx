// Test
import { render, screen } from "@testing-library/react";
// Components
import AdminProductsPage from "@/app/admin/products/page";

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

// Fully tested
describe("Admin Products Page", () => {
	it("renders the admin products page", () => {
		render(<AdminProductsPage />);

		expect(screen.getByTestId("mock-styled-heading")).toBeInTheDocument();
	});
});
