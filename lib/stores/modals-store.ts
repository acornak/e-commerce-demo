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
	// Delivery Info Modal
	deliveryInfoModalOpen: boolean;
	setDeliveryInfoModalOpen: (open: boolean) => void;
	toggleDeliveryInfoModalOpen: () => void;
	// Size Guide Modal
	sizeGuideModalOpen: boolean;
	setSizeGuideModalOpen: (open: boolean) => void;
	toggleSizeGuideModalOpen: () => void;
	// Ask Question Modal
	askQuestionModalOpen: boolean;
	setAskQuestionModalOpen: (open: boolean) => void;
	toggleAskQuestionModalOpen: () => void;
	// Product Image Modal
	productImageModalOpen: boolean;
	productImageModalUrl: string;
	setProductImageModalUrl: (url: string) => void;
	setProductImageModalOpen: (open: boolean) => void;
	toggleProductImageModalOpen: () => void;
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

	// Delivery Info Modal
	deliveryInfoModalOpen: false,
	setDeliveryInfoModalOpen: (open: boolean) =>
		set(() => ({
			deliveryInfoModalOpen: open,
		})),
	toggleDeliveryInfoModalOpen: () =>
		set((state) => ({
			deliveryInfoModalOpen: !state.deliveryInfoModalOpen,
		})),

	// Size Guide Modal
	sizeGuideModalOpen: false,
	setSizeGuideModalOpen: (open: boolean) =>
		set(() => ({
			sizeGuideModalOpen: open,
		})),
	toggleSizeGuideModalOpen: () =>
		set((state) => ({
			sizeGuideModalOpen: !state.sizeGuideModalOpen,
		})),

	// Ask Question Modal
	askQuestionModalOpen: false,
	setAskQuestionModalOpen: (open: boolean) =>
		set(() => ({
			askQuestionModalOpen: open,
		})),
	toggleAskQuestionModalOpen: () =>
		set((state) => ({
			askQuestionModalOpen: !state.askQuestionModalOpen,
		})),

	// Product Image Modal
	productImageModalOpen: false,
	productImageModalUrl: "",
	setProductImageModalOpen: (open: boolean) =>
		set(() => ({
			productImageModalOpen: open,
		})),
	setProductImageModalUrl: (url: string) =>
		set(() => ({
			productImageModalUrl: url,
		})),
	toggleProductImageModalOpen: () =>
		set((state) => ({
			productImageModalOpen: !state.productImageModalOpen,
		})),
}));
