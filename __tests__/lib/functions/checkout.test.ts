import { CartItem } from "@/lib/config/types";
import { createCheckoutItems, handleCheckout } from "@/lib/functions/checkout";
import generateOrderId from "@/lib/functions/orders";
import { createOrder } from "@/lib/models/orders";

jest.mock("stripe");
jest.mock("@/lib/config/firebase", () => ({
	auth: {
		currentUser: {
			email: "test@example.com",
		},
	},
}));
jest.mock("@/lib/functions/orders", () => ({
	__esModule: true,
	default: jest.fn(),
}));
jest.mock("@/lib/models/orders", () => ({
	createOrder: jest.fn(),
}));

describe("Checkout Functions", () => {
	describe("createCheckoutItems", () => {
		beforeEach(() => {
			(generateOrderId as jest.Mock).mockReturnValue("123456");
			(createOrder as jest.Mock).mockResolvedValueOnce(undefined);
			global.fetch = jest.fn().mockResolvedValueOnce({
				json: jest.fn().mockResolvedValueOnce({
					sessionUrl: "http://example.com",
				}),
			}) as jest.Mock;
		});

		afterEach(() => {
			jest.resetAllMocks();
		});

		it("should correctly map cart items to Stripe line items", () => {
			const mockCartItems: CartItem[] = [
				{
					productId: 1,
					sizeId: 1,
					price: 10,
					quantity: 2,
				},
				{
					productId: 2,
					sizeId: 2,
					price: 20,
					quantity: 1,
				},
			];

			const lineItems = createCheckoutItems(mockCartItems);

			expect(lineItems).toEqual([
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "1",
						},
						unit_amount: 1000,
					},
					quantity: 2,
				},
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "2",
						},
						unit_amount: 2000,
					},
					quantity: 1,
				},
			]);
		});
	});

	describe("handleCheckout", () => {
		const mockCartItems: CartItem[] = [
			{
				productId: 1,
				sizeId: 1,
				price: 10,
				quantity: 2,
			},
			{
				productId: 2,
				sizeId: 2,
				price: 20,
				quantity: 1,
			},
		];

		beforeEach(() => {
			jest.resetAllMocks();
			(generateOrderId as jest.Mock).mockReturnValue("123456");
			global.fetch = jest.fn().mockResolvedValueOnce({
				json: jest.fn().mockResolvedValueOnce({
					sessionUrl: "http://example.com",
				}),
			}) as jest.Mock;
		});

		afterEach(() => {
			jest.resetAllMocks();
		});

		it("should create an order and redirect to the checkout session URL", async () => {
			await handleCheckout(mockCartItems, "test@example.com");

			expect(createOrder).toHaveBeenCalledWith({
				id: "123456",
				email: "test@example.com",
				items: mockCartItems,
				createdAt: expect.any(Date),
				status: "pending",
				paid: false,
			});

			expect(global.fetch).toHaveBeenCalledWith("/api/checkout-session", {
				method: "POST",
				body: JSON.stringify({
					lineItems: createCheckoutItems(mockCartItems),
					orderId: "123456",
					email: "test@example.com",
				}),
			});

			expect(window.location.href).toBe("http://localhost/");
		});

		it("should handle errors in order creation", async () => {
			(createOrder as jest.Mock).mockRejectedValueOnce(
				new Error("Order failed"),
			);

			await expect(
				handleCheckout(mockCartItems, "test@example.com"),
			).rejects.toThrow("Failed to create order");
		});

		it("should handle errors in fetch request", async () => {
			global.fetch = jest
				.fn()
				.mockRejectedValueOnce(new Error("Fetch failed")) as jest.Mock;

			await expect(
				handleCheckout(mockCartItems, "test@example.com"),
			).rejects.toThrow("Failed to create checkout session");
		});

		it("should handle errors in session URL response", async () => {
			global.fetch = jest.fn().mockResolvedValueOnce({
				json: jest.fn().mockResolvedValueOnce({}),
			}) as jest.Mock;

			await expect(
				handleCheckout(mockCartItems, "test@example.com"),
			).rejects.toThrow("Failed to create checkout session");
		});
	});
});
