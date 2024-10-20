import React from "react";
// Testing
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// Stores
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { useModalsStore } from "@/lib/stores/modals-store";
// Functions
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
// Components
import WishlistTable from "@/components/product/WishlistTable";
// Mocks
import mockProducts from "@/__mocks__/products/products.mock";

jest.mock("next/link", () => {
	return ({ children }: { children: React.ReactNode }) => children;
});

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

jest.mock("@/lib/hooks/use-hydration", () => ({
	__esModule: true,
	default: jest.fn(),
}));

jest.mock("@/lib/stores/wishlist-store", () => ({
	useWishlistStore: jest.fn(),
	updateWishlistStore: jest.fn(),
}));

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

const mockWishlistStore = useWishlistStore as unknown as jest.Mock;
const mockModalStore = useModalsStore as unknown as jest.Mock;

jest.mock("@/lib/functions/product-fetcher", () => ({
	fetchProductImage: jest.fn(),
	fetchProductById: jest.fn(),
}));

describe("WishlistTable Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the wishlist with items", async () => {
		const mockItems = [{ productId: 1 }, { productId: 2 }];
		const mockImages = ["/path/to/image1.jpg", "/path/to/image2.jpg"];

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: mockItems,
				removeItem: jest.fn(),
			});
		});

		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockImages[productId - 1]),
		);

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		render(<WishlistTable />);

		await waitFor(() => {
			expect(fetchProductById).toHaveBeenCalledTimes(2);
			expect(fetchProductImage).toHaveBeenCalledTimes(2);
		});

		expect(
			await screen.getByText(mockProducts[0].name),
		).toBeInTheDocument();
		expect(
			await screen.getByText(mockProducts[1].name),
		).toBeInTheDocument();
		expect(
			screen.getByText(`$${mockProducts[0].price}.00`),
		).toBeInTheDocument();
		expect(
			screen.getByText(`$${mockProducts[1].price}.00`),
		).toBeInTheDocument();

		expect(screen.getByAltText(mockProducts[0].name)).toHaveAttribute(
			"src",
			"/path/to/image1.jpg",
		);
		expect(screen.getByAltText(mockProducts[1].name)).toHaveAttribute(
			"src",
			"/path/to/image2.jpg",
		);

		expect(screen.getAllByText("Add to cart")).toHaveLength(2);

		expect(screen.getAllByTestId("Trashicon")).toHaveLength(2);
	});

	it("console logs error when fetching product failed", async () => {
		const mockItems = [{ productId: 1 }, { productId: 2 }];

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: mockItems,
				removeItem: jest.fn(),
			});
		});

		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) => Promise.resolve(mockProducts[productId - 1]),
		);
		(fetchProductImage as jest.Mock).mockRejectedValue(
			"Error fetching image",
		);

		const consoleErrorMock = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		render(<WishlistTable />);

		await waitFor(() => {
			expect(fetchProductById).toHaveBeenCalledTimes(2);
			expect(fetchProductImage).toHaveBeenCalledTimes(2);
		});

		expect(consoleErrorMock).toHaveBeenCalledTimes(2);

		expect(
			await screen.queryByText(mockProducts[0].name),
		).not.toBeInTheDocument();
		expect(
			await screen.queryByText(mockProducts[1].name),
		).not.toBeInTheDocument();
	});

	it("renders the empty state when wishlist is empty", () => {
		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				removeItem: jest.fn(),
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		render(<WishlistTable />);

		expect(
			screen.getByText(
				"Looks like you haven't added any items to your Wishlist.",
			),
		).toBeInTheDocument();

		expect(screen.getByText("Start shopping")).toBeInTheDocument();
	});

	it("removes an item from the wishlist when trash icon is clicked", async () => {
		const mockRemoveItem = jest.fn();
		const mockItems = [{ productId: 1 }];

		const mockImage = "/path/to/image1.jpg";

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: mockItems,
				removeItem: mockRemoveItem,
			});
		});

		(fetchProductById as jest.Mock).mockResolvedValue(mockProducts[0]);
		(fetchProductImage as jest.Mock).mockResolvedValue(mockImage);

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		render(<WishlistTable />);

		await waitFor(() => {
			expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
		});

		const trashButton = screen.getByTestId("Trashicon").closest("button");
		fireEvent.click(trashButton!);

		expect(mockRemoveItem).toHaveBeenCalledWith({ productId: 1 });
	});

	it('opens product preview modal when "Add to cart" is clicked', async () => {
		const mockItems = [{ productId: 1 }];

		const mockImage = "/path/to/image1.jpg";

		const setProductPreviewModalOpenMock = jest.fn();
		const setPreviewProductIdMock = jest.fn();

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: mockItems,
				removeItem: jest.fn(),
			});
		});

		(fetchProductById as jest.Mock).mockResolvedValue(mockProducts[0]);
		(fetchProductImage as jest.Mock).mockResolvedValue(mockImage);

		mockModalStore.mockImplementation((fn: any) => {
			return fn({
				setProductPreviewModalOpen: setProductPreviewModalOpenMock,
				setPreviewProductId: setPreviewProductIdMock,
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(true);

		render(<WishlistTable />);

		await waitFor(() => {
			expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
		});

		const addToCartButton = screen.getByText("Add to cart");
		fireEvent.click(addToCartButton);

		expect(setProductPreviewModalOpenMock).toHaveBeenCalledWith(true);
		expect(setPreviewProductIdMock).toHaveBeenCalledWith(1);
	});

	it("displays loading spinner when data is being fetched", () => {
		const mockItems = [{ productId: 1 }];

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: mockItems,
				removeItem: jest.fn(),
			});
		});

		/* eslint-disable-next-line global-require */
		const useHydration = require("@/lib/hooks/use-hydration").default;
		useHydration.mockReturnValue(false);

		render(<WishlistTable />);

		expect(screen.getByTestId("StyledLoading")).toBeInTheDocument();
	});
});
