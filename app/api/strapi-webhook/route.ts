/* eslint-disable import/prefer-default-export */
import { initAdmin } from "@/lib/config/firebase-admin";
import { Order } from "@/lib/config/types";
import updateOrder from "@/lib/models/orders-admin";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

/**
 * Handle Stripe webhook events.
 * @param {NextRequest} request - Request object
 * @returns {Response} - Response with a status message
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
	let event: Stripe.Event;

	try {
		const body = await request.text();
		const sig = request.headers.get("stripe-signature");

		event = Stripe.webhooks.constructEvent(
			body,
			sig!,
			process.env.STRIPE_WEBHOOK_SECRET as string,
		);
		if (event.type === "checkout.session.completed") {
			if (!event.data.object.metadata?.orderId) {
				console.log("No orderId found in event metadata");
				return NextResponse.json({});
			}

			let paid: boolean = false;
			if (event.data.object.payment_status === "paid") {
				paid = true;
			}

			await initAdmin();
			await updateOrder({
				id: event.data.object.metadata.orderId,
				paid,
			} as Order);
		}
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Error creating order" },
			{ status: 500 },
		);
	}

	return NextResponse.json({});
}
