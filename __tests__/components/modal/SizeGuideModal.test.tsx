import SizeGuideModal from "@/components/modal/SizeGuideModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useModalsStore } from "@/lib/stores/modals-store";
import { act } from "react-dom/test-utils";

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

// Fully tested
describe("SizeGuideModal", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders size guide modal without crashing", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				sizeGuideModalOpen: true,
				setSizeGuideModalOpen: jest.fn(),
			});
		});

		render(<SizeGuideModal />);

		const modal = screen.getByTestId("size-guide-modal");

		expect(modal).toBeInTheDocument();
	});

	it("does not render size guide modal when isOpen is false", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				sizeGuideModalOpen: false,
				setSizeGuideModalOpen: jest.fn(),
			});
		});

		render(<SizeGuideModal />);

		expect(
			screen.queryByTestId("size-guide-modal"),
		).not.toBeInTheDocument();
	});

	it("closes the modal when the close button is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetSizeGuideModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				sizeGuideModalOpen: true,
				setSizeGuideModalOpen: mockSetSizeGuideModalOpen,
			});
		});

		render(<SizeGuideModal />);

		const closeButton = screen.getByTestId("size-guide-modal-close");

		await act(async () => {
			closeButton.click();
		});

		await waitFor(() => {
			expect(mockSetSizeGuideModalOpen).toHaveBeenCalledWith(false);
		});

		expect(mockSetSizeGuideModalOpen).toHaveBeenCalledTimes(1);
	});

	it("closes the modal when the background is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetSizeGuideModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				sizeGuideModalOpen: true,
				setSizeGuideModalOpen: mockSetSizeGuideModalOpen,
			});
		});

		render(<SizeGuideModal />);

		await act(async () => {
			fireEvent.mouseDown(document.body);
		});

		await waitFor(() => {
			expect(mockSetSizeGuideModalOpen).toHaveBeenCalledTimes(1);
			expect(mockSetSizeGuideModalOpen).toHaveBeenCalledWith(false);
		});
	});

	it("handles tab clicks", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetSizeGuideModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				sizeGuideModalOpen: true,
				setSizeGuideModalOpen: mockSetSizeGuideModalOpen,
			});
		});

		render(<SizeGuideModal />);

		const swimwearButton = screen.getByTestId("swimwear-tab");
		const dressesButton = screen.getByTestId("dresses-tab");
		const shoesButton = screen.getByTestId("shoes-tab");

		expect(screen.queryByTestId("swimwear-table")).not.toBeInTheDocument();
		expect(screen.queryByTestId("shoes-table")).not.toBeInTheDocument();
		expect(screen.getByTestId("dresses-table")).toBeInTheDocument();

		await act(async () => {
			swimwearButton.click();
		});

		await waitFor(() => {
			expect(screen.getByTestId("swimwear-table")).toBeInTheDocument();
			expect(
				screen.queryByTestId("dresses-table"),
			).not.toBeInTheDocument();
			expect(screen.queryByTestId("shoes-table")).not.toBeInTheDocument();
		});

		await act(async () => {
			dressesButton.click();
		});

		await waitFor(() => {
			expect(
				screen.queryByTestId("swimwear-table"),
			).not.toBeInTheDocument();
			expect(screen.getByTestId("dresses-table")).toBeInTheDocument();
			expect(screen.queryByTestId("shoes-table")).not.toBeInTheDocument();
		});

		await act(async () => {
			shoesButton.click();
		});

		await waitFor(() => {
			expect(
				screen.queryByTestId("swimwear-table"),
			).not.toBeInTheDocument();
			expect(
				screen.queryByTestId("dresses-table"),
			).not.toBeInTheDocument();
			expect(screen.getByTestId("shoes-table")).toBeInTheDocument();
		});
	});
});
