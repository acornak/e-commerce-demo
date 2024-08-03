import RegisterForm from "@/components/login/RegisterForm";
import { useAuthStore } from "@/lib/stores/auth-store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

describe("RegisterForm", () => {
	const setShowRegister = jest.fn();
	const signUpWithEmail = jest.fn();
	const mockError = "Registration error";

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders without crashing", () => {
		render(<RegisterForm setShowRegister={setShowRegister} />);
		expect(screen.getByTestId("register-form")).toBeInTheDocument();
	});

	it("updates fields correctly", async () => {
		render(<RegisterForm setShowRegister={setShowRegister} />);
		const emailInput = screen.getByTestId("register-email-input");
		const passwordInput = screen.getByTestId("register-password-input");

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
		render(<RegisterForm setShowRegister={setShowRegister} />);

		const passwordInput = screen.getByTestId("register-password-input");
		const showPasswordButton = screen.getByTestId(
			"register-show-password-button",
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
				signUpWithEmail,
				error: mockError,
			});
		});

		render(<RegisterForm setShowRegister={setShowRegister} />);

		await act(async () => {
			fireEvent.click(screen.getByTestId("login-button"));
		});

		expect(screen.getByText(mockError)).toBeInTheDocument();
	});

	it("executes signUpWithEmail", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				signUpWithEmail,
			});
		});

		render(<RegisterForm setShowRegister={setShowRegister} />);

		await act(async () => {
			fireEvent.click(screen.getByTestId("login-button"));
		});

		expect(signUpWithEmail).toHaveBeenCalled();
	});
});
