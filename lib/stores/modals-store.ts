import { create } from "zustand";
import { Product } from "../models/product";

export interface ModalsStore {
	// Login Modal
	loginModalOpen: boolean;
	setLoginModalOpen: (open: boolean) => void;
	toggleLoginModalOpen: () => void;
	// Drawer Menu
	drawerMenuOpen: boolean;
	setDrawerMenuOpen: (open: boolean) => void;
	toggleDrawerMenuOpen: () => void;
	// Search Bar
	searchBarOpen: boolean;
	setSearchBarOpen: (open: boolean) => void;
	toggleSearchBarOpen: () => void;
	// Cart Bar
	cartBarOpen: boolean;
	setCartBarOpen: (open: boolean) => void;
	toggleCartBarOpen: () => void;
	// Product Added to Cart Modal
	productAddedModalOpen: boolean;
	setProductAddedModalOpen: (open: boolean) => void;
	toggleProductAddedModalOpen: () => void;
	cartProduct: Product | null;
	setCartProduct: (product: Product) => void;
	// Product Preview Modal
	productPreviewModalOpen: boolean;
	setProductPreviewModalOpen: (open: boolean) => void;
	toggleProductPreviewModalOpen: () => void;
	previewProductId: number;
	setPreviewProductId: (productId: number) => void;
}

export const useModalsStore = create<ModalsStore>((set) => ({
	// Login Modal
	loginModalOpen: false,
	setLoginModalOpen: (open: boolean) => set(() => ({ loginModalOpen: open })),
	toggleLoginModalOpen: () =>
		set((state) => ({ loginModalOpen: !state.loginModalOpen })),

	// Drawer Menu
	drawerMenuOpen: false,
	setDrawerMenuOpen: (open: boolean) => set(() => ({ drawerMenuOpen: open })),
	toggleDrawerMenuOpen: () =>
		set((state) => ({ drawerMenuOpen: !state.drawerMenuOpen })),

	// Search Bar
	searchBarOpen: false,
	setSearchBarOpen: (open: boolean) => set(() => ({ searchBarOpen: open })),
	toggleSearchBarOpen: () =>
		set((state) => ({ searchBarOpen: !state.searchBarOpen })),

	// Cart Bar
	cartBarOpen: false,
	setCartBarOpen: (open: boolean) => set(() => ({ cartBarOpen: open })),
	toggleCartBarOpen: () =>
		set((state) => ({ cartBarOpen: !state.cartBarOpen })),

	// Product Added to Cart Modal
	productAddedModalOpen: false,
	setProductAddedModalOpen: (open: boolean) =>
		set(() => ({
			productAddedModalOpen: open,
		})),
	toggleProductAddedModalOpen: () =>
		set((state) => ({
			productAddedModalOpen: !state.productAddedModalOpen,
		})),
	cartProduct: null,
	setCartProduct: (product: Product) => set(() => ({ cartProduct: product })),

	// Product Preview Modal
	productPreviewModalOpen: false,
	setProductPreviewModalOpen: (open: boolean) =>
		set(() => ({
			productPreviewModalOpen: open,
		})),
	toggleProductPreviewModalOpen: () =>
		set((state) => ({
			productPreviewModalOpen: !state.productPreviewModalOpen,
		})),
	previewProductId: 0,
	setPreviewProductId: (productId: number) =>
		set(() => ({ previewProductId: productId })),
}));
