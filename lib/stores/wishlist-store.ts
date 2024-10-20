import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getUser, updateUser } from "../models/user";
import { auth } from "../config/firebase";
import { User, WishlistItem } from "../config/types";

export interface WishlistStore {
	items: WishlistItem[];
	syncWithFirestore: () => void;
	addItem: (item: WishlistItem) => void;
	removeItem: (item: WishlistItem) => void;
	clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
	persist(
		(set, get) => ({
			items: [],
			syncWithFirestore: async (): Promise<void> => {
				/* istanbul ignore next */
				if (auth.currentUser) {
					await updateUser({
						wishlistItems: get().items,
					} as User);
				}
			},
			addItem: (item: WishlistItem): void => {
				const existingItems = get().items;
				const existingIndex = existingItems.findIndex(
					(existingItem) => existingItem.productId === item.productId,
				);
				if (existingIndex === -1) {
					set({ items: [...existingItems, item] });
				}
				get().syncWithFirestore();
			},
			removeItem: (item: WishlistItem): void => {
				const updatedItems = get().items.filter(
					(existingItem) => existingItem.productId !== item.productId,
				);

				set({ items: updatedItems });
				get().syncWithFirestore();
			},

			clearWishlist: (): void => {
				set({ items: [] });
				get().syncWithFirestore();
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

/* istanbul ignore next */
onAuthStateChanged(auth, async (user) => {
	if (user) {
		const currentUser = await getUser();
		if (currentUser?.wishlistItems) {
			useWishlistStore.setState({
				items: currentUser.wishlistItems,
			});
		}
	}
});
