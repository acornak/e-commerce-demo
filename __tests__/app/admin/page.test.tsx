// Testing
import { render, screen } from "@testing-library/react";
// Components
import AdminPage from "@/app/admin/page";

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

// Fully tested
describe("Admin Page", () => {
	it("renders the admin page", () => {
		render(<AdminPage />);

		expect(screen.getByTestId("mock-styled-heading")).toBeInTheDocument();
	});
});
