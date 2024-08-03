import LoginPage from "@/app/login/page";
import { useAuthStore } from "@/lib/stores/auth-store";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/styled/Heading", () => ({
	__esModule: true,
	StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
}));

jest.mock("@/components/login/HandleLoginForm", () => ({
	__esModule: true,
	default: () => <div data-testid="login-form" />,
}));

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

jest.mock("@/components/styled/Loading", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-loading" />,
}));

jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));

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

	// TODO
	// it("redirects to home page if user is logged in", () => {
	// 	const mockAuthStore = useAuthStore as unknown as jest.Mock;
	// 	mockAuthStore.mockImplementation((fn: any) => {
	// 		return fn({
	// 			initialLoading: false,
	// 			user: {
	// 				email: "me@example.com",
	// 			},
	// 		});
	// 	});

	// 	render(<LoginPage />);

	// 	expect(screen.queryByTestId("mock-loading")).not.toBeInTheDocument();

	// 	expect(redirect).toHaveBeenCalledWith("/");
	// });
});
