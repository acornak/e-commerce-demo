import CookieConsent from "@/components/modal/CookieConsent";
import { render, screen } from "@testing-library/react";
import { hasCookie } from "cookies-next";
import { usePathname } from "next/navigation";

jest.mock("cookies-next", () => ({
	hasCookie: jest.fn(),
	setCookie: jest.fn(),
}));

jest.mock("next/navigation", () => ({
	usePathname: jest.fn(),
}));

// Fully tested
describe("CookieConsent", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders cookie consent", () => {
		(hasCookie as jest.Mock).mockReturnValue(false);
		(usePathname as jest.Mock).mockReturnValue("/asdf");

		render(<CookieConsent />);

		const cookieConsent = screen.getByTestId("cookie-consent");
		expect(cookieConsent).toBeInTheDocument();
	});

	it("does not render cookie consent if cookie is set", () => {
		(hasCookie as jest.Mock).mockReturnValue(true);
		(usePathname as jest.Mock).mockReturnValue("/asdf");

		render(<CookieConsent />);
		expect(screen.queryByTestId("cookie-consent")).not.toBeInTheDocument();
	});

	it("does not render cookie consent if pathname is /privacy-policy", () => {
		(hasCookie as jest.Mock).mockReturnValue(false);
		(usePathname as jest.Mock).mockReturnValue("/privacy-policy");

		render(<CookieConsent />);
		expect(screen.queryByTestId("cookie-consent")).not.toBeInTheDocument();
	});

	it("handles acceptCookie", () => {
		(hasCookie as jest.Mock).mockReturnValue(false);
		(usePathname as jest.Mock).mockReturnValue("/asdf");

		render(<CookieConsent />);

		const acceptButton = screen.getByTestId("cookie-consent-accept");
		acceptButton.click();

		expect(hasCookie).toHaveBeenCalledWith("cookieConsent");
	});

	it("handles rejectCookie", () => {
		(hasCookie as jest.Mock).mockReturnValue(false);
		(usePathname as jest.Mock).mockReturnValue("/asdf");

		render(<CookieConsent />);

		const rejectButton = screen.getByTestId("cookie-consent-decline");
		rejectButton.click();

		expect(hasCookie).toHaveBeenCalledWith("cookieConsent");
	});
});
