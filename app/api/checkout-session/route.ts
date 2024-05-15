/* eslint-disable import/prefer-default-export */
import createCheckoutSession from "@/lib/config/stripe";

export async function POST(request: Request) {
	try {
		const { lineItems, orderId, email } = await request.json();
		if (!lineItems || lineItems.length === 0) {
			return new Response(
				JSON.stringify({ error: "No line items provided" }),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		}
		const session = await createCheckoutSession(lineItems, orderId, email);
		return Response.json({ sessionUrl: session.url });
	} catch (error) {
		console.error("Error creating checkout session:", error);
		return Response.json(
			{ error: "Error creating checkout session" },
			{ status: 500 },
		);
	}
}
