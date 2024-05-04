import mockProducts from "@/__mocks__/products/products.mock";
import {
	getCartItemQty,
	getCartItemSize,
	totalCartItemPrice,
	totalCartPrice,
} from "@/lib/functions/cart-helpers";
import { CartItem } from "@/lib/stores/cart-store";

describe("getCartItemSize", () => {
	const sizes = [
		{ id: 1, name: "S" },
		{ id: 2, name: "M" },
		{ id: 3, name: "L" },
	];

	it("should return the correct size object when the sizeId exists", () => {
		const sizeId = 2;
		const expectedSize = { id: 2, name: "M" };
		expect(getCartItemSize(sizes, sizeId)).toEqual(expectedSize);
	});

	it("should return undefined when the sizeId does not exist", () => {
		const sizeId = 4;
		expect(getCartItemSize(sizes, sizeId)).toBeUndefined();
	});
});

describe("getCartItemQty", () => {
	const cartItems: CartItem[] = [
		{ productId: 1, quantity: 5, sizeId: 1, price: 100 },
		{ productId: 2, quantity: 3, sizeId: 1, price: 200 },
		{ productId: 3, quantity: 7, sizeId: 1, price: 300 },
	];

	it("should return the correct quantity when the productId exists", () => {
		const productId = 2;
		const expectedQty = 3;

		expect(getCartItemQty(cartItems, productId, 1)).toEqual(expectedQty);
	});

	it("should throw an error when the productId does not exist", () => {
		const productId = 4;

		expect(() => getCartItemQty(cartItems, productId, 1)).toThrow();
	});
});

describe("totalCartItemPrice", () => {
	const cartItems: CartItem[] = [
		{ productId: 1, quantity: 5, sizeId: 1, price: 100 },
		{ productId: 2, quantity: 3, sizeId: 2, price: 200 },
		{ productId: 3, quantity: 7, sizeId: 3, price: 300 },
	];

	it("should return the correct total price when the product exists in the cart", () => {
		expect(totalCartItemPrice(cartItems, mockProducts[0], 1)).toEqual(260);
	});

	it("should return 0 when the product does not exist in the cart", () => {
		expect(() =>
			totalCartItemPrice(cartItems, mockProducts[4], 1),
		).toThrow();
	});
});

describe("totalCartPrice", () => {
	const cartItems: CartItem[] = [
		{ productId: 1, quantity: 5, sizeId: 1, price: 100 },
		{ productId: 2, quantity: 3, sizeId: 2, price: 200 },
		{ productId: 3, quantity: 7, sizeId: 3, price: 300 },
	];

	it("should return the correct total price for all items in the cart", () => {
		const expectedTotalPrice = 5 * 100 + 3 * 200 + 7 * 300;

		expect(totalCartPrice(cartItems)).toEqual(expectedTotalPrice);
	});

	it("should return 0 when the cart is empty", () => {
		expect(totalCartPrice([])).toEqual(0);
	});
});
