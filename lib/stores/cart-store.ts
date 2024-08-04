import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { persist, createJSONStorage } from "zustand/middleware";
import { getUser, updateUser } from "../models/user";
import { auth } from "../config/firebase";
import { CartItem, User } from "../config/types";

export interface CartStore {
	items: CartItem[];
	syncWithFirestore: () => void;
	addItem: (item: CartItem) => void;
	removeItem: (item: CartItem) => void;
	addQuantity: (productId: number, sizeId: number, amount?: number) => void;
	removeQuantity: (
		productId: number,
		sizeId: number,
		amount?: number,
	) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],
			syncWithFirestore: async (): Promise<void> => {
				if (auth.currentUser) {
					await updateUser({
						cartItems: get().items,
					} as User);
				}
			},

			addItem: (item: CartItem): void => {
				const existingItems = get().items;
				const existingItem = existingItems.find(
					(e) =>
						e.productId === item.productId &&
						e.sizeId === item.sizeId,
				);
				if (existingItem) {
					const updatedItems = existingItems.map((e) =>
						e.productId === item.productId &&
						e.sizeId === item.sizeId
							? {
									...e,
									quantity: e.quantity + item.quantity,
								}
							: e,
					);
					set({ items: updatedItems });
				} else {
					set({ items: [...existingItems, item] });
				}
				get().syncWithFirestore();
			},

			removeItem: (item: CartItem): void => {
				const updatedItems = get().items.filter(
					(existingItem) =>
						existingItem.productId !== item.productId ||
						existingItem.sizeId !== item.sizeId,
				);
				set({ items: updatedItems });
				get().syncWithFirestore();
			},

			addQuantity: (
				productId: number,
				sizeId: number,
				amount?: number,
			): void => {
				const existingItems = get().items;
				const updatedItems = existingItems.map((existingItem) =>
					existingItem.productId === productId &&
					existingItem.sizeId === sizeId
						? {
								...existingItem,
								quantity: amount || existingItem.quantity + 1,
							}
						: existingItem,
				);
				set({ items: updatedItems });
				get().syncWithFirestore();
			},

			removeQuantity: (
				productId: number,
				sizeId: number,
				amount?: number,
			): void => {
				const existingItems = get().items;
				const updatedItems = existingItems
					.map((existingItem) =>
						existingItem.productId === productId &&
						existingItem.sizeId === sizeId
							? {
									...existingItem,
									quantity:
										amount || existingItem.quantity - 1,
								}
							: existingItem,
					)
					.filter((existingItem) => existingItem.quantity > 0);
				set({ items: updatedItems });
				get().syncWithFirestore();
			},
			clearCart: (): void => {
				set({ items: [] });
				get().syncWithFirestore();
			},
		}),
		{
			name: "cart-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const updateCartStore = () => {
	useCartStore.persist.rehydrate();
};

onAuthStateChanged(auth, async (user) => {
	if (user) {
		const currentUser = await getUser();
		if (currentUser?.cartItems) {
			useCartStore.setState({ items: currentUser?.cartItems });
		}
	}
});
