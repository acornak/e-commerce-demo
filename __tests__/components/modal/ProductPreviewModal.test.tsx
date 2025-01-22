import ProductPreviewModal from "@/components/modal/ProductPreviewModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useModalsStore } from "@/lib/stores/modals-store";
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
import { act } from "react-dom/test-utils";
import mockProducts from "@/__mocks__/products/products.mock";
import { Product, Size } from "@/lib/config/types";

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

jest.mock("@/components/common/SizePicker", () => ({
	__esModule: true,
	default: ({
		product,
		selectedSize,
		setSelectedSize,
	}: {
		product: Product;
		selectedSize: Size;
		setSelectedSize: any;
	}) => (
		<div>
			<span>Mock Size Picker</span>
			<span>{product.name}</span>
			<span>{selectedSize?.name}</span>
			<button
				onClick={() => setSelectedSize({ id: 1, name: "Small" })}
				type="button"
				data-testid="mock-size-picker-button"
			>
				Set size
			</button>
		</div>
	),
}));

describe("ProductPreviewModal", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

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

	it("closes the modal when the background is clicked", async () => {
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

		await act(async () => {
			fireEvent.mouseDown(document.body);
		});

		await waitFor(() => {
			expect(mockModalsStore).toHaveBeenCalled();
			expect(mocksetProductPreviewModalOpen).toHaveBeenCalledWith(false);
		});
	});

	it("handles data fetcing error", async () => {
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
			return Promise.reject(new Error("Fetching product image failed"));
		});

		const consoleErrorMock = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		await act(async () => {
			render(<ProductPreviewModal />);
		});

		await waitFor(() => {
			expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
		});

		await waitFor(() => {
			expect(mockModalsStore).toHaveBeenCalled();
			expect(mocksetProductPreviewModalOpen).toHaveBeenCalledWith(false);
			expect(consoleErrorMock).toHaveBeenCalled();
		});
	});

	it("handles changing quantity", async () => {
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
			expect(screen.getByTestId("quantity").textContent).toBe("1");
		});

		const increaseQuantityButton = screen.getByTestId("increase-quantity");
		const decreaseQuantityButton = screen.getByTestId("decrease-quantity");

		await act(async () => {
			increaseQuantityButton.click();
		});

		await waitFor(() => {
			expect(screen.getByTestId("quantity").textContent).toBe("2");
		});

		await act(async () => {
			decreaseQuantityButton.click();
		});

		await waitFor(() => {
			expect(screen.getByTestId("quantity").textContent).toBe("1");
		});

		await act(async () => {
			decreaseQuantityButton.click();
		});

		await waitFor(() => {
			expect(screen.getByTestId("quantity").textContent).toBe("1");
		});

		for (let i = 0; i < 11; i += 1) {
			/* eslint-disable no-await-in-loop */
			await act(async () => {
				increaseQuantityButton.click();
			});
		}

		await waitFor(() => {
			expect(screen.getByTestId("quantity").textContent).toBe("10");
		});
	});

	it("handles adding product to cart", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mocksetProductPreviewModalOpen = jest.fn();
		const mockSetProductAddedModalOpen = jest.fn();
		const mockSetCartProduct = jest.fn();
		mockModalsStore.mockImplementation((fn) => {
			return fn({
				productPreviewModalOpen: true,
				setProductPreviewModalOpen: mocksetProductPreviewModalOpen,
				previewProductId: mockProducts[0].id,
				setProductAddedModalOpen: mockSetProductAddedModalOpen,
				setCartProduct: mockSetCartProduct,
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		const mockAddItem = jest.fn();
		mockCartStore.mockImplementation((fn) => {
			return fn({
				addItem: mockAddItem,
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

		// Add quantity
		const increaseQuantityButton = screen.getByTestId("increase-quantity");
		await act(async () => {
			increaseQuantityButton.click();
		});

		// Select size
		const sizePickerButton = screen.getByTestId("mock-size-picker-button");
		await act(async () => {
			sizePickerButton.click();
		});

		const addToCartButton = screen.getByTestId("add-to-cart");
		await act(async () => {
			addToCartButton.click();
		});

		await waitFor(() => {
			expect(mockAddItem).toHaveBeenCalledWith({
				productId: mockProducts[0].id,
				price: mockProducts[0].price,
				quantity: 2,
				sizeId: 1,
			});
			expect(mocksetProductPreviewModalOpen).toHaveBeenCalledWith(false);
			expect(mockSetCartProduct).toHaveBeenCalledWith(mockProducts[0], {
				id: 1,
				name: "Small",
			});
			expect(mockSetProductAddedModalOpen).toHaveBeenCalledWith(true);
		});
	});

	it("handles clicking on the product image", async () => {
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
				screen.getByTestId("product-preview-image"),
			).toBeInTheDocument();
		});

		await act(async () => {
			fireEvent.click(screen.getByTestId("product-preview-image"));
		});

		await waitFor(() => {
			expect(mocksetProductPreviewModalOpen).toHaveBeenCalledWith(false);
		});
	});
});
