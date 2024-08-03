import ContactPage from "@/app/contact/page";
import { render, screen } from "@testing-library/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

jest.mock("@/components/hero/StyledHero", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-hero" />,
}));

jest.mock("@/components/common/Newsletter", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-newsletter" />,
}));

jest.mock("@/components/common/ContactForm", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-contact-form" />,
}));

jest.mock("react-google-recaptcha-v3", () => ({
	useGoogleReCaptcha: jest.fn(),
}));

describe("Contact Page", () => {
	it("renders the contact page", () => {
		(useGoogleReCaptcha as jest.Mock).mockReturnValue({
			executeRecaptcha: null,
		});

		render(<ContactPage />);

		expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
		expect(screen.getByTestId("mock-newsletter")).toBeInTheDocument();
		expect(screen.getByTestId("mock-styled-heading")).toBeInTheDocument();
		expect(screen.getByTestId("mock-contact-form")).toBeInTheDocument();
	});

	// TODO: Add test for google maps captcha verification
});
