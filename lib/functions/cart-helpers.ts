import { Product } from "../models/product";
import { Size } from "../models/size";
import { CartItem } from "../stores/cart-store";

export function getCartItemSize(sizes: Size[], sizeId: number): Size {
	return sizes.filter((s) => s.id === sizeId)[0];
}

export function getCartItemQty(
	cartItems: CartItem[],
	productId: number,
): number {
	const item = cartItems.filter((i) => i.productId === productId)[0];
	return item.quantity;
}

export function totalCartItemPrice(cartItems: CartItem[], p: Product): number {
	const qty = getCartItemQty(cartItems, p.id);
	return qty * p.price;
}

export function totalCartPrice(cartItems: CartItem[]): number {
	return cartItems
		.map((item) => item.quantity * item.price)
		.reduce((a, b) => a + b, 0);
}
