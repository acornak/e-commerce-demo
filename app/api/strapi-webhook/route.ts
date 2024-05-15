/* eslint-disable import/prefer-default-export */
import { initAdmin } from "@/lib/config/firebase-admin";
import { Order } from "@/lib/config/types";
import updateOrder from "@/lib/models/orders-admin";

import Stripe from "stripe";

export async function POST(request: Request) {
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
				return new Response("OK", { status: 200 });
			}

			let paid: boolean = false;
			if (event.data.object.payment_status === "paid") {
				paid = true;
			}

			try {
				await initAdmin();
				await updateOrder({
					id: event.data.object.metadata.orderId,
					paid,
				} as Order);
			} catch (e: any) {
				console.error("Failed to update order:", e);
				return new Response("Internal Server Error", { status: 500 });
			}

			return new Response("OK", { status: 200 });
		}
		return new Response("OK", { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response("Internal Server Error", { status: 500 });
	}
}
