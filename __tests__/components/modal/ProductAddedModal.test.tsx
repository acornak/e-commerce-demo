import ProductAddedModal from "@/components/modal/ProductAddedModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useModalsStore } from "@/lib/stores/modals-store";
import { useCartStore } from "@/lib/stores/cart-store";
import { fetchProductImage } from "@/lib/functions/product-fetcher";
import {
	getCartItemQty,
	totalCartItemPrice,
	totalCartPrice,
} from "@/lib/functions/cart-helpers";
import { CartItem } from "@/lib/config/types";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";

jest.mock("next/image", () => ({
	__esModule: true,
	// eslint-disable-next-line react/jsx-props-no-spreading
	default: (props: any) => <img {...props} />,
}));

jest.mock("firebase/firestore", () => ({
	...jest.requireActual("firebase/firestore"),
	collection: jest.fn().mockReturnValue({
		// Return a mock CollectionReference or DocumentReference if needed
	}),
	doc: jest.fn().mockReturnValue({
		// Mock DocumentReference if needed
	}),
	getDocs: jest.fn(),
	setDoc: jest.fn(),
	updateDoc: jest.fn(),
	deleteDoc: jest.fn(),
}));

jest.mock("next/navigation", () => {
	// eslint-disable-next-line global-require
	const { useRouter } = require("next-router-mock");
	return { useRouter };
});

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

jest.mock("@/lib/stores/cart-store", () => ({
	useCartStore: jest.fn(),
}));

jest.mock("@/lib/functions/product-fetcher", () => ({
	fetchProductImage: jest.fn(),
}));

jest.mock("@/lib/functions/cart-helpers", () => ({
	getCartItemQty: jest.fn(),
	totalCartItemPrice: jest.fn(),
	totalCartPrice: jest.fn(),
}));

jest.mock("@/lib/functions/checkout", () => ({
	handleCheckout: jest.fn(),
}));

jest.mock("@/lib/config/firebase", () => ({
	auth: {},
	db: {},
}));

describe("ProductAddedModal", () => {
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

	const mockCartProduct = {
		selectedSize: { id: 1, name: "M" },
		id: 1,
		name: "Product 1",
		slug: "product-1",
		price: 100,
		brandId: 1,
		perex: "Product 1 perex",
		sizeIds: [1, 2, 3],
		categories: [1, 2],
		tags: ["tag1", "tag2"],
	};

	beforeAll(() => {
		jest.clearAllMocks();
	});

	it("renders product added modal without crashing", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				productAddedModalOpen: true,
				setProductAddedModalOpen: jest.fn(),
				cartProduct: mockCartProduct,
			});
		});

		const mockCartStore = useCartStore as unknown as jest.Mock;
		mockCartStore.mockImplementation((fn: any) => {
			return fn({
				items: mockCartItems,
				clearCart: jest.fn(),
			});
		});

		const mockTotalCartItemPrice = totalCartItemPrice as jest.Mock;
		mockTotalCartItemPrice.mockReturnValue(100);

		const mockTotalCartPrice = totalCartPrice as jest.Mock;
		mockTotalCartPrice.mockReturnValue(100);

		const mockGetCartItemQty = getCartItemQty as jest.Mock;
		mockGetCartItemQty.mockReturnValue(1);

		const mockFetchProductImage = fetchProductImage as jest.Mock;
		mockFetchProductImage.mockImplementation(
			(id: number, callback: (url: string) => void) => {
				callback("product-image-url");
			},
		);

		render(<ProductAddedModal />);

		await waitFor(() => {
			const modal = screen.getByTestId("product-added-modal");

			expect(modal).toBeInTheDocument();

			// TODO
			const productImage = screen.getByTestId(
				"product-added-modal-image",
			);
			expect(productImage).toBeInTheDocument();

			const productName = screen.getByTestId("product-added-modal-name");
			expect(productName).toBeInTheDocument();
			expect(productName).toHaveTextContent("Product 1");

			const productPrice = screen.getByTestId(
				"product-added-modal-price",
			);
			expect(productPrice).toBeInTheDocument();
			expect(productPrice).toHaveTextContent("100");

			const productSize = screen.getByTestId("product-added-modal-size");
			expect(productSize).toBeInTheDocument();
			expect(productSize).toHaveTextContent("M");

			const productQty = screen.getByTestId("product-added-modal-qty");
			expect(productQty).toBeInTheDocument();
			expect(productQty).toHaveTextContent("1");

			const productTotalPrice = screen.getByTestId(
				"product-added-modal-total",
			);
			expect(productTotalPrice).toBeInTheDocument();

			const checkoutButton = screen.getByTestId(
				"product-added-modal-checkout",
			);
			expect(checkoutButton).toBeInTheDocument();

			const continueShoppingButton = screen.getByTestId(
				"product-added-modal-continue",
			);
			expect(continueShoppingButton).toBeInTheDocument();

			// Validate fetchProductImage call
			expect(mockFetchProductImage).toHaveBeenCalledTimes(1);
			expect(mockFetchProductImage).toHaveBeenCalledWith(
				mockCartProduct.id,
				expect.any(Function),
			);

			// Validate mock function behavior
			const setImageUrlCallback = mockFetchProductImage.mock.calls[0][1];
			expect(setImageUrlCallback).toBeInstanceOf(Function);
			expect(() =>
				setImageUrlCallback("product-image-url"),
			).not.toThrow();

			expect(mockGetCartItemQty).toHaveBeenCalled();
			expect(mockGetCartItemQty).toHaveBeenCalledWith(
				mockCartItems,
				1,
				1,
			);

			// TODO: check why is it called 3 times
			expect(mockTotalCartItemPrice).toHaveBeenCalled();
			expect(mockTotalCartItemPrice).toHaveBeenCalledWith(
				mockCartItems,
				mockCartProduct,
				1,
			);

			expect(mockTotalCartPrice).toHaveBeenCalled();
			expect(mockTotalCartPrice).toHaveBeenCalledWith(mockCartItems);
		});
	});

	it("does not render product added modal when isOpen is false", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				productAddedModalOpen: false,
				setProductAddedModalOpen: jest.fn(),
			});
		});

		render(<ProductAddedModal />);

		expect(
			screen.queryByTestId("product-added-modal"),
		).not.toBeInTheDocument();
	});

	it("closes the modal when the close button is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetProductAddedModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				productAddedModalOpen: true,
				setProductAddedModalOpen: mockSetProductAddedModalOpen,
				cartProduct: mockCartProduct,
			});
		});

		render(<ProductAddedModal />);

		const closeButton = screen.getByTestId("product-added-modal-close");
		expect(closeButton).toBeInTheDocument();

		await act(async () => {
			closeButton.click();
		});

		await waitFor(() => {
			expect(mockSetProductAddedModalOpen).toHaveBeenCalledTimes(1);
			expect(mockSetProductAddedModalOpen).toHaveBeenCalledWith(false);
		});
	});

	it("closes the modal when the background is clicked", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetProductAddedModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				productAddedModalOpen: true,
				setProductAddedModalOpen: mockSetProductAddedModalOpen,
				cartProduct: mockCartProduct,
			});
		});

		render(<ProductAddedModal />);

		await act(async () => {
			fireEvent.mouseDown(document.body);
		});

		await waitFor(() => {
			expect(mockSetProductAddedModalOpen).toHaveBeenCalledTimes(1);
			expect(mockSetProductAddedModalOpen).toHaveBeenCalledWith(false);
		});
	});

	it("handles continue shopping button click", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetProductAddedModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				productAddedModalOpen: true,
				setProductAddedModalOpen: mockSetProductAddedModalOpen,
				cartProduct: mockCartProduct,
			});
		});

		render(<ProductAddedModal />);

		const continueShoppingButton = screen.getByTestId(
			"product-added-modal-continue",
		);

		await act(async () => {
			continueShoppingButton.click();
		});

		await waitFor(() => {
			expect(mockSetProductAddedModalOpen).toHaveBeenCalledTimes(1);
			expect(mockSetProductAddedModalOpen).toHaveBeenCalledWith(false);
		});
	});

	it("handles router push on checkout button click", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetProductAddedModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				productAddedModalOpen: true,
				setProductAddedModalOpen: mockSetProductAddedModalOpen,
				cartProduct: mockCartProduct,
			});
		});

		mockRouter.push("/");

		render(<ProductAddedModal />);

		const checkoutButton = screen.getByTestId("product-added-modal-cart");

		await act(async () => {
			checkoutButton.click();
		});

		await waitFor(() => {
			expect(mockRouter).toMatchObject({
				asPath: "/cart",
				pathname: "/cart",
				query: {},
			});
		});
	});

	it("handles checkout button click", async () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		const mockSetProductAddedModalOpen = jest.fn();
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				productAddedModalOpen: true,
				setProductAddedModalOpen: mockSetProductAddedModalOpen,
				cartProduct: mockCartProduct,
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

		render(<ProductAddedModal />);

		const checkoutButton = screen.getByTestId(
			"product-added-modal-checkout",
		);

		await act(async () => {
			checkoutButton.click();
		});

		await waitFor(() => {
			// TODO
			// expect(mockHandleCheckout).toHaveBeenCalledTimes(1);
			// expect(mockHandleCheckout).toHaveBeenCalledWith(mockCartItems);

			expect(mockSetProductAddedModalOpen).toHaveBeenCalledTimes(1);
			expect(mockSetProductAddedModalOpen).toHaveBeenCalledWith(false);

			expect(mockClearCart).toHaveBeenCalledTimes(1);
		});
	});
});
