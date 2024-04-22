import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type WishlistItem = {
	productId: number;
};

export interface WishlistStore {
	items: WishlistItem[];
	addItem: (item: WishlistItem) => void;
	removeItem: (item: WishlistItem) => void;
	clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: (item: WishlistItem): void => {
				const existingItems = get().items;
				const existingIndex = existingItems.findIndex(
					(existingItem) => existingItem.productId === item.productId,
				);
				if (existingIndex === -1) {
					set({ items: [...existingItems, item] });
				}
			},
			removeItem: (item: WishlistItem): void => {
				set((state) => {
					const updatedItems = state.items.filter(
						(existingItem) =>
							existingItem.productId !== item.productId,
					);
					return { items: updatedItems };
				});
			},

			clearWishlist: (): void => {
				set({ items: [] });
			},
		}),
		{
			name: "wishlist-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const updateWishlistStore = () => {
	useWishlistStore.persist.rehydrate();
};
