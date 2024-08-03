import { render, screen, waitFor } from "@testing-library/react";
import { useAuthStore } from "@/lib/stores/auth-store";
import AccountPage from "@/app/account/page";
import { redirect } from "next/navigation";

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

jest.mock("@/components/styled/Loading", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-loading" />,
}));

jest.mock("@/components/profile/ProfileWrapper", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-profile-wrapper" />,
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

jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));

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
});
