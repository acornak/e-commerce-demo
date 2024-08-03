import PrivacyPolicyPage from "@/app/privacy-policy/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/hero/StyledHero", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-hero" />,
}));

jest.mock("@/components/common/Newsletter", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-newsletter" />,
}));

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

describe("Privacy Policy Page", () => {
	it("renders the privacy policy page", () => {
		render(<PrivacyPolicyPage />);

		expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
		expect(screen.getByTestId("mock-newsletter")).toBeInTheDocument();
		expect(screen.getByTestId("mock-styled-heading")).toBeInTheDocument();
	});
});
