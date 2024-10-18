import Stripe from "stripe";
import { auth } from "../config/firebase";
import generateOrderId from "./orders";
import { CartItem } from "../config/types";
import { createOrder } from "../models/orders";

/**
 * Create line items for a Stripe Checkout session
 * @param cartItems - Cart items
 * @returns Line items
 */
export const createCheckoutItems = (
	cartItems: CartItem[],
): Stripe.Checkout.SessionCreateParams.LineItem[] => {
	return cartItems.map((cartItem) => {
		return {
			price_data: {
				currency: "usd",
				product_data: {
					// TODO: add product name here
					name: cartItem.productId.toString(),
					// images: [imageUrl],
				},
				unit_amount: cartItem.price * 100,
			},
			quantity: cartItem.quantity,
		};
	});
};

/**
 * Handle the checkout process
 * @param cartItems - Cart items
 * @param email - Email address
 */
export const handleCheckout = async (cartItems: CartItem[], email: string) => {
	const orderId = generateOrderId();
	try {
		// TODO: address
		await createOrder({
			id: orderId,
			email,
			items: cartItems,
			createdAt: new Date(),
			status: "pending",
			paid: false,
		});
	} catch (error) {
		throw new Error("Failed to create order");
	}

	try {
		let userEmail;

		/* istanbul ignore next */
		if (auth.currentUser) {
			userEmail = auth.currentUser.email;
		} else {
			// TODO
			userEmail = "";
		}

		const response = await fetch("/api/checkout-session", {
			method: "POST",
			body: JSON.stringify({
				lineItems: createCheckoutItems(cartItems),
				orderId,
				email: userEmail,
			}),
		});
		const data = await response.json();
		if (data.sessionUrl) {
			window.location.href = data.sessionUrl;
		} else {
			console.error("No session URL returned");
			throw new Error();
		}
	} catch (error) {
		throw new Error("Failed to create checkout session");
	}
};
