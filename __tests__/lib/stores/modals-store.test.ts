import { act, renderHook } from "@testing-library/react";
import { useModalsStore } from "@/lib/stores/modals-store";
import mockProducts from "@/__mocks__/products/products.mock";

describe("useModalsStore", () => {
	const mockedProduct = mockProducts[0];

	it("should handle login modal state change", () => {
		const { result } = renderHook(() => useModalsStore());

		expect(result.current.loginModalOpen).not.toBeTruthy();

		act(() => {
			result.current.setLoginModalOpen(true);
		});

		expect(result.current.loginModalOpen).toBeTruthy();

		act(() => {
			result.current.toggleLoginModalOpen();
		});

		expect(result.current.loginModalOpen).not.toBeTruthy();
	});

	it("should handle drawer state change", () => {
		const { result } = renderHook(() => useModalsStore());

		expect(result.current.drawerMenuOpen).not.toBeTruthy();

		act(() => {
			result.current.setDrawerMenuOpen(true);
		});

		expect(result.current.drawerMenuOpen).toBeTruthy();

		act(() => {
			result.current.toggleDrawerMenuOpen();
		});

		expect(result.current.drawerMenuOpen).not.toBeTruthy();
	});

	it("should handle search bar state change", () => {
		const { result } = renderHook(() => useModalsStore());

		expect(result.current.searchBarOpen).not.toBeTruthy();

		act(() => {
			result.current.setSearchBarOpen(true);
		});

		expect(result.current.searchBarOpen).toBeTruthy();

		act(() => {
			result.current.toggleSearchBarOpen();
		});

		expect(result.current.searchBarOpen).not.toBeTruthy();
	});

	it("should handle cart bar state change", () => {
		const { result } = renderHook(() => useModalsStore());

		expect(result.current.cartBarOpen).not.toBeTruthy();

		act(() => {
			result.current.setCartBarOpen(true);
		});

		expect(result.current.cartBarOpen).toBeTruthy();

		act(() => {
			result.current.toggleCartBarOpen();
		});

		expect(result.current.cartBarOpen).not.toBeTruthy();
	});

	it("should handle product added modal state change", () => {
		const { result } = renderHook(() => useModalsStore());

		expect(result.current.productAddedModalOpen).not.toBeTruthy();
		expect(result.current.cartProduct).toBeNull();

		act(() => {
			result.current.setProductAddedModalOpen(true);
		});

		expect(result.current.productAddedModalOpen).toBeTruthy();

		act(() => {
			result.current.setCartProduct(mockedProduct, { id: 1, name: "S" });
			result.current.toggleProductAddedModalOpen();
		});

		expect(result.current.productAddedModalOpen).not.toBeTruthy();
		expect(result.current.cartProduct).toEqual({
			...mockedProduct,
			selectedSize: { id: 1, name: "S" },
		});
	});

	it("should handle product preview modal state change", () => {
		const { result } = renderHook(() => useModalsStore());

		expect(result.current.productPreviewModalOpen).not.toBeTruthy();
		expect(result.current.previewProductId).toBe(0);

		act(() => {
			result.current.setProductPreviewModalOpen(true);
		});

		expect(result.current.productPreviewModalOpen).toBeTruthy();

		act(() => {
			result.current.setPreviewProductId(1);
			result.current.toggleProductPreviewModalOpen();
		});

		expect(result.current.productPreviewModalOpen).not.toBeTruthy();
		expect(result.current.previewProductId).toEqual(1);
	});

	it("should handle delivery info modal state change", () => {
		const { result } = renderHook(() => useModalsStore());

		expect(result.current.deliveryInfoModalOpen).not.toBeTruthy();

		act(() => {
			result.current.setDeliveryInfoModalOpen(true);
		});

		expect(result.current.deliveryInfoModalOpen).toBeTruthy();

		act(() => {
			result.current.toggleDeliveryInfoModalOpen();
		});

		expect(result.current.deliveryInfoModalOpen).not.toBeTruthy();
	});

	it("should handle size guide modal state change", () => {
		const { result } = renderHook(() => useModalsStore());

		expect(result.current.sizeGuideModalOpen).not.toBeTruthy();

		act(() => {
			result.current.setSizeGuideModalOpen(true);
		});

		expect(result.current.sizeGuideModalOpen).toBeTruthy();

		act(() => {
			result.current.toggleSizeGuideModalOpen();
		});

		expect(result.current.sizeGuideModalOpen).not.toBeTruthy();
	});

	it("should handle ask question modal state change", () => {
		const { result } = renderHook(() => useModalsStore());

		expect(result.current.askQuestionModalOpen).not.toBeTruthy();

		act(() => {
			result.current.setAskQuestionModalOpen(true);
		});

		expect(result.current.askQuestionModalOpen).toBeTruthy();

		act(() => {
			result.current.toggleAskQuestionModalOpen();
		});

		expect(result.current.askQuestionModalOpen).not.toBeTruthy();
	});

	it("should handle product image modal state change", () => {
		const { result } = renderHook(() => useModalsStore());

		expect(result.current.productImageModalOpen).not.toBeTruthy();
		expect(result.current.productImageModalUrl).toBe("");

		act(() => {
			result.current.setProductImageModalOpen(true);
		});

		expect(result.current.productImageModalOpen).toBeTruthy();

		act(() => {
			result.current.setProductImageModalUrl("image-url");
			result.current.toggleProductImageModalOpen();
		});

		expect(result.current.productImageModalOpen).not.toBeTruthy();
		expect(result.current.productImageModalUrl).toEqual("image-url");
	});
});
