import { act, renderHook } from "@testing-library/react";
import { updateCartStore, useCartStore } from "@/lib/stores/cart-store";
import { CartItem } from "@/lib/config/types";

describe("useCartStore", () => {
	const mockCartItem: CartItem = {
		productId: 1,
		price: 100,
		quantity: 1,
		sizeId: 1,
	};

	beforeEach(() => {
		localStorage.clear();
		updateCartStore();
	});

	it("should add an item to the cart", () => {
		const { result } = renderHook(() => useCartStore());

		act(() => {
			result.current.addItem(mockCartItem);
		});

		expect(result.current.items).toHaveLength(1);
		expect(result.current.items[0]).toBe(mockCartItem);

		act(() => {
			result.current.addItem(mockCartItem);
		});

		expect(result.current.items).toHaveLength(1);
		expect(result.current.items[0].quantity).toBe(2);

		act(() => {
			result.current.addItem({ ...mockCartItem, productId: 2 });
			result.current.addItem({ ...mockCartItem, quantity: 2 });
		});

		expect(result.current.items).toHaveLength(2);
		expect(result.current.items[0].productId).toBe(1);
		expect(result.current.items[0].quantity).toBe(4);
		expect(result.current.items[1].productId).toBe(2);
		expect(result.current.items[1].quantity).toBe(1);

		act(() => {
			result.current.clearCart();
		});
	});

	it("should remove an item from the cart", () => {
		const { result } = renderHook(() => useCartStore());

		act(() => {
			result.current.addItem(mockCartItem);
			result.current.removeItem(mockCartItem);
		});

		expect(result.current.items).toHaveLength(0);

		act(() => {
			result.current.clearCart();
		});
	});

	it("should add item quantity", () => {
		const { result } = renderHook(() => useCartStore());

		act(() => {
			result.current.addItem(mockCartItem);
			result.current.addQuantity(1, 1);
		});

		expect(result.current.items).toHaveLength(1);
		expect(result.current.items[0].quantity).toBe(2);

		act(() => {
			result.current.addItem({ ...mockCartItem, productId: 2 });
			result.current.addQuantity(1, 1);
		});

		expect(result.current.items).toHaveLength(2);
		expect(result.current.items[0].quantity).toBe(3);
		expect(result.current.items[1].quantity).toBe(1);

		act(() => {
			result.current.clearCart();
		});
	});

	it("should remove item quantity", () => {
		const { result } = renderHook(() => useCartStore());

		act(() => {
			result.current.addItem({ ...mockCartItem, quantity: 3 });
			result.current.removeQuantity(1, 1);
		});

		expect(result.current.items).toHaveLength(1);
		expect(result.current.items[0].quantity).toBe(2);

		act(() => {
			result.current.addItem({ ...mockCartItem, productId: 2 });
			result.current.removeQuantity(1, 1);
		});

		expect(result.current.items).toHaveLength(2);
		expect(result.current.items[0].quantity).toBe(1);
		expect(result.current.items[1].quantity).toBe(1);

		act(() => {
			result.current.clearCart();
		});

		act(() => {
			result.current.clearCart();
		});
	});

	it("should clear the cart", () => {
		const { result } = renderHook(() => useCartStore());

		act(() => {
			result.current.addItem(mockCartItem);
			result.current.addItem({ ...mockCartItem, productId: 2 });
			result.current.clearCart();
		});

		expect(result.current.items).toHaveLength(0);
	});

	it("should rehydrate cart from localStorage", async () => {
		const mockRehydrate = jest.fn();

		const mockPersist = {
			rehydrate: mockRehydrate,
		};

		(useCartStore as any).persist = mockPersist;

		updateCartStore();

		expect(mockRehydrate).toHaveBeenCalled();
	});
});
