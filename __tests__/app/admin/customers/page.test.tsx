// Test
import { render, screen } from "@testing-library/react";
// Components
import AdminCustomersPage from "@/app/admin/customers/page";

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

// Fully tested
describe("Admin Customers Page", () => {
	it("renders the admin customers page", () => {
		render(<AdminCustomersPage />);

		expect(screen.getByTestId("mock-styled-heading")).toBeInTheDocument();
	});
});
