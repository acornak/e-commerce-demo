import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
	productId: number;
	price: number;
	quantity: number;
};

export interface CartStore {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (item: CartItem) => void;
	addQuantity: (productId: number, amount?: number) => void;
	removeQuantity: (productId: number, amount?: number) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: (item: CartItem): void => {
				const existingItems = get().items;
				const existingIndex = existingItems.findIndex(
					(existingItem) => existingItem.productId === item.productId,
				);
				if (existingIndex !== -1) {
					const updatedItems = existingItems.map((existingItem) =>
						existingItem.productId === item.productId
							? {
									...existingItem,
									quantity:
										existingItem.quantity + item.quantity,
								}
							: existingItem,
					);
					set({ items: updatedItems });
				} else {
					set({ items: [...existingItems, item] });
				}
			},
			removeItem: (item: CartItem): void => {
				set((state) => {
					const updatedItems = state.items.filter(
						(existingItem) =>
							existingItem.productId !== item.productId,
					);
					return { items: updatedItems };
				});
			},
			addQuantity: (productId: number, amount?: number): void => {
				const existingItems = get().items;
				const updatedItems = existingItems.map((existingItem) =>
					existingItem.productId === productId
						? {
								...existingItem,
								quantity: amount || existingItem.quantity + 1,
							}
						: existingItem,
				);
				set({ items: updatedItems });
			},
			removeQuantity: (productId: number, amount?: number): void => {
				const existingItems = get().items;
				const updatedItems = existingItems
					.map((existingItem) =>
						existingItem.productId === productId
							? {
									...existingItem,
									quantity:
										amount || existingItem.quantity - 1,
								}
							: existingItem,
					)
					.filter((existingItem) => existingItem.quantity > 0);
				set({ items: updatedItems });
			},
			clearCart: (): void => {
				set({ items: [] });
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
