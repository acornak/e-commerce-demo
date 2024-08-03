import AskQuestionModal from "@/components/modal/AskQuestionModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useModalsStore } from "@/lib/stores/modals-store";
import { act } from "react-dom/test-utils";

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

jest.mock("@/components/common/ContactForm", () => ({
	__esModule: true,
	default: () => <div data-testid="contact-form" />,
}));

describe("AskQuestionModal", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders ask question modal without crashing", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				askQuestionModalOpen: true,
				setAskQuestionModalOpen: jest.fn(),
			});
		});

		render(<AskQuestionModal />);

		const modal = screen.getByTestId("ask-question-modal");
		const contactForm = screen.getByTestId("contact-form");

		expect(modal).toBeInTheDocument();
		expect(contactForm).toBeInTheDocument();
	});

	it("does not render ask question modal when isOpen is false", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				askQuestionModalOpen: false,
				setAskQuestionModalOpen: jest.fn(),
			});
		});

		render(<AskQuestionModal />);

		expect(
			screen.queryByTestId("ask-question-modal"),
		).not.toBeInTheDocument();
	});

	it("closes the modal when the close button is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetAskQuestionModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				askQuestionModalOpen: true,
				setAskQuestionModalOpen: mockSetAskQuestionModalOpen,
			});
		});

		render(<AskQuestionModal />);

		const closeButton = screen.getByTestId("ask-question-modal-close");
		expect(closeButton).toBeInTheDocument();

		await act(async () => {
			closeButton.click();
		});

		await waitFor(() => {
			expect(mockSetAskQuestionModalOpen).toHaveBeenCalledTimes(1);
			expect(mockSetAskQuestionModalOpen).toHaveBeenCalledWith(false);
		});
	});

	it("closes the modal when the background is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetAskQuestionModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				askQuestionModalOpen: true,
				setAskQuestionModalOpen: mockSetAskQuestionModalOpen,
			});
		});

		render(<AskQuestionModal />);

		await act(async () => {
			fireEvent.mouseDown(document.body);
		});

		await waitFor(() => {
			expect(mockSetAskQuestionModalOpen).toHaveBeenCalledTimes(1);
			expect(mockSetAskQuestionModalOpen).toHaveBeenCalledWith(false);
		});
	});
});
