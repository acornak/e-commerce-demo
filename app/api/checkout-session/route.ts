/* eslint-disable import/prefer-default-export */
import createCheckoutSession from "@/lib/config/stripe";
import { NextRequest, NextResponse } from "next/server";

/**
 * Create checkout session
 * @param {Request} request - Request object
 * @returns {Response} - Response with session URL
 * @throws {Error} - Throws error if line items are not provided
 * @example
 * POST /api/checkout-session
 * {
 * 	"lineItems": [
 * 		{
 * 			"price": "price_1JkZ7vLzJ6Z6yZ",
 * 			"quantity": 1
 * 		}
 * 	],
 * 	"orderId": "order-id",
 * 	"email": "me@example.com",
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const { lineItems, orderId, email } = await request.json();
		if (!lineItems || lineItems.length === 0) {
			return NextResponse.json(
				{ error: "No line items provided" },
				{ status: 400 },
			);
		}
		const session = await createCheckoutSession(lineItems, orderId, email);
		return NextResponse.json({ sessionUrl: session.url });
	} catch (error) {
		console.error("Error creating checkout session:", error);
		return NextResponse.json(
			{ error: "Error creating checkout session" },
			{ status: 500 },
		);
	}
}
