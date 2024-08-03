import GoogleButton from "@/components/login/GoogleButton";
import { useAuthStore } from "@/lib/stores/auth-store";
import { render, screen } from "@testing-library/react";

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

describe("GoogleButton", () => {
	it("renders without crashing", () => {
		render(<GoogleButton text="Test" />);
		expect(screen.getByTestId("google-login-button")).toBeInTheDocument();
	});

	it("renders children", () => {
		render(<GoogleButton text="Test" />);
		expect(screen.getByText("Test")).toBeInTheDocument();
	});

	it("executes signInWithGoogle", () => {
		const signInWithGoogle = jest.fn();
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				signInWithGoogle,
			});
		});

		render(<GoogleButton text="Test" />);
		screen.getByTestId("google-login-button").click();
		expect(signInWithGoogle).toHaveBeenCalled();
	});
});
