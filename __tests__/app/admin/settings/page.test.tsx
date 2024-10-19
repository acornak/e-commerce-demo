// Test
import { render, screen } from "@testing-library/react";
// Components
import AdminSettingsPage from "@/app/admin/settings/page";

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

// Fully tested
describe("Admin Settings Page", () => {
	it("renders the admin settings page", () => {
		render(<AdminSettingsPage />);

		expect(screen.getByTestId("mock-styled-heading")).toBeInTheDocument();
	});
});
