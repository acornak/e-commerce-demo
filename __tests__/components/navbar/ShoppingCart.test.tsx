import ShoppingCart from "@/components/navbar/ShoppingCart";
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
import { useCartStore } from "@/lib/stores/cart-store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useModalsStore } from "@/lib/stores/modals-store";
import { CartItem, Size } from "@/lib/config/types";
import { fetchAllSizes } from "@/lib/functions/size-fetcher";
import mockProducts from "@/__mocks__/products/products.mock";
import { handleCheckout } from "@/lib/functions/checkout";
import { auth } from "@/lib/config/firebase";
import { getCartItemSize } from "@/lib/functions/cart-helpers";

jest.mock("@/lib/functions/product-fetcher", () => ({
	fetchProductById: jest.fn(),
	fetchProductImage: jest.fn(),
}));

jest.mock("@/lib/functions/cart-helpers", () => ({
	getCartItemSize: jest.fn(),
}));

jest.mock("@/lib/functions/size-fetcher", () => ({
	fetchAllSizes: jest.fn(),
}));

jest.mock("@/lib/stores/cart-store", () => ({
	useCartStore: jest.fn(),
	updateCartStore: jest.fn(),
}));

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

jest.mock("@/components/icon/Close", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-close-icon" />,
}));

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

jest.mock("@/lib/functions/checkout", () => ({
	handleCheckout: jest.fn(),
}));

jest.mock("@/lib/config/firebase", () => ({
	auth: {},
	db: {},
}));

jest.mock("firebase/firestore", () => ({
	...jest.requireActual("firebase/firestore"),
	collection: jest.fn().mockReturnValue({}),
	doc: jest.fn().mockReturnValue({}),
	getDocs: jest.fn(),
	setDoc: jest.fn(),
	updateDoc: jest.fn(),
	deleteDoc: jest.fn(),
}));

describe("ShoppingCart", () => {
	const mockCartItems: CartItem[] = [
		{
			productId: 1,
			sizeId: 1,
			price: 100,
			quantity: 1,
		},
		{
			productId: 2,
			sizeId: 2,
			price: 200,
			quantity: 2,
		},
	];

	const mockSizes: Size[] = [
		{
			id: 1,
			name: "M",
		},
		{
			id: 2,
			name: "L",
		},
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders empty cart", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				cartBarOpen: true,
				setCartBarOpen: jest.fn(),
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				clearCart: jest.fn(),
			});
		});

		render(<ShoppingCart />);
		const emptyCart = screen.getByText("Your cart is empty");
		expect(emptyCart).toBeInTheDocument();
	});

	it("does not render shopping cart when cart is closed", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				cartBarOpen: false,
				setCartBarOpen: jest.fn(),
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				clearCart: jest.fn(),
			});
		});

		const { container } = render(<div />);
		expect(container.firstChild).toBeEmptyDOMElement();
	});

	it("closes shopping cart bar when clicking on close button", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetCartBarOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				cartBarOpen: true,
				setCartBarOpen: mockSetCartBarOpen,
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				clearCart: jest.fn(),
			});
		});

		render(<ShoppingCart />);

		await waitFor(() => {
			expect(screen.getByTestId("mock-close-icon")).toBeInTheDocument();
		});

		await act(async () => {
			fireEvent.click(screen.getByTestId("mock-close-icon"));
		});

		await waitFor(() => {
			expect(mockSetCartBarOpen).toHaveBeenCalledWith(false);
		});
	});

	it("closes shopping cart bar when clicking on View Cart", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetCartBarOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				cartBarOpen: true,
				setCartBarOpen: mockSetCartBarOpen,
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				clearCart: jest.fn(),
			});
		});

		render(<ShoppingCart />);

		await waitFor(() => {
			expect(screen.getByText("View Cart")).toBeInTheDocument();
		});

		await act(async () => {
			fireEvent.click(screen.getByText("View Cart"));
		});

		await waitFor(() => {
			expect(mockSetCartBarOpen).toHaveBeenCalledWith(false);
		});
	});

	it("renders shopping cart bar with items - error fetching sizes", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				cartBarOpen: true,
				setCartBarOpen: jest.fn(),
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				clearCart: jest.fn(),
			});
		});

		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockRejectedValue(new Error("Error fetching sizes"));

		const mockFetchProductById = fetchProductById as jest.Mock;
		mockFetchProductById.mockResolvedValue(mockProducts[0]);

		const mockFetchProductImage = fetchProductImage as jest.Mock;
		mockFetchProductImage.mockResolvedValue("test-image");

		const consoleErrorMock = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		render(<ShoppingCart />);

		await waitFor(() => {
			expect(consoleErrorMock).toHaveBeenCalledWith(
				"Fetching sizes failed:",
				new Error("Error fetching sizes"),
			);
		});
	});

	it("renders shopping cart bar with items - error fetching product", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				cartBarOpen: true,
				setCartBarOpen: jest.fn(),
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				clearCart: jest.fn(),
			});
		});

		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockResolvedValue(mockSizes);

		const mockFetchProductById = fetchProductById as jest.Mock;
		mockFetchProductById.mockRejectedValue(
			new Error("Error fetching product"),
		);

		const mockFetchProductImage = fetchProductImage as jest.Mock;
		mockFetchProductImage.mockResolvedValue("test-image");

		const consoleErrorMock = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		render(<ShoppingCart />);

		await waitFor(() => {
			expect(consoleErrorMock).toHaveBeenCalledWith(
				"Fetching product failed:",
				new Error("Error fetching product"),
			);
		});
	});

	it("renders shopping cart bar with items - error fetching image url", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				cartBarOpen: true,
				setCartBarOpen: jest.fn(),
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				clearCart: jest.fn(),
			});
		});

		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockResolvedValue(mockSizes);

		const mockFetchProductById = fetchProductById as jest.Mock;
		mockFetchProductById.mockResolvedValue(mockProducts[0]);

		const mockFetchProductImage = fetchProductImage as jest.Mock;
		mockFetchProductImage.mockRejectedValue(
			new Error("Error fetching image"),
		);

		const consoleErrorMock = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		render(<ShoppingCart />);

		await waitFor(() => {
			expect(consoleErrorMock).toHaveBeenCalledWith(
				"Fetching product failed:",
				new Error("Error fetching image"),
			);
		});
	});

	it("renders shopping cart bar with items - handles adding and removing quantities", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				cartBarOpen: true,
				setCartBarOpen: jest.fn(),
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		const mockAddQuantity = jest.fn();
		const mockRemoveQuantity = jest.fn();
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				clearCart: jest.fn(),
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
			});
		});

		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockResolvedValue(mockSizes);

		const mockFetchProductById = fetchProductById as jest.Mock;
		mockFetchProductById.mockResolvedValue(mockProducts[0]);

		const mockFetchProductImage = fetchProductImage as jest.Mock;
		mockFetchProductImage.mockResolvedValue("test-image");

		const mockGetCartItemSize = getCartItemSize as jest.Mock;
		mockGetCartItemSize.mockReturnValue(mockSizes[0]);

		render(<ShoppingCart />);

		await waitFor(() => {
			const addQuantityButton = screen.getAllByTestId(
				"add-quantity-button",
			);
			const removeQuantityButton = screen.getAllByTestId(
				"remove-quantity-button",
			);

			expect(addQuantityButton).toHaveLength(2);
			expect(removeQuantityButton).toHaveLength(2);

			// do assertion on product information
			expect(
				screen.queryAllByText("Rectangular Prescription"),
			).toHaveLength(2);

			// prices
			expect(screen.queryAllByText("$52.00 / piece")).toHaveLength(2);
			expect(screen.getByText("$52.00")).toBeInTheDocument();
			expect(screen.getByText("$104.00")).toBeInTheDocument();
			expect(screen.getByText("$500.00")).toBeInTheDocument();
		});

		await act(async () => {
			fireEvent.click(screen.getAllByTestId("add-quantity-button")[0]);
		});

		await waitFor(() => {
			expect(mockAddQuantity).toHaveBeenCalledWith(1, 1);
		});

		await act(async () => {
			fireEvent.click(screen.getAllByTestId("remove-quantity-button")[1]);
		});

		await waitFor(() => {
			expect(mockRemoveQuantity).toHaveBeenCalledWith(2, 2);
		});
	});

	it("should handle click on Remove item button", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				cartBarOpen: true,
				setCartBarOpen: jest.fn(),
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		const mockRemoveItem = jest.fn();
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
			});
		});

		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockResolvedValue(mockSizes);

		const mockFetchProductById = fetchProductById as jest.Mock;
		mockFetchProductById.mockResolvedValue(mockProducts[0]);

		const mockFetchProductImage = fetchProductImage as jest.Mock;
		mockFetchProductImage.mockResolvedValue("test-image");

		render(<ShoppingCart />);

		await waitFor(() => {
			expect(screen.queryAllByTestId("remove-item-button")).toHaveLength(
				2,
			);
		});

		await act(async () => {
			fireEvent.click(screen.queryAllByTestId("remove-item-button")[0]);
		});

		await waitFor(() => {
			expect(mockRemoveItem).toHaveBeenCalledWith(mockCartItems[0]);
		});
	});

	it("should handle click on Checkout button - anonymous user", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetCartBarOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				cartBarOpen: true,
				setCartBarOpen: mockSetCartBarOpen,
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		const mockClearCart = jest.fn();
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				clearCart: mockClearCart,
			});
		});

		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockResolvedValue(mockSizes);

		const mockFetchProductById = fetchProductById as jest.Mock;
		mockFetchProductById.mockResolvedValue(mockProducts[0]);

		const mockFetchProductImage = fetchProductImage as jest.Mock;
		mockFetchProductImage.mockResolvedValue("test-image");

		const mockHandleCheckout = handleCheckout as jest.Mock;
		mockHandleCheckout.mockImplementation(() => Promise.resolve());

		render(<ShoppingCart />);

		await waitFor(() => {
			expect(screen.getByText("Checkout")).toBeInTheDocument();
		});

		await act(async () => {
			fireEvent.click(screen.getByText("Checkout"));
		});

		await waitFor(() => {
			expect(mockSetCartBarOpen).toHaveBeenCalledWith(false);
			expect(mockClearCart).toHaveBeenCalled();
			expect(mockHandleCheckout).toHaveBeenCalledWith(mockCartItems, "");
		});
	});

	it("should handle click on Checkout button - anonymous user", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetCartBarOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				cartBarOpen: true,
				setCartBarOpen: mockSetCartBarOpen,
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		const mockClearCart = jest.fn();
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				clearCart: mockClearCart,
			});
		});

		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockResolvedValue(mockSizes);

		const mockFetchProductById = fetchProductById as jest.Mock;
		mockFetchProductById.mockResolvedValue(mockProducts[0]);

		const mockFetchProductImage = fetchProductImage as jest.Mock;
		mockFetchProductImage.mockResolvedValue("test-image");

		const mockHandleCheckout = handleCheckout as jest.Mock;
		mockHandleCheckout.mockImplementation(() => Promise.resolve());

		(auth as any).currentUser = {
			email: "me@example.com",
		};

		render(<ShoppingCart />);

		await waitFor(() => {
			expect(screen.getByText("Checkout")).toBeInTheDocument();
		});

		await act(async () => {
			fireEvent.click(screen.getByText("Checkout"));
		});

		await waitFor(() => {
			expect(mockSetCartBarOpen).toHaveBeenCalledWith(false);
			expect(mockClearCart).toHaveBeenCalled();
			expect(mockHandleCheckout).toHaveBeenCalledWith(
				mockCartItems,
				"me@example.com",
			);
		});
	});
});
