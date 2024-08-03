import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useAuthStore } from "@/lib/stores/auth-store";
import AccountPage from "@/app/account/page";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/models/user";

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

jest.mock("@/components/styled/Heading", () => ({
	__esModule: true,
	StyledSectionHeading: () => <div data-testid="mock-section-heading" />,
}));

jest.mock("@/components/styled/Loading", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-loading" />,
}));

jest.mock("@/components/profile/ProfileWrapper", () => ({
	__esModule: true,
	default: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mock-profile-wrapper">{children}</div>
	),
}));

jest.mock("@/components/profile/UserDataForm", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-user-data-form" />,
}));

jest.mock("@/components/profile/PasswordForm", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-password-form" />,
}));

jest.mock("@/components/profile/AddressForm", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-address-form" />,
}));

jest.mock("@/components/common/Newsletter", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-newsletter" />,
}));

jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));

jest.mock("@/lib/models/user", () => ({
	getUser: jest.fn(),
}));

// Fully tested
describe("Account Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders loading spinner when initialLoading is true", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: true,
				user: null,
			});
		});

		render(<AccountPage />);

		await waitFor(() => {
			expect(screen.getByTestId("mock-loading")).toBeInTheDocument();
			expect(useAuthStore).toHaveBeenCalledTimes(2);
		});
	});

	it("should redirect to login page when user is not logged in", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		render(<AccountPage />);

		expect(redirect).toHaveBeenCalledWith("/login?redirect=account");
	});

	it("should render error message when error is present", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
			});
		});

		const mockGetUser = getUser as jest.Mock;
		mockGetUser.mockImplementation(() => {
			throw new Error("User not found");
		});

		render(<AccountPage />);

		await waitFor(() => {
			expect(screen.getByText("User not found")).toBeInTheDocument();
		});
	});

	it("should render user data form when user is logged in", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
			});
		});

		const mockGetUser = getUser as jest.Mock;
		mockGetUser.mockImplementation(() => {
			return {
				firstName: "John",
			};
		});

		render(<AccountPage />);

		await waitFor(() => {
			expect(
				screen.getByTestId("mock-profile-wrapper"),
			).toBeInTheDocument();
			expect(
				screen.getByTestId("mock-user-data-form"),
			).toBeInTheDocument();
			expect(screen.getByText("John")).toBeInTheDocument();
		});
	});
});
