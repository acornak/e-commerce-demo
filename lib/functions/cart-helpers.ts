import { CartItem, Product, Size } from "../config/types";

export function getCartItemSize(sizes: Size[], sizeId: number): Size {
	return sizes.filter((s) => s.id === sizeId)[0];
}

export function getCartItemQty(
	cartItems: CartItem[],
	productId: number,
	sizeId: number,
): number {
	const item = cartItems.filter(
		(i) => i.productId === productId && i.sizeId === sizeId,
	)[0];
	return item.quantity;
}

export function totalCartItemPrice(
	cartItems: CartItem[],
	p: Product,
	sizeId: number,
): number {
	const qty = getCartItemQty(cartItems, p.id, sizeId);
	return qty * p.price;
}

export function totalCartPrice(cartItems: CartItem[]): number {
	return cartItems
		.map((item) => item.quantity * item.price)
		.reduce((a, b) => a + b, 0);
}
