// Test
import { render, screen } from "@testing-library/react";
// Components
import AdminOrdersPage from "@/app/admin/orders/page";

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

// Fully tested
describe("Admin Orders Page", () => {
	it("renders the admin orders page", () => {
		render(<AdminOrdersPage />);

		expect(screen.getByTestId("mock-styled-heading")).toBeInTheDocument();
	});
});
