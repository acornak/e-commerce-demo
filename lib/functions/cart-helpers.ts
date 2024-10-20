import { CartItem, Product, Size } from "../config/types";

/**
 * Get the size object from the sizes array by its ID
 * @param sizes - Array of sizes
 * @param sizeId - Size ID
 * @returns Size object
 * @throws Error - If size ID does not exist
 */
export function getCartItemSize(sizes: Size[], sizeId: number): Size {
	return sizes.filter((s) => s.id === sizeId)[0];
}

/**
 * Get the quantity of a cart item by its product and size IDs
 * @param cartItems - Array of cart items
 * @param productId - Product ID
 * @param sizeId - Size ID
 * @returns Quantity
 * @throws Error - If product ID does not exist
 */
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

/**
 * Get the total price of a cart item by its product and size IDs
 * @param cartItems - Array of cart items
 * @param p - Product object
 * @param sizeId - Size ID
 * @returns Total price
 * @throws Error - If product ID does not exist
 */
export function totalCartItemPrice(
	cartItems: CartItem[],
	p: Product,
	sizeId: number,
): number {
	const qty = getCartItemQty(cartItems, p.id, sizeId);
	return qty * p.price;
}

/**
 * Get the total price of all items in the cart
 * @param cartItems - Array of cart items
 * @returns Total price
 */
export function totalCartPrice(cartItems: CartItem[]): number {
	return cartItems
		.map((item) => item.quantity * item.price)
		.reduce((a, b) => a + b, 0);
}
