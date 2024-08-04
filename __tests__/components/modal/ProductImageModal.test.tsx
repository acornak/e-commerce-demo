import ProductImageModal from "@/components/modal/ProductImageModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useModalsStore } from "@/lib/stores/modals-store";
import { act } from "react-dom/test-utils";

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({
		src,
		alt,
		"data-testid": dataTestId,
	}: {
		src: string;
		alt: string;
		"data-testid"?: string;
	}) => <img src={src} alt={alt} data-testid={dataTestId} />,
}));

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

// Fully tested
describe("ProductImageModal", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders product image modal without crashing", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				productImageModalOpen: true,
				productImageModalUrl: "https://example.com/image.jpg",
				setProductImageModalOpen: jest.fn(),
			});
		});

		render(<ProductImageModal />);

		const modal = screen.getByTestId("product-image-modal");
		const image = screen.getByTestId("product-image");

		expect(modal).toBeInTheDocument();
		expect(image).toBeInTheDocument();
	});

	it("does not render product image modal when isOpen is false", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				productImageModalOpen: false,
				setProductImageModalOpen: jest.fn(),
			});
		});

		render(<ProductImageModal />);

		expect(
			screen.queryByTestId("product-image-modal"),
		).not.toBeInTheDocument();
	});

	it("closes the modal when the close button is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetProductImageModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				productImageModalOpen: true,
				productImageModalUrl: "https://example.com/image.jpg",
				setProductImageModalOpen: mockSetProductImageModalOpen,
			});
		});

		render(<ProductImageModal />);

		const closeButton = screen.getByTestId("product-image-modal-close");

		await act(async () => {
			closeButton.click();
		});

		await waitFor(() => {
			expect(mockSetProductImageModalOpen).toHaveBeenCalledWith(false);
		});

		expect(mockSetProductImageModalOpen).toHaveBeenCalledTimes(1);
	});

	it("closes the modal when the background is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetProductImageModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				productImageModalOpen: true,
				productImageModalUrl: "https://example.com/image.jpg",
				setProductImageModalOpen: mockSetProductImageModalOpen,
			});
		});

		render(<ProductImageModal />);

		await act(async () => {
			fireEvent.mouseDown(document.body);
		});

		await waitFor(() => {
			expect(mockSetProductImageModalOpen).toHaveBeenCalledTimes(1);
			expect(mockSetProductImageModalOpen).toHaveBeenCalledWith(false);
		});
	});
});
