import Stripe from "stripe";
import { auth } from "../config/firebase";
import generateOrderId from "./orders";
import { CartItem } from "../config/types";
import { createOrder } from "../models/orders";

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

export const handleCheckout = async (cartItems: CartItem[]) => {
	const orderId = generateOrderId();
	try {
		await createOrder({
			id: orderId,
			email: auth.currentUser?.email || "",
			items: cartItems,
			createdAt: new Date(),
			status: "pending",
			paid: false,
		});
	} catch (error) {
		console.error("Error:", error);
		alert(error);
		return;
	}

	fetch("/api/checkout-session", {
		method: "POST",
		body: JSON.stringify({
			lineItems: createCheckoutItems(cartItems),
			orderId,
			email: auth.currentUser?.email || "",
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.sessionUrl) {
				window.location.href = data.sessionUrl;
			} else {
				throw new Error("No session URL returned");
			}
		})
		.catch((error) => {
			console.error("Error:", error);
			alert(error);
		});
};
