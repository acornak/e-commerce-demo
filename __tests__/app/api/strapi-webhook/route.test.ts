/**
 * @jest-environment node
 */
import { POST } from "@/app/api/strapi-webhook/route";
import { NextRequest } from "next/server";
import { initAdmin } from "@/lib/config/firebase-admin";
import updateOrder from "@/lib/models/orders-admin";
import Stripe from "stripe";

jest.mock("@/lib/config/firebase-admin");
jest.mock("@/lib/models/orders-admin", () => ({
	__esModule: true,
	default: jest.fn(),
}));

const mockInitAdmin = initAdmin as jest.Mock;
const mockUpdateOrder = updateOrder as jest.Mock;
const mockConstructEvent = jest.spyOn(Stripe.webhooks, "constructEvent");

describe("POST /api/stripe-webhook", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		process.env.STRIPE_WEBHOOK_SECRET = "test_secret";
	});

	it("should return 200 for checkout.session.completed event with orderId", async () => {
		const mockOrderId = "order_123";
		const mockEvent = {
			type: "checkout.session.completed",
			data: {
				object: {
					metadata: { orderId: mockOrderId },
					payment_status: "paid",
				},
			},
		} as unknown as Stripe.Event;

		mockConstructEvent.mockImplementation(() => mockEvent);
		mockInitAdmin.mockResolvedValueOnce(undefined);
		mockUpdateOrder.mockResolvedValueOnce(undefined);

		const request = {
			text: async () => JSON.stringify({}),
			headers: new Headers({
				"stripe-signature": "test_signature",
			}),
		} as unknown as NextRequest;

		const response = await POST(request);

		expect(response.status).toBe(200);
		expect(mockInitAdmin).toHaveBeenCalled();
	});

	it("should return 200 if orderId is missing from event", async () => {
		const mockEvent = {
			type: "checkout.session.completed",
			data: {
				object: {
					metadata: {},
					payment_status: "paid",
				},
			},
		} as unknown as Stripe.Event;

		mockConstructEvent.mockImplementation(() => mockEvent);

		const request = {
			text: async () => JSON.stringify({}),
			headers: new Headers({
				"stripe-signature": "test_signature",
			}),
		} as unknown as NextRequest;

		const response = await POST(request);

		expect(response.status).toBe(200);
		expect(mockInitAdmin).not.toHaveBeenCalled();
	});

	it("should return 500 if updateOrder fails", async () => {
		const mockOrderId = "order_123";
		const mockEvent = {
			type: "checkout.session.completed",
			data: {
				object: {
					metadata: { orderId: mockOrderId },
					payment_status: "paid",
				},
			},
		} as unknown as Stripe.Event;

		mockConstructEvent.mockImplementation(() => mockEvent);
		mockInitAdmin.mockResolvedValueOnce(undefined);
		mockUpdateOrder.mockRejectedValueOnce(new Error("Test error"));

		const request = {
			text: async () => JSON.stringify({}),
			headers: new Headers({
				"stripe-signature": "test_signature",
			}),
		} as unknown as NextRequest;

		const response = await POST(request);

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({
			error: "Error creating order",
		});
		expect(mockInitAdmin).toHaveBeenCalled();
	});
});
