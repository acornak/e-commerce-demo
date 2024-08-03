import ContactPage from "@/app/contact/page";
import verifyCaptcha from "@/lib/functions/verify-captcha";
import { render, screen, waitFor } from "@testing-library/react";
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

jest.mock("@/lib/functions/verify-captcha", () => ({
	__esModule: true,
	default: jest.fn(),
}));

jest.mock("google-map-react", () => {
	return {
		__esModule: true,
		default: () => <div data-testid="google-map" />,
	};
});

// Fully tested
describe("Contact Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the contact page without google maps", async () => {
		(useGoogleReCaptcha as jest.Mock).mockReturnValue({
			executeRecaptcha: null,
		});

		render(<ContactPage />);

		await waitFor(() => {
			expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
			expect(screen.getByTestId("mock-newsletter")).toBeInTheDocument();
			expect(
				screen.getByTestId("mock-styled-heading"),
			).toBeInTheDocument();
			expect(screen.getByTestId("mock-contact-form")).toBeInTheDocument();
			expect(screen.queryByTestId("google-map")).toBeNull();
		});
	});

	it("renders the contact page without google maps when captcha verification fails", async () => {
		const mockExecuteRecaptcha = jest.fn().mockResolvedValue("token");
		(useGoogleReCaptcha as jest.Mock).mockReturnValue({
			executeRecaptcha: mockExecuteRecaptcha,
		});

		const mockVerifyCaptcha = verifyCaptcha as jest.MockedFunction<
			typeof verifyCaptcha
		>;
		mockVerifyCaptcha.mockResolvedValue(false);

		render(<ContactPage />);

		await waitFor(() => {
			expect(mockVerifyCaptcha).toHaveBeenCalled();
			expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
			expect(screen.getByTestId("mock-newsletter")).toBeInTheDocument();
			expect(
				screen.getByTestId("mock-styled-heading"),
			).toBeInTheDocument();
			expect(screen.getByTestId("mock-contact-form")).toBeInTheDocument();
			expect(screen.queryByTestId("google-map")).toBeNull();
		});
	});

	it("renders the contact page with google maps", async () => {
		const mockExecuteRecaptcha = jest.fn().mockResolvedValue("token");
		(useGoogleReCaptcha as jest.Mock).mockReturnValue({
			executeRecaptcha: mockExecuteRecaptcha,
		});

		const mockVerifyCaptcha = jest.fn().mockResolvedValue(true);
		(verifyCaptcha as jest.Mock).mockImplementation(mockVerifyCaptcha);

		render(<ContactPage />);

		await waitFor(() => {
			expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
			expect(screen.getByTestId("mock-newsletter")).toBeInTheDocument();
			expect(
				screen.getByTestId("mock-styled-heading"),
			).toBeInTheDocument();
			expect(screen.getByTestId("mock-contact-form")).toBeInTheDocument();
			expect(screen.queryAllByTestId("google-map").length).toBe(2);
		});
	});
});
