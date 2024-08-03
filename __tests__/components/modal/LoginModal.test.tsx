import LoginModal from "@/components/modal/LoginModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useModalsStore } from "@/lib/stores/modals-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { act } from "react-dom/test-utils";

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

jest.mock("@/components/login/HandleLoginForm", () => ({
	__esModule: true,
	default: () => <div data-testid="handle-login-form" />,
}));

describe("LoginModal", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders login modal without crashing", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				loginModalOpen: true,
				setLoginModalOpen: jest.fn(),
			});
		});

		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		render(<LoginModal />);

		const modal = screen.getByTestId("login-modal");
		const handleLoginForm = screen.getByTestId("handle-login-form");

		expect(modal).toBeInTheDocument();
		expect(handleLoginForm).toBeInTheDocument();
	});

	it("does not render login modal when isOpen is false", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				loginModalOpen: false,
				setLoginModalOpen: jest.fn(),
			});
		});

		render(<LoginModal />);

		expect(screen.queryByTestId("login-modal")).not.toBeInTheDocument();

		expect(
			screen.queryByTestId("handle-login-form"),
		).not.toBeInTheDocument();
	});

	it("closes the modal when the close button is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetLoginModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				loginModalOpen: true,
				setLoginModalOpen: mockSetLoginModalOpen,
			});
		});

		render(<LoginModal />);

		const closeButton = screen.getByTestId("login-modal-close");
		expect(closeButton).toBeInTheDocument();

		await act(async () => {
			closeButton.click();
		});

		await waitFor(() => {
			expect(mockSetLoginModalOpen).toHaveBeenCalledTimes(1);
			expect(mockSetLoginModalOpen).toHaveBeenCalledWith(false);
		});
	});

	it("closes the modal when the background is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetLoginModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				loginModalOpen: true,
				setLoginModalOpen: mockSetLoginModalOpen,
			});
		});

		render(<LoginModal />);

		await act(async () => {
			fireEvent.mouseDown(document.body);
		});

		await waitFor(() => {
			expect(mockSetLoginModalOpen).toHaveBeenCalledTimes(1);
			expect(mockSetLoginModalOpen).toHaveBeenCalledWith(false);
		});
	});

	// TODO test showRegister
});
