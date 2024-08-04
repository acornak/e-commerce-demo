import LoginPage from "@/app/login/page";
import { useAuthStore } from "@/lib/stores/auth-store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { redirect, useSearchParams } from "next/navigation";

jest.mock("@/components/styled/Heading", () => ({
	__esModule: true,
	StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
}));

jest.mock("@/components/login/HandleLoginForm", () => ({
	__esModule: true,
	default: ({ showRegister, setShowRegister }: any) => (
		<div>
			<button
				onClick={() => setShowRegister(!showRegister)}
				type="button"
			>
				Toggle Register
			</button>
			{showRegister ? <div>Register Form</div> : <div>Login Form</div>}
		</div>
	),
}));

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

jest.mock("@/components/styled/Loading", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-loading" />,
}));

jest.mock("next/navigation", () => ({
	useSearchParams: jest.fn(),
	redirect: jest.fn(),
}));

// Fully tested
describe("Login Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders loading state", () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: true,
				user: null,
			});
		});

		render(<LoginPage />);

		expect(screen.getByTestId("mock-loading")).toBeInTheDocument();
	});

	it("should redirect to base path if a user is authenticated", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
			});
		});

		(useSearchParams as jest.Mock).mockReturnValue({
			get: () => null,
		});

		render(<LoginPage />);

		await waitFor(() => {
			expect(redirect).toHaveBeenCalledWith("/");
		});
	});

	it("should redirect to the appropriate path if a user is authenticated", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
			});
		});

		(useSearchParams as jest.Mock).mockReturnValue({
			get: (key: string) => (key === "redirect" ? "dashboard" : null),
		});

		render(<LoginPage />);

		await waitFor(() => {
			expect(redirect).toHaveBeenCalledWith("/dashboard");
		});
	});

	it("should show the login form and allow toggling to register form", () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
			});
		});

		render(<LoginPage />);

		expect(screen.getByText("Login Form")).toBeInTheDocument();

		const toggleButton = screen.getByText("Toggle Register");
		fireEvent.click(toggleButton);

		expect(screen.getByText("Register Form")).toBeInTheDocument();
	});
});
