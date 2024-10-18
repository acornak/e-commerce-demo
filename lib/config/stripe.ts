import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-04-10",
});

export default async function createCheckoutSession(
	lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
	orderId: string,
	email?: string,
): Promise<Stripe.Checkout.Session> {
	let session: Stripe.Checkout.Session;

	if (!email) {
		session = await stripe.checkout.sessions.create({
			mode: "payment",
			line_items: lineItems,
			success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/orders`,
			cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/orders`,
			metadata: {
				orderId,
			},
		});
		return session;
	}

	session = await stripe.checkout.sessions.create({
		mode: "payment",
		line_items: lineItems,
		success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/orders`,
		cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/orders`,
		customer_email: email,
		metadata: {
			orderId,
			email,
		},
	});

	return session;
}
