// Test
import { render, screen } from "@testing-library/react";
// Components
import AdminProfilePage from "@/app/admin/profile/page";

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

// Fully tested
describe("Admin Profile Page", () => {
	it("renders the admin Profile page", () => {
		render(<AdminProfilePage />);

		expect(screen.getByTestId("mock-styled-heading")).toBeInTheDocument();
	});
});
