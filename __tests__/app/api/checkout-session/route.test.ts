/**
 * @jest-environment node
 */
import createCheckoutSession from "@/lib/config/stripe";
import { POST } from "@/app/api/checkout-session/route";
import { NextRequest } from "next/server";

jest.mock("@/lib/config/stripe");

describe("POST /api/checkout-session", () => {
	const mockLineItems = [{ id: "item1", quantity: 1 }];
	const mockOrderId = "order123";
	const mockEmail = "test@example.com";
	const mockSessionUrl = "http://example.com/checkout";

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return 400 if no line items are provided", async () => {
		const request = {
			json: async () => ({
				lineItems: [],
				orderId: mockOrderId,
				email: mockEmail,
			}),
		} as unknown as NextRequest;

		const response = await POST(request);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			error: "No line items provided",
		});
	});

	it("should return 500 if an error occurs during session creation", async () => {
		(createCheckoutSession as jest.Mock).mockRejectedValue(
			new Error("Some error"),
		);

		const request = {
			json: async () => ({
				lineItems: mockLineItems,
				orderId: mockOrderId,
				email: mockEmail,
			}),
		} as unknown as NextRequest;

		const response = await POST(request);

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({
			error: "Error creating checkout session",
		});
	});

	it("should return session URL if request is successful", async () => {
		(createCheckoutSession as jest.Mock).mockResolvedValue({
			url: mockSessionUrl,
		});

		const request = {
			json: async () => ({
				lineItems: mockLineItems,
				orderId: mockOrderId,
				email: mockEmail,
			}),
		} as unknown as NextRequest;

		const response = await POST(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ sessionUrl: mockSessionUrl });
	});
});
