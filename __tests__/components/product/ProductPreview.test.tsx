import React from "react";
// Testing
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// Functions
import { fetchProductImage } from "@/lib/functions/product-fetcher";
// Stores
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { useModalsStore } from "@/lib/stores/modals-store";
// Components
import ProductPreview from "@/components/product/ProductPreview";
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

jest.mock("@/lib/functions/product-fetcher", () => ({
	fetchProductImage: jest.fn(),
}));

jest.mock("@/lib/stores/cart-store", () => ({
	updateCartStore: jest.fn(),
}));

jest.mock("@/lib/stores/wishlist-store", () => ({
	useWishlistStore: jest.fn(),
	updateWishlistStore: jest.fn(),
}));

const mockWishlistStore = useWishlistStore as unknown as jest.Mock;

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

const mockModalsStore = useModalsStore as unknown as jest.Mock;

jest.mock("@/components/styled/Loading", () => ({
	__esModule: true,
	default: () => <div data-testid="loading" />,
}));

jest.mock("@/components/icon/Heart", () => ({
	__esModule: true,
	default: () => <svg data-testid="heart-icon" />,
}));

jest.mock("@/components/icon/Magnifier", () => ({
	__esModule: true,
	default: () => <svg data-testid="magnifier-icon" />,
}));

jest.mock("@/components/icon/CheckmarkRound", () => ({
	__esModule: true,
	default: () => <svg data-testid="checkmark-icon" />,
}));

describe("ProductPreview Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	beforeAll(() => {
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: true,
				media: query,
				onchange: null,
				addListener: jest.fn(),
				removeListener: jest.fn(),
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});
	});

	const mockAddWishlistItem = jest.fn();
	const mockRemoveWishlistItem = jest.fn();

	it("renders product details correctly", async () => {
		(fetchProductImage as jest.Mock).mockResolvedValue("/test-image.jpg");

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		render(<ProductPreview product={mockProducts[0]} />);

		expect(screen.getByTestId("loading")).toBeInTheDocument();

		await waitFor(() => {
			expect(fetchProductImage).toHaveBeenCalledWith(mockProducts[0].id);
		});

		expect(screen.getByAltText(mockProducts[0].name)).toHaveAttribute(
			"src",
			"/test-image.jpg",
		);

		expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
		expect(
			screen.getByText(`$${mockProducts[0].price}`),
		).toBeInTheDocument();

		expect(
			screen.getByText(`$${mockProducts[0].previousPrice}`),
		).toHaveClass("line-through");
	});

	it("displays action buttons on hover", async () => {
		(fetchProductImage as jest.Mock).mockResolvedValue("/test-image.jpg");

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		render(<ProductPreview product={mockProducts[0]} />);

		await waitFor(() => {
			expect(fetchProductImage).toHaveBeenCalledWith(mockProducts[0].id);
		});

		expect(screen.queryByTestId("heart-icon")).not.toBeInTheDocument();
		expect(screen.queryByTestId("magnifier-icon")).not.toBeInTheDocument();

		fireEvent.mouseEnter(screen.getByAltText(mockProducts[0].name));

		expect(await screen.findByTestId("heart-icon")).toBeInTheDocument();
		expect(screen.getByTestId("magnifier-icon")).toBeInTheDocument();

		fireEvent.mouseLeave(screen.getByAltText(mockProducts[0].name));

		await waitFor(() => {
			expect(screen.queryByTestId("heart-icon")).not.toBeInTheDocument();
			expect(
				screen.queryByTestId("magnifier-icon"),
			).not.toBeInTheDocument();
		});
	});

	it("adds product to wishlist when heart button is clicked", async () => {
		(fetchProductImage as jest.Mock).mockResolvedValue("/test-image.jpg");

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		render(<ProductPreview product={mockProducts[0]} />);

		await waitFor(() => {
			expect(fetchProductImage).toHaveBeenCalledWith(mockProducts[0].id);
		});

		fireEvent.mouseEnter(screen.getByAltText(mockProducts[0].name));

		const heartButton = await screen.findByTestId("heart-icon");
		fireEvent.click(heartButton);

		expect(mockAddWishlistItem).toHaveBeenCalledWith({
			productId: mockProducts[0].id,
		});
	});

	it("removes product from wishlist when heart button is clicked and item is already in wishlist", async () => {
		(fetchProductImage as jest.Mock).mockResolvedValue("/test-image.jpg");

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [{ productId: mockProducts[0].id }],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		render(<ProductPreview product={mockProducts[0]} />);

		await waitFor(() => {
			expect(fetchProductImage).toHaveBeenCalledWith(mockProducts[0].id);
		});

		fireEvent.mouseEnter(screen.getByAltText(mockProducts[0].name));

		const checkmarkIcon = await screen.findByTestId("checkmark-icon");
		fireEvent.click(checkmarkIcon);

		expect(mockRemoveWishlistItem).toHaveBeenCalledWith({
			productId: mockProducts[0].id,
		});
	});

	it("opens product preview modal when magnifier button is clicked", async () => {
		(fetchProductImage as jest.Mock).mockResolvedValue("/test-image.jpg");

		const mockSetProductPreviewModalOpen = jest.fn();
		const mockSetPreviewProductId = jest.fn();

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				setProductPreviewModalOpen: mockSetProductPreviewModalOpen,
				setPreviewProductId: mockSetPreviewProductId,
			});
		});

		render(<ProductPreview product={mockProducts[0]} />);

		await waitFor(() => {
			expect(fetchProductImage).toHaveBeenCalledWith(mockProducts[0].id);
		});

		fireEvent.mouseEnter(screen.getByAltText(mockProducts[0].name));

		const magnifierButton = await screen.findByTestId("magnifier-icon");
		fireEvent.click(magnifierButton);

		expect(mockSetProductPreviewModalOpen).toHaveBeenCalledWith(true);
		expect(mockSetPreviewProductId).toHaveBeenCalledWith(
			mockProducts[0].id,
		);
	});

	it("should console write error when fetching product image fails", async () => {
		(fetchProductImage as jest.Mock).mockRejectedValue(
			"Error fetching image",
		);

		const consoleSpy = jest.spyOn(console, "error").mockImplementation();

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		render(<ProductPreview product={mockProducts[0]} />);

		await waitFor(() => {
			expect(fetchProductImage).toHaveBeenCalledWith(mockProducts[0].id);
		});

		expect(consoleSpy).toHaveBeenCalledWith(
			"Fetching product image failed:",
			"Error fetching image",
		);

		consoleSpy.mockRestore();
	});

	it("shows and hides tooltip on mouse enter and leave on the buttons", async () => {
		(fetchProductImage as jest.Mock).mockResolvedValue("/test-image.jpg");

		mockWishlistStore.mockImplementation((fn: any) => {
			return fn({
				items: [],
				addItem: mockAddWishlistItem,
				removeItem: mockRemoveWishlistItem,
			});
		});

		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				setProductPreviewModalOpen: jest.fn(),
				setPreviewProductId: jest.fn(),
			});
		});

		render(<ProductPreview product={mockProducts[0]} />);

		expect(screen.getByTestId("loading")).toBeInTheDocument();

		await waitFor(() => {
			expect(fetchProductImage).toHaveBeenCalledWith(mockProducts[0].id);
		});

		fireEvent.mouseEnter(screen.getByAltText(mockProducts[0].name));

		expect(await screen.findByTestId("heart-icon")).toBeInTheDocument();
		expect(screen.getByTestId("magnifier-icon")).toBeInTheDocument();

		fireEvent.mouseEnter(screen.getByTestId("heart-icon"));

		expect(screen.getByText("Add to wishlist")).toBeInTheDocument();

		fireEvent.mouseLeave(screen.getByTestId("heart-icon"));

		await waitFor(() => {
			expect(
				screen.queryByText("Add to wishlist"),
			).not.toBeInTheDocument();
		});
	});
});
