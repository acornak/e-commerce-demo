import React from "react";
// Testing
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
// Components
import OrdersTable from "@/components/profile/OrdersTable";
// Functions
import { totalCartPrice } from "@/lib/functions/cart-helpers";
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
import { createCheckoutItems } from "@/lib/functions/checkout";
// Types and constants
import { Order } from "@/lib/config/types";

jest.mock("next/link", () => {
	return ({ children }: { children: React.ReactNode }) => children;
});

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
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

jest.mock("@/lib/functions/product-fetcher", () => ({
	fetchProductById: jest.fn(),
	fetchProductImage: jest.fn(),
}));

jest.mock("@/lib/functions/cart-helpers", () => ({
	totalCartPrice: jest.fn(),
}));

jest.mock("@/lib/functions/checkout", () => ({
	createCheckoutItems: jest.fn(),
}));

describe("OrdersTable Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders message when there are no orders", () => {
		render(<OrdersTable orders={[]} />);

		expect(
			screen.getByText(/Looks like you haven't created any orders yet./i),
		).toBeInTheDocument();
		expect(screen.getByText(/Start shopping/i)).toBeInTheDocument();
	});

	it("renders orders correctly", async () => {
		const mockOrders: Order[] = [
			{
				id: "order1",
				email: "me@example.com",
				items: [
					{ productId: 1, quantity: 1, sizeId: 1, price: 50 },
					{ productId: 2, quantity: 2, sizeId: 1, price: 150 },
					{ productId: 3, quantity: 2, sizeId: 1, price: 150 },
					{ productId: 4, quantity: 2, sizeId: 1, price: 150 },
					{ productId: 5, quantity: 2, sizeId: 1, price: 150 },
				],
				createdAt: new Date("2023-01-01T12:00:00Z"),
				paid: true,
				status: "processing",
			},
		];

		(totalCartPrice as jest.Mock).mockReturnValue(150);
		(fetchProductById as jest.Mock).mockImplementation(
			(productId: number) =>
				Promise.resolve({
					name: `Product ${productId}`,
					slug: `product-${productId}`,
				}),
		);
		(fetchProductImage as jest.Mock).mockResolvedValue(
			"/path/to/image.jpg",
		);

		render(<OrdersTable orders={mockOrders} />);

		await waitFor(() => {
			expect(fetchProductById).toHaveBeenCalled();
			expect(fetchProductImage).toHaveBeenCalled();
		});

		expect(screen.getByText("order1")).toBeInTheDocument();
		expect(screen.getByText("$150.00")).toBeInTheDocument();
		expect(screen.queryAllByText("...")).not.toBeNull();
		expect(screen.getByTestId("CheckmarkRoundicon")).toBeInTheDocument();
		expect(screen.getByText("processing")).toBeInTheDocument();
	});

	it("handles Pay Now button when order is not paid", async () => {
		const mockOrders: Order[] = [
			{
				id: "order1",
				email: "me@example.com",
				createdAt: new Date("2023-01-01T12:00:00Z"),
				items: [{ productId: 1, quantity: 1, sizeId: 1, price: 50 }],
				paid: false,
				status: "pending",
			},
		];

		(totalCartPrice as jest.Mock).mockReturnValue(50);
		(createCheckoutItems as jest.Mock).mockReturnValue([
			{ price: "price_123", quantity: 1 },
		]);
		(fetchProductById as jest.Mock).mockImplementation(() =>
			Promise.resolve({
				name: "Product 1",
				slug: "product-1",
			}),
		);
		(fetchProductImage as jest.Mock).mockResolvedValue(
			"/path/to/image.jpg",
		);

		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						sessionUrl: "https://checkout.stripe.com/sessionId",
					}),
			}),
		) as jest.Mock;

		const originalLocation = window.location;
		delete (window as any).location;
		(window as any).location = {
			...originalLocation,
			href: "",
		};

		Object.defineProperty(window, "location", {
			value: {
				hash: {
					endsWith: jest.fn(),
					includes: jest.fn(),
				},
				assign: jest.fn(),
			},
			writable: true,
		});

		render(<OrdersTable orders={mockOrders} />);

		const payNowButton = screen.getByText("Pay Now");
		expect(payNowButton).toBeInTheDocument();

		fireEvent.click(payNowButton);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				"/api/checkout-session",
				expect.any(Object),
			);
		});

		expect(createCheckoutItems).toHaveBeenCalledWith(mockOrders[0].items);
		expect(window.location.href).toBe(
			"https://checkout.stripe.com/sessionId",
		);

		window.location = originalLocation;
		(global.fetch as jest.Mock).mockClear();
	});

	it("displays loading when OrderProduct is fetching data", () => {
		const mockOrders: Order[] = [
			{
				id: "order1",
				createdAt: new Date(),
				email: "me@example.com",
				items: [{ productId: 1, quantity: 1, sizeId: 1, price: 50 }],
				paid: true,
				status: "completed",
			},
		];

		(totalCartPrice as jest.Mock).mockReturnValue(100);
		(fetchProductById as jest.Mock).mockReturnValue(new Promise(() => {})); // Never resolves
		(fetchProductImage as jest.Mock).mockReturnValue(new Promise(() => {})); // Never resolves

		render(<OrdersTable orders={mockOrders} />);

		expect(screen.queryAllByText("Loading...")).not.toBeNull();
	});

	it("displays error when OrderProduct does not fetch data successfully", () => {
		const mockOrders: Order[] = [
			{
				id: "order1",
				createdAt: new Date(),
				email: "me@example.com",
				items: [{ productId: 1, quantity: 1, sizeId: 1, price: 50 }],
				paid: true,
				status: "completed",
			},
		];

		(totalCartPrice as jest.Mock).mockReturnValue(100);
		(fetchProductById as jest.Mock).mockRejectedValue(
			new Error("Failed to fetch product"),
		);
		(fetchProductImage as jest.Mock).mockRejectedValue(
			new Error("Failed to fetch image"),
		);

		render(<OrdersTable orders={mockOrders} />);

		expect(screen.queryAllByText("Loading...")).not.toBeNull();
	});

	it("handles when payment fails", async () => {
		const mockOrders: Order[] = [
			{
				id: "order1",
				createdAt: new Date(),
				email: "me@example.com",
				items: [{ productId: 1, quantity: 1, sizeId: 1, price: 50 }],
				paid: false,
				status: "pending",
			},
		];

		(totalCartPrice as jest.Mock).mockReturnValue(100);
		(fetchProductById as jest.Mock).mockResolvedValue({
			name: "Product 1",
			slug: "product-1",
		});
		(fetchProductImage as jest.Mock).mockResolvedValue(
			"/path/to/image.jpg",
		);

		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						error: "Failed to create session",
					}),
			}),
		) as jest.Mock;

		render(<OrdersTable orders={mockOrders} />);

		const payNowButton = screen.getByText("Pay Now");

		fireEvent.click(payNowButton);

		const originalAlert = global.alert;
		const mockAlert = jest.fn();
		global.alert = mockAlert;

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				"/api/checkout-session",
				expect.any(Object),
			);
		});

		expect(createCheckoutItems).toHaveBeenCalledWith(mockOrders[0].items);

		expect(mockAlert).toHaveBeenCalledTimes(1);

		global.alert = originalAlert;
	});
});
