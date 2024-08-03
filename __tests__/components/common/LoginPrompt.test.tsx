import LoginPrompt from "@/components/common/LoginPrompt";
import { User } from "@/lib/config/types";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useModalsStore } from "@/lib/stores/modals-store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

// Fully tested
describe("LoginPrompt", () => {
	// TODO: add to __mocks__ folder
	const mockUser: User = {
		firstName: "John",
		lastName: "Doe",
		phoneNumber: "1234567890",
		address: {
			street: "123 Main St",
			city: "Springfield",
			zipCode: "12345",
			country: "USA",
		},
		cartItems: [],
		wishlistItems: [],
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("does not render anything when initialLoading is true", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: true,
				user: null,
			});
		});

		const { container } = render(<LoginPrompt />);
		expect(container).toBeEmptyDOMElement();

		expect(useAuthStore).toHaveBeenCalledTimes(2);

		await waitFor(() => {
			expect(
				screen.queryByTestId("login-prompt"),
			).not.toBeInTheDocument();
		});
	});

	it("does not render anything when user is logged in", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: mockUser,
			});
		});

		const { container } = render(<LoginPrompt />);
		expect(container).toBeEmptyDOMElement();

		expect(useAuthStore).toHaveBeenCalledTimes(2);

		await waitFor(() => {
			expect(
				screen.queryByTestId("login-prompt"),
			).not.toBeInTheDocument();
		});
	});

	it("renders login prompt and handles click event", async () => {
		const setLoginModalOpen = jest.fn();
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		const mockModalsStore = useModalsStore as unknown as jest.Mock;

		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				setLoginModalOpen,
			});
		});

		render(<LoginPrompt />);

		// Check if the login prompt is rendered
		const loginPrompt = screen.getByTestId("login-prompt");
		expect(loginPrompt).toBeInTheDocument();

		// Verify the text content
		expect(loginPrompt).toHaveTextContent(
			"For better experience, please login first.",
		);

		// Find the login link
		const loginLink = screen.getByText("login");

		// Perform the click event
		fireEvent.click(loginLink);

		// Verify that the setLoginModalOpen function is called with true
		expect(setLoginModalOpen).toHaveBeenCalledWith(true);
	});
});
