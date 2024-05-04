import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
	productId: number;
	sizeId: number;
	price: number;
	quantity: number;
};

export interface CartStore {
	items: CartItem[];
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
			},

			removeItem: (item: CartItem): void => {
				set((state) => {
					const updatedItems = state.items.filter(
						(existingItem) =>
							existingItem.productId !== item.productId ||
							existingItem.sizeId !== item.sizeId,
					);
					return { items: updatedItems };
				});
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
