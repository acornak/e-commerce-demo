import DeliveryInfoModal from "@/components/modal/DeliveryInfoModal";
import { useModalsStore } from "@/lib/stores/modals-store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

describe("DeliveryInfoModal", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders delivery info modal without crashing", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				deliveryInfoModalOpen: true,
				setDeliveryInfoModalOpen: jest.fn(),
			});
		});

		render(<DeliveryInfoModal />);

		const modal = screen.getByTestId("delivery-info-modal");

		expect(modal).toBeInTheDocument();
	});

	it("does not render delivery info modal when isOpen is false", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				deliveryInfoModalOpen: false,
				setDeliveryInfoModalOpen: jest.fn(),
			});
		});

		render(<DeliveryInfoModal />);

		expect(
			screen.queryByTestId("delivery-info-modal"),
		).not.toBeInTheDocument();
	});

	it("closes the modal when the close button is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetDeliveryInfoModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				deliveryInfoModalOpen: true,
				setDeliveryInfoModalOpen: mockSetDeliveryInfoModalOpen,
			});
		});

		render(<DeliveryInfoModal />);

		const closeButton = screen.getByTestId("delivery-info-modal-close");
		await act(async () => {
			closeButton.click();
		});

		await waitFor(() => {
			expect(mockSetDeliveryInfoModalOpen).toHaveBeenCalledWith(false);
			expect(mockSetDeliveryInfoModalOpen).toHaveBeenCalledTimes(1);
		});
	});

	it("closes the modal when the background is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetDeliveryInfoModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				deliveryInfoModalOpen: true,
				setDeliveryInfoModalOpen: mockSetDeliveryInfoModalOpen,
			});
		});

		render(<DeliveryInfoModal />);

		await act(async () => {
			fireEvent.mouseDown(document.body);
		});

		await waitFor(() => {
			expect(mockSetDeliveryInfoModalOpen).toHaveBeenCalledWith(false);
			expect(mockSetDeliveryInfoModalOpen).toHaveBeenCalledTimes(1);
		});
	});
});
