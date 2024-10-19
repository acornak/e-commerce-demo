import React from "react";
// Testing
import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from "@testing-library/react";
// Stores
import { useCartStore } from "@/lib/stores/cart-store";
// Functions
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
import { fetchAllSizes } from "@/lib/functions/size-fetcher";
import { handleCheckout } from "@/lib/functions/checkout";
import { auth } from "@/lib/config/firebase";
// Components
import CartTable from "@/components/product/CartTable";
// Types and constants
import { CartItem } from "@/lib/config/types";
// Mocks
import mockSizes from "@/__mocks__/sizes/sizes.mock";
import mockProducts from "@/__mocks__/products/products.mock";

// Mock dependencies
jest.mock("@/lib/stores/cart-store");
jest.mock("@/lib/functions/product-fetcher");
jest.mock("@/lib/functions/size-fetcher", () => ({
	fetchAllSizes: jest.fn(),
}));
jest.mock("@/lib/functions/checkout");

jest.mock("@/lib/config/firebase", () => ({
	auth: {},
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

jest.mock("next/link", () => {
	return ({ children }: { children: React.ReactNode }) => children;
});

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

jest.mock("@/lib/stores/cart-store", () => ({
	useCartStore: jest.fn(),
}));

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

const mockCartStore = useCartStore as unknown as jest.Mock;

jest.mock("@/lib/hooks/use-hydration", () => ({
	__esModule: true,
	default: jest.fn(),
}));

describe("CartTable Component", () => {
	const mockRemoveItem = jest.fn();
	const mockAddQuantity = jest.fn();
	const mockRemoveQuantity = jest.fn();
	const mockClearCart = jest.fn();

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

	beforeEach(() => {
		jest.clearAllMocks();

		window.addEventListener = jest.fn();
		window.removeEventListener = jest.fn();
		document.addEventListener = jest.fn();
		document.removeEventListener = jest.fn();
	});

	it("renders loading state when not hydrated", () => {
		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(false);

		render(<CartTable />);

		expect(screen.getByTestId("StyledLoading")).toBeInTheDocument();
	});

	it('renders empty cart message and "Start shopping" button when cart is empty', () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		render(<CartTable />);

		expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Start shopping/i }),
		).toBeInTheDocument();
	});

	it("renders cart items correctly in mobile view", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.queryAllByText(mockProducts[0].name)).toHaveLength(2);
			expect(screen.queryAllByText(mockProducts[1].name)).toHaveLength(2);
		});

		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(4);
		expect(images[0]).toHaveAttribute("src", "/images/product1.jpg");
		expect(images[1]).toHaveAttribute("src", "/images/product2.jpg");

		const minusButtons = screen.getAllByText("-");
		const plusButtons = screen.getAllByText("+");
		expect(minusButtons).toHaveLength(4);
		expect(plusButtons).toHaveLength(4);

		const removeButtons = screen.getAllByLabelText("Remove item");
		expect(removeButtons).toHaveLength(4);
	});

	it("handles error fetching product image", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);

		(fetchProductImage as jest.Mock).mockRejectedValue(
			"Error fetching image",
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.queryAllByText(mockProducts[0].name)).toHaveLength(1);
			expect(screen.queryAllByText(mockProducts[1].name)).toHaveLength(1);
		});

		const images = screen.queryAllByRole("img");

		expect(images).toHaveLength(0);
	});

	it("handles error when fetching all sizes", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockRejectedValue("Error fetching sizes");
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.queryAllByText(mockProducts[0].name)).toHaveLength(1);
			expect(screen.queryAllByText(mockProducts[1].name)).toHaveLength(1);
		});

		const images = screen.queryAllByRole("img");

		expect(images).toHaveLength(0);
	});

	it("handles quantity increment - mobile", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const incrementButton = screen.getByTestId(
			"mobile-increase-quantity-1-1",
		);

		act(() => {
			fireEvent.click(incrementButton);
		});

		await waitFor(() => {
			expect(mockAddQuantity).toHaveBeenCalledWith(1, 1);
		});
	});

	it("handles quantity increment when 10 prods - mobile", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: [
					{
						productId: 3,
						sizeId: 3,
						price: 200,
						quantity: 10,
					},
				],
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[2].name)).toHaveLength(2);
		});

		const incrementButton = screen.getByTestId(
			"mobile-increase-quantity-3-3",
		);

		act(() => {
			fireEvent.click(incrementButton);
		});

		await waitFor(() => {
			expect(mockAddQuantity).not.toHaveBeenCalled();
		});
	});

	it("handles quantity decrement - mobile", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const decrementButton = screen.getByTestId(
			"mobile-decrease-quantity-2-2",
		);

		act(() => {
			fireEvent.click(decrementButton);
		});

		await waitFor(() => {
			expect(mockRemoveQuantity).toHaveBeenCalledWith(2, 2);
		});
	});

	it("handles quantity decrement when only 1 prod - mobile", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const decrementButton = screen.getByTestId(
			"mobile-decrease-quantity-1-1",
		);

		act(() => {
			fireEvent.click(decrementButton);
		});

		await waitFor(() => {
			expect(mockRemoveQuantity).not.toHaveBeenCalled();
		});
	});

	it("handles remove item from the cart - mobile", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const removeButton = screen.getByTestId("mobile-remove-item-1-1");

		act(() => {
			fireEvent.click(removeButton);
		});

		await waitFor(() => {
			expect(mockRemoveItem).toHaveBeenCalledWith(mockCartItems[0]);
		});
	});

	it("handles quantity increment - desktop", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const incrementButton = screen.getByTestId("increase-quantity-1-1");

		act(() => {
			fireEvent.click(incrementButton);
		});

		await waitFor(() => {
			expect(mockAddQuantity).toHaveBeenCalledWith(1, 1);
		});
	});

	it("handles quantity increment when 10 prods - desktop", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: [
					{
						productId: 3,
						sizeId: 3,
						price: 200,
						quantity: 10,
					},
				],
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[2].name)).toHaveLength(2);
		});

		const incrementButton = screen.getByTestId("increase-quantity-3-3");

		act(() => {
			fireEvent.click(incrementButton);
		});

		await waitFor(() => {
			expect(mockAddQuantity).not.toHaveBeenCalled();
		});
	});

	it("handles quantity decrement - desktop", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const decrementButton = screen.getByTestId("decrease-quantity-2-2");

		act(() => {
			fireEvent.click(decrementButton);
		});

		await waitFor(() => {
			expect(mockRemoveQuantity).toHaveBeenCalledWith(2, 2);
		});
	});

	it("handles quantity decrement when only 1 prod - desktop", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const decrementButton = screen.getByTestId("decrease-quantity-1-1");

		act(() => {
			fireEvent.click(decrementButton);
		});

		await waitFor(() => {
			expect(mockRemoveQuantity).not.toHaveBeenCalled();
		});
	});

	it("handles remove item from the cart - desktop", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const removeButton = screen.getByTestId("remove-item-1-1");

		act(() => {
			fireEvent.click(removeButton);
		});

		await waitFor(() => {
			expect(mockRemoveItem).toHaveBeenCalledWith(mockCartItems[0]);
		});
	});

	it("handles checkout with unauthenticated user", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.queryAllByText(mockProducts[0].name)).toHaveLength(2);
			expect(screen.queryAllByText(mockProducts[1].name)).toHaveLength(2);
		});

		const checkoutButton = screen.getByTestId("checkout-button");

		fireEvent.click(checkoutButton);

		expect(handleCheckout).toHaveBeenCalledWith(mockCartItems, "");

		expect(mockClearCart).toHaveBeenCalled();
	});

	it("proceeds to checkout and clears the cart", async () => {
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				removeItem: mockRemoveItem,
				addQuantity: mockAddQuantity,
				removeQuantity: mockRemoveQuantity,
				clearCart: mockClearCart,
			});
		});

		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve(`/images/product${productId}.jpg`),
		);

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		(auth as any).currentUser = {
			email: "me@example.com",
		};

		render(<CartTable />);

		await waitFor(() => {
			expect(screen.queryAllByText(mockProducts[0].name)).toHaveLength(2);
			expect(screen.queryAllByText(mockProducts[1].name)).toHaveLength(2);
		});

		const checkoutButton = screen.getByTestId("checkout-button");

		fireEvent.click(checkoutButton);

		expect(handleCheckout).toHaveBeenCalledWith(
			mockCartItems,
			"me@example.com",
		);

		expect(mockClearCart).toHaveBeenCalled();
	});
});
