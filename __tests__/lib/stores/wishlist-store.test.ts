import { act, renderHook } from "@testing-library/react";
import {
	updateWishlistStore,
	useWishlistStore,
} from "@/lib/stores/wishlist-store";

describe("useWishlistStore", () => {
	beforeEach(() => {
		localStorage.clear();
		updateWishlistStore();
	});

	it("should add an item to the wishlist", () => {
		const { result } = renderHook(() => useWishlistStore());

		act(() => {
			result.current.addItem({ productId: 1 });
		});

		expect(result.current.items).toHaveLength(1);
		expect(result.current.items[0].productId).toBe(1);

		act(() => {
			result.current.clearWishlist();
		});
	});

	it("should remove an item from the wishlist", () => {
		const { result } = renderHook(() => useWishlistStore());

		act(() => {
			result.current.addItem({ productId: 2 });
			result.current.removeItem({ productId: 2 });
		});

		expect(result.current.items).toHaveLength(0);

		act(() => {
			result.current.clearWishlist();
		});
	});

	it("should clear the wishlist", () => {
		const { result } = renderHook(() => useWishlistStore());

		act(() => {
			result.current.addItem({ productId: 1 });
			result.current.addItem({ productId: 2 });
			result.current.clearWishlist();
		});

		expect(result.current.items).toHaveLength(0);
	});

	it("should rehydrate wishlist from localStorage", async () => {
		const mockRehydrate = jest.fn();

		const mockPersist = {
			rehydrate: mockRehydrate,
		};

		(useWishlistStore as any).persist = mockPersist;

		updateWishlistStore();

		expect(mockRehydrate).toHaveBeenCalled();
	});
});
