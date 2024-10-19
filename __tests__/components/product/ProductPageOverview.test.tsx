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
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { useModalsStore } from "@/lib/stores/modals-store";
import { useCartStore } from "@/lib/stores/cart-store";
// Functions
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
import { fetchAllCategories } from "@/lib/functions/category-fetcher";
import { createOrder } from "@/lib/models/orders";
// Components
import ProductPageOverview from "@/components/product/ProductPageOverview";
// Mocks
import mockProducts from "@/__mocks__/products/products.mock";
import mockCategories from "@/__mocks__/categories/categories.mock";

jest.mock("@/lib/stores/wishlist-store", () => ({
	useWishlistStore: jest.fn(),
	updateWishlistStore: jest.fn(),
}));

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

jest.mock("@/lib/stores/cart-store", () => ({
	useCartStore: jest.fn(),
}));

const mockWishlistStore = useWishlistStore as unknown as jest.Mock;
const mockModalsStore = useModalsStore as unknown as jest.Mock;
const mockCartStore = useCartStore as unknown as jest.Mock;

jest.mock("@/lib/functions/product-fetcher", () => ({
	fetchProductImage: jest.fn(),
	fetchProductById: jest.fn(),
}));

jest.mock("@/lib/functions/category-fetcher", () => ({
	fetchAllCategories: jest.fn(),
}));

jest.mock("@/lib/models/orders", () => ({
	createOrder: jest.fn(),
}));

jest.mock("@/lib/config/firebase", () => ({
	auth: {
		currentUser: {
			email: "test@example.com",
		},
	},
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

jest.mock("@/lib/hooks/use-hydration", () => ({
	__esModule: true,
	default: jest.fn(),
}));

jest.mock("@/components/product/ProductPageDescription", () => ({
	__esModule: true,
	default: () => <div>Product Description</div>,
}));

jest.mock("@/components/product/ProductPageAdditional", () => ({
	__esModule: true,
	default: () => <div>Product Additional Info</div>,
}));

jest.mock("@/components/product/ProductPageReviews", () => ({
	__esModule: true,
	default: () => <div>Product Reviews</div>,
}));

jest.mock("@/components/product/ProductPageReviews", () => ({
	__esModule: true,
	default: () => <div>Product Reviews</div>,
}));

jest.mock("@/components/product/RelatedProducts", () => ({
	__esModule: true,
	default: () => <div>Related Products</div>,
}));

jest.mock("@/components/common/SizePicker", () => ({
	__esModule: true,
	default: ({ selectedSize, setSelectedSize }: any) => (
		<div>
			{selectedSize && <p>{selectedSize.name}</p>}
			<button
				onClick={() => setSelectedSize({ id: 1, name: "S" })}
				type="button"
			>
				Select Small
			</button>
			<button
				onClick={() => setSelectedSize({ id: 2, name: "M" })}
				type="button"
			>
				Select Medium
			</button>
		</div>
	),
}));

describe("ProductPageOverview Component", () => {
	// Mock functions and stores
	const mockWishlistItems = [{ productId: 1 }];
	const mockAddWishlistItem = jest.fn();
	const mockRemoveWishlistItem = jest.fn();
	const mockSetSizeGuideModalOpen = jest.fn();
	const mockSetDeliveryInfoModalOpen = jest.fn();
	const mockSetAskQuestionModalOpen = jest.fn();
	const mockAddItem = jest.fn();
	const mockSetProductAddedModalOpen = jest.fn();
	const mockSetCartProduct = jest.fn();
	const mockSetProductImageModalUrl = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				setSizeGuideModalOpen: mockSetSizeGuideModalOpen,
				setDeliveryInfoModalOpen: mockSetDeliveryInfoModalOpen,
				setAskQuestionModalOpen: mockSetAskQuestionModalOpen,
				setProductAddedModalOpen: mockSetProductAddedModalOpen,
				setCartProduct: mockSetCartProduct,
				setProductImageModalUrl: mockSetProductImageModalUrl,
			});
		});

		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				addItem: mockAddItem,
			});
		});

		(fetchProductById as jest.Mock).mockImplementation(
			async (productId: number) => {
				return mockProducts.find((product) => product.id === productId);
			},
		);

		(fetchProductImage as jest.Mock).mockImplementation(async () => {
			return "/images/test-product.jpg";
		});

		(fetchAllCategories as jest.Mock).mockImplementation(
			async (setCategoriesList: Function) => {
				setCategoriesList(mockCategories);
			},
		);

		(createOrder as jest.Mock).mockImplementation(async () => {
			return { success: true, orderId: "order123" };
		});
	});

	const renderComponent = (
		productId: number = 1,
		hydrated: boolean = true,
	) => {
		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(hydrated);

		return render(<ProductPageOverview productId={productId} />);
	};

	it("renders loading state initially", () => {
		(fetchProductById as jest.Mock).mockImplementation(
			() => new Promise(() => {}),
		);

		renderComponent(1, false);

		expect(screen.getByTestId("StyledLoading")).toBeInTheDocument();
	});

	it("renders product information after data is fetched", async () => {
		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: mockWishlistItems,
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});
		renderComponent();

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
			expect(
				screen.getByText(`$${mockProducts[0].price}.00`),
			).toBeInTheDocument();

			expect(
				screen.getByText(`$${mockProducts[0].previousPrice}.00`),
			).toBeInTheDocument();

			expect(screen.getByText(mockProducts[0].perex)).toBeInTheDocument();

			expect(screen.getByText(mockProducts[0].perex)).toBeInTheDocument();

			expect(screen.getByText("Categories:")).toBeInTheDocument();
			expect(
				screen.getByText(
					mockCategories.filter(
						(c) => c.id === mockProducts[0].categories[0],
					)[0].name,
				),
			).toBeInTheDocument();
			expect(
				screen.getByText(
					mockCategories.filter(
						(c) => c.id === mockProducts[0].categories[1],
					)[0].name,
				),
			).toBeInTheDocument();

			expect(screen.getByText("Tags:")).toBeInTheDocument();
			expect(
				screen.getByText(mockProducts[0].tags[0]),
			).toBeInTheDocument();
			expect(
				screen.getByText(mockProducts[0].tags[1]),
			).toBeInTheDocument();

			expect(screen.getByText("Select Small")).toBeInTheDocument();
			expect(screen.getByText("Select Medium")).toBeInTheDocument();

			expect(screen.getByText("Special Offer")).toBeInTheDocument();
			expect(screen.getByText("Free Shipping")).toBeInTheDocument();
			expect(screen.getByText("Free Returns")).toBeInTheDocument();
			expect(
				screen.getByText("Money Back Guarantee"),
			).toBeInTheDocument();

			expect(screen.getByTestId("Facebookicon")).toBeInTheDocument();
			expect(
				screen.getByTestId("Instagramiconfilled"),
			).toBeInTheDocument();
			expect(screen.getByTestId("LinkedInicon")).toBeInTheDocument();

			expect(screen.getByText("Related products")).toBeInTheDocument();
		});
	});

	it("handles removing items from wishlist", async () => {
		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: mockWishlistItems,
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		renderComponent();

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const removeWishlistButton = screen.getByTestId("CheckmarkRoundicon");

		act(() => {
			fireEvent.mouseEnter(removeWishlistButton);
		});

		await waitFor(() => {
			expect(
				screen.getByText("Item added to wishlist"),
			).toBeInTheDocument();
			expect(
				screen.queryByText("Item added to wishlist"),
			).not.toHaveStyle("opacity: 0");
		});

		act(() => {
			fireEvent.mouseLeave(removeWishlistButton);
		});

		await waitFor(() => {
			expect(screen.queryByText("Item added to wishlist")).toHaveStyle(
				"opacity: 0",
			);
		});

		act(() => {
			fireEvent.touchStart(removeWishlistButton);
		});

		await waitFor(() => {
			expect(
				screen.getByText("Item added to wishlist"),
			).toBeInTheDocument();
			expect(screen.queryByText("Item added to wishlist")).toHaveStyle(
				"opacity: 0",
			);
		});

		act(() => {
			fireEvent.touchEnd(removeWishlistButton);
		});

		await waitFor(() => {
			expect(screen.queryByText("Item added to wishlist")).toHaveStyle(
				"opacity: 0",
			);
		});

		act(() => {
			fireEvent.click(removeWishlistButton);
		});

		await waitFor(() => {
			expect(mockRemoveWishlistItem).toHaveBeenCalledWith({
				productId: 1,
			});
		});
	});

	it("handles adding items to wishlist", async () => {
		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		renderComponent();

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const addWishlistButton = screen.getByTestId("Hearticon");

		act(() => {
			fireEvent.mouseEnter(addWishlistButton);
		});

		await waitFor(() => {
			expect(screen.getByText("Add to wishlist")).toBeInTheDocument();
			expect(screen.getByText("Add to wishlist")).not.toHaveStyle(
				"opacity: 0",
			);
		});

		act(() => {
			fireEvent.mouseLeave(addWishlistButton);
		});

		await waitFor(() => {
			expect(screen.queryByText("Add to wishlist")).toHaveStyle(
				"opacity: 0",
			);
		});

		act(() => {
			fireEvent.touchStart(addWishlistButton);
		});

		await waitFor(() => {
			expect(screen.getByText("Add to wishlist")).toBeInTheDocument();
			expect(screen.getByText("Add to wishlist")).toHaveStyle(
				"opacity: 0",
			);
		});

		act(() => {
			fireEvent.touchEnd(addWishlistButton);
		});

		await waitFor(() => {
			expect(screen.queryByText("Add to wishlist")).toHaveStyle(
				"opacity: 0",
			);
		});

		act(() => {
			fireEvent.click(addWishlistButton);
		});

		await waitFor(() => {
			expect(mockAddWishlistItem).toHaveBeenCalledWith({
				productId: 1,
			});
		});
	});

	it("handles size selection and quantity adjustments", async () => {
		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		renderComponent();

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		// Initially, quantity is 1 and no size selected
		expect(screen.getByText("1")).toBeInTheDocument();

		const addButton = screen.getAllByText("+")[0];
		const subtractButton = screen.getAllByText("-")[0];

		// Click add quantity
		fireEvent.click(addButton);
		expect(screen.getByText("2")).toBeInTheDocument();

		// Click subtract quantity
		fireEvent.click(subtractButton);
		expect(screen.getByText("1")).toBeInTheDocument();

		// Click subtract again (should be disabled)
		fireEvent.click(subtractButton);
		expect(screen.getByText("1")).toBeInTheDocument(); // Still 1

		// // Select size
		const selectSmallButton = screen.getByText("Select Small");
		fireEvent.click(selectSmallButton);

		// After selecting size, "Add to cart" and "Buy it now" buttons should be enabled
		const addToCartButton = screen.getByRole("button", {
			name: /add to cart/i,
		});
		const buyItNowButton = screen.getByRole("button", {
			name: /buy it now/i,
		});

		expect(addToCartButton).toBeEnabled();
		expect(buyItNowButton).toBeEnabled();

		// Click "Add to cart"
		fireEvent.click(addToCartButton);
		expect(mockAddItem).toHaveBeenCalledWith({
			productId: 1,
			price: mockProducts[0].price,
			quantity: 1,
			sizeId: 1,
		});

		expect(mockSetCartProduct).toHaveBeenCalledWith(
			expect.objectContaining({ id: 1, name: mockProducts[0].name }),
			{ id: 1, name: "S" },
		);

		expect(mockSetProductAddedModalOpen).toHaveBeenCalledWith(true);
	});

	it("handles opening of size guide modal when button is clicked", async () => {
		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		renderComponent();

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const sizeGuideButton = screen.getByText("Size Guide");

		fireEvent.click(sizeGuideButton);

		expect(mockSetSizeGuideModalOpen).toHaveBeenCalledWith(true);
	});

	it("handles opening of delivery info modal when button is clicked", async () => {
		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		renderComponent();

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const deliveryButton = screen.getByText("Delivery & Return");

		fireEvent.click(deliveryButton);

		expect(mockSetDeliveryInfoModalOpen).toHaveBeenCalledWith(true);
	});

	it("handles opening of ask question modal when button is clicked", async () => {
		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		renderComponent();

		await waitFor(() => {
			expect(screen.getAllByText(mockProducts[0].name)).toHaveLength(2);
		});

		const askQuestionButton = screen.getByText("Ask a Question");

		fireEvent.click(askQuestionButton);

		expect(mockSetAskQuestionModalOpen).toHaveBeenCalledWith(true);
	});

	it("handles error when fetching product data fails", async () => {
		(fetchProductById as jest.Mock).mockImplementation(
			() =>
				new Promise(() => {
					throw new Error("Error fetching product");
				}),
		);

		// spy on console error
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();

		renderComponent();

		await waitFor(() => {
			expect(fetchProductById).toHaveBeenCalled();
		});

		expect(consoleSpy).toHaveBeenCalled();

		consoleSpy.mockRestore();
	});

	// it('handles "Buy it now" functionality', async () => {
	// 	// Mock window.location.href
	// 	delete (window as any).location;
	// 	(window as any).location = { href: "" };

	// 	renderComponent();

	// 	// Wait for product to be rendered
	// 	await waitFor(() => {
	// 		expect(screen.getByText("Test Product")).toBeInTheDocument();
	// 	});

	// 	// Select size
	// 	const selectSmallButton = screen.getByText("Select Small");
	// 	fireEvent.click(selectSmallButton);

	// 	// Set quantity to 2
	// 	const addButton = screen.getAllByText("+")[0];
	// 	fireEvent.click(addButton);
	// 	expect(screen.getByText("2")).toBeInTheDocument();

	// 	const buyItNowButton = screen.getByRole("button", {
	// 		name: /buy it now/i,
	// 	});
	// 	fireEvent.click(buyItNowButton);

	// 	// Wait for order creation and redirect
	// 	await waitFor(() => {
	// 		expect(createOrder).toHaveBeenCalledWith({
	// 			id: "order123",
	// 			email: "test@example.com",
	// 			items: [
	// 				{
	// 					productId: 1,
	// 					sizeId: "size1",
	// 					price: 100.0,
	// 					quantity: 2,
	// 				},
	// 			],
	// 			createdAt: expect.any(Date),
	// 			status: "pending",
	// 			paid: false,
	// 		});
	// 	});

	// 	// Check fetch was called to create checkout session
	// 	expect(global.fetch).toHaveBeenCalledWith("/api/checkout-session", {
	// 		method: "POST",
	// 		body: JSON.stringify({
	// 			lineItems: [
	// 				{
	// 					price_data: {
	// 						currency: "usd",
	// 						product_data: {
	// 							name: "Test Product Size:Small",
	// 						},
	// 						unit_amount: 10000, // 100 * 100
	// 					},
	// 					quantity: 2,
	// 				},
	// 			],
	// 			orderId: "order123",
	// 			email: "test@example.com",
	// 		}),
	// 	});

	// 	// Mock fetch response
	// 	(global.fetch as jest.Mock).mockResolvedValueOnce({
	// 		json: jest.fn().mockResolvedValue({
	// 			sessionUrl: "https://checkout.stripe.com/pay/session123",
	// 		}),
	// 	});

	// 	// Wait for window.location.href to be set
	// 	await waitFor(() => {
	// 		expect(window.location.href).toBe(
	// 			"https://checkout.stripe.com/pay/session123",
	// 		);
	// 	});
	// });

	it('handles "Add to cart" button disabled when no size is selected', async () => {
		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		renderComponent();

		await waitFor(() => {
			expect(fetchProductById).toHaveBeenCalled();
		});

		const addToCartButton = screen.getByRole("button", {
			name: /add to cart/i,
		});
		const buyItNowButton = screen.getByRole("button", {
			name: /buy it now/i,
		});

		expect(addToCartButton).toBeDisabled();
		expect(buyItNowButton).toBeDisabled();

		const selectSmallButton = screen.getByText("Select Small");
		fireEvent.click(selectSmallButton);

		expect(addToCartButton).toBeEnabled();
		expect(buyItNowButton).toBeEnabled();
	});
});
