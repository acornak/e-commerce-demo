import LoginForm from "@/components/login/LoginForm";
import { useAuthStore } from "@/lib/stores/auth-store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

describe("LoginForm", () => {
	const setShowRegister = jest.fn();
	const signInWithEmail = jest.fn();
	const mockError = "Login error";

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders without crashing", () => {
		render(<LoginForm setShowRegister={setShowRegister} />);
		expect(screen.getByTestId("login-form")).toBeInTheDocument();
	});

	it("updates fields correctly", async () => {
		render(<LoginForm setShowRegister={setShowRegister} />);
		const emailInput = screen.getByTestId("login-email-input");
		const passwordInput = screen.getByTestId("login-password-input");

		await act(async () => {
			fireEvent.change(emailInput, {
				target: { value: "test@example.com" },
			});
			fireEvent.change(passwordInput, {
				target: { value: "password" },
			});

			expect(emailInput).toHaveValue("test@example.com");
			expect(passwordInput).toHaveValue("password");
		});
	});

	it("shows password on click", async () => {
		render(<LoginForm setShowRegister={setShowRegister} />);

		const passwordInput = screen.getByTestId("login-password-input");
		const showPasswordButton = screen.getByTestId(
			"login-show-password-button",
		);

		await act(async () => {
			fireEvent.change(passwordInput, {
				target: { value: "password" },
			});

			fireEvent.click(showPasswordButton);
		});

		await waitFor(() => {
			expect(passwordInput).toHaveAttribute("type", "text");
		});
	});

	it("shows error message", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				signInWithEmail,
				error: mockError,
			});
		});

		render(<LoginForm setShowRegister={setShowRegister} />);

		expect(screen.getByText(mockError)).toBeInTheDocument();
	});

	it("executes signInWithEmail", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				signInWithEmail,
			});
		});

		render(<LoginForm setShowRegister={setShowRegister} />);
		const emailInput = screen.getByTestId("login-email-input");
		const passwordInput = screen.getByTestId("login-password-input");

		await act(async () => {
			fireEvent.change(emailInput, {
				target: { value: "test@example.com" },
			});

			fireEvent.change(passwordInput, {
				target: { value: "password" },
			});

			fireEvent.click(screen.getByTestId("login-button"));

			expect(signInWithEmail).toHaveBeenCalledWith(
				"test@example.com",
				"password",
			);
		});
	});

	it("renders loading state", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				loading: true,
			});
		});

		render(<LoginForm setShowRegister={setShowRegister} />);

		await waitFor(() => {
			expect(screen.getByTestId("login-loading")).toBeInTheDocument();
		});
	});

	it("renders password error when empty", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({});
		});

		render(<LoginForm setShowRegister={setShowRegister} />);

		const passwordInput = screen.getByTestId("login-password-input");

		await act(async () => {
			fireEvent.change(passwordInput, {
				target: { value: "pass" },
			});

			fireEvent.change(passwordInput, {
				target: { value: "" },
			});

			fireEvent.blur(passwordInput);
		});

		await waitFor(() => {
			expect(
				screen.getByText("Please enter your password"),
			).toBeInTheDocument();
		});
	});

	it("renders email error when empty", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({});
		});

		render(<LoginForm setShowRegister={setShowRegister} />);

		const emailInput = screen.getByTestId("login-email-input");

		await act(async () => {
			fireEvent.change(emailInput, {
				target: { value: "me@example.com" },
			});

			fireEvent.change(emailInput, {
				target: { value: "" },
			});

			fireEvent.blur(emailInput);
		});

		await waitFor(() => {
			expect(
				screen.getByText("Please enter an email address"),
			).toBeInTheDocument();
		});
	});

	it("renders error when invalid email", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({});
		});

		render(<LoginForm setShowRegister={setShowRegister} />);

		const emailInput = screen.getByTestId("login-email-input");

		await act(async () => {
			fireEvent.change(emailInput, {
				target: { value: "meexample.com" },
			});

			fireEvent.blur(emailInput);
		});

		await waitFor(() => {
			expect(
				screen.getByText("Please enter a valid email address"),
			).toBeInTheDocument();
		});
	});

	it("handles reset password", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		const resetPassword = jest.fn();
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				resetPassword,
			});
		});

		render(<LoginForm setShowRegister={setShowRegister} />);
		const emailInput = screen.getByTestId("login-email-input");

		await act(async () => {
			fireEvent.change(emailInput, {
				target: { value: "test@example.com" },
			});

			fireEvent.click(screen.getByTestId("reset-password-button"));
		});

		await waitFor(() => {
			expect(resetPassword).toHaveBeenCalledWith("test@example.com");
		});
	});
});
