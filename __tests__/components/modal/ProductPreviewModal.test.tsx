import ProductPreviewModal from "@/components/modal/ProductPreviewModal";
import { render, screen } from "@testing-library/react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useModalsStore } from "@/lib/stores/modals-store";

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
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("renders product preview modal without crashing", () => {
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

		render(<ProductPreviewModal />);

		const loading = screen.getByTestId("loading");
		expect(loading).toBeInTheDocument();
	});

	it("does not render product preview modal when isOpen is false", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn) => {
			return fn({
				productPreviewModalOpen: false,
				setProductPreviewModalOpen: jest.fn(),
			});
		});

		render(<ProductPreviewModal />);

		expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
	});

	// TODO
	// it("closes the modal when the close button is clicked", async () => {
	// 	const mockModalsStore = useModalsStore as unknown as jest.Mock;
	// 	mockModalsStore.mockImplementation((fn) => {
	// 		return fn({
	// 			productPreviewModalOpen: true,
	// 			setProductPreviewModalOpen: jest.fn(),
	// 			previewProductId: "123",
	// 		});
	// 	});

	// 	const mockCartStore = useCartStore as unknown as jest.Mock;
	// 	mockCartStore.mockImplementation((fn) => {
	// 		return fn({
	// 			addItem: jest.fn(),
	// 		});
	// 	});

	// 	const mockFetchProductById = fetchProductById as jest.Mock;
	// 	mockFetchProductById.mockImplementation(() => {
	// 		return Promise.resolve({
	// 			id: "123",
	// 			name: "Product Name",
	// 			price: 100,
	// 			sizes: [
	// 				{ id: "1", name: "S" },
	// 				{ id: "2", name: "M" },
	// 			],
	// 		});
	// 	});

	// 	const mockFetchProductImage = fetchProductImage as jest.Mock;
	// 	mockFetchProductImage.mockImplementation(() => {
	// 		return Promise.resolve("https://example.com/image.jpg");
	// 	});

	// 	render(<ProductPreviewModal />);

	// 	jest.advanceTimersByTime(500);

	// 	await waitFor(() => {
	// 		expect(
	// 			screen.getByTestId("product-preview-modal"),
	// 		).toBeInTheDocument();
	// 	});

	// 	const closeButton = screen.getByTestId("close-product-preview-modal");
	// 	act(() => {
	// 		closeButton.click();
	// 	});

	// 	await waitFor(() => {
	// 		expect(mockModalsStore).toHaveBeenCalledTimes(2);
	// 		expect(mockModalsStore).toHaveBeenCalledTimes(1);
	// 	});
	// });
});
