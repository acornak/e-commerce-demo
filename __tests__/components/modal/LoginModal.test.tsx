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
	default: ({ showRegister, setShowRegister }: any) => (
		<div data-testid="handle-login-form">
			<button
				onClick={() => setShowRegister(!showRegister)}
				type="button"
			>
				Show Register
			</button>
		</div>
	),
}));

// Fully tested
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

	it("handles toggle button click", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetLoginModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				loginModalOpen: true,
				setLoginModalOpen: mockSetLoginModalOpen,
			});
		});

		render(<LoginModal />);

		expect(screen.getByText("Show Register")).toBeInTheDocument();

		expect(
			screen.queryByText("Create your free account"),
		).not.toBeInTheDocument();
		expect(screen.getByText("Great to have you back!")).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(screen.getByText("Show Register"));
		});

		await waitFor(() => {
			expect(
				screen.queryByText("Great to have you back!"),
			).not.toBeInTheDocument();
			expect(
				screen.getByText("Create your free account"),
			).toBeInTheDocument();
		});
	});

	it("should call setLoginModalOpen(false) when user is set", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetLoginModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				loginModalOpen: true,
				setLoginModalOpen: mockSetLoginModalOpen,
			});
		});

		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { name: "John Doe" },
			});
		});

		render(<LoginModal />);

		await waitFor(() => {
			expect(mockSetLoginModalOpen).toHaveBeenCalledWith(false);
		});
	});
});
