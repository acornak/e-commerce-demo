import ProductPreviewModal from "@/components/modal/ProductPreviewModal";
import { render, screen, waitFor } from "@testing-library/react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useModalsStore } from "@/lib/stores/modals-store";
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
import { act } from "react-dom/test-utils";
import mockProducts from "@/__mocks__/products/products.mock";

jest.mock("@/lib/stores/cart-store", () => ({
	useCartStore: jest.fn(),
	updateCartStore: jest.fn(),
}));

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

jest.mock("@/lib/functions/product-fetcher", () => ({
	fetchProductById: jest.fn(),
	fetchProductImage: jest.fn(),
}));

jest.mock("@/components/styled/Loading", () => ({
	__esModule: true,
	default: () => <div data-testid="loading">Loading...</div>,
}));

describe("ProductPreviewModal", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// jest.useFakeTimers();
	});

	// afterEach(() => {
	// 	jest.useRealTimers();
	// });

	it("renders product preview modal without crashing", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn) => {
			return fn({
				productPreviewModalOpen: true,
				setProductPreviewModalOpen: jest.fn(),
				previewProductId: "123",
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		mockCartStore.mockImplementation((fn) => {
			return fn({
				addItem: jest.fn(),
			});
		});

		await act(async () => {
			render(<ProductPreviewModal />);
		});

		await waitFor(() => {
			const loading = screen.getByTestId("loading");
			expect(loading).toBeInTheDocument();
		});
	});

	it("does not render product preview modal when isOpen is false", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn) => {
			return fn({
				productPreviewModalOpen: false,
				setProductPreviewModalOpen: jest.fn(),
			});
		});

		await act(async () => {
			render(<ProductPreviewModal />);
		});

		await waitFor(() => {
			expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
		});
	});

	// TODO
	it("closes the modal when the close button is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mocksetProductPreviewModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn) => {
			return fn({
				productPreviewModalOpen: true,
				setProductPreviewModalOpen: mocksetProductPreviewModalOpen,
				previewProductId: mockProducts[0].id,
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		mockCartStore.mockImplementation((fn) => {
			return fn({
				addItem: jest.fn(),
			});
		});

		const mockFetchProductById = fetchProductById as jest.Mock;
		mockFetchProductById.mockImplementation(() => {
			return Promise.resolve(mockProducts[0]);
		});

		const mockFetchProductImage = fetchProductImage as jest.Mock;
		mockFetchProductImage.mockImplementation(() => {
			return Promise.resolve("https://example.com/image.jpg");
		});

		await act(async () => {
			render(<ProductPreviewModal />);
		});

		await waitFor(() => {
			expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
		});

		await waitFor(() => {
			expect(
				screen.getByTestId("product-preview-modal"),
			).toBeInTheDocument();
		});

		const closeButton = screen.getByTestId("close-product-preview-modal");
		await act(async () => {
			closeButton.click();
		});

		await waitFor(() => {
			expect(mockModalsStore).toHaveBeenCalled();

			expect(mocksetProductPreviewModalOpen).toHaveBeenCalledWith(false);
		});
	});
});
