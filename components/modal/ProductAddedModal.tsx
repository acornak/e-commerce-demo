import React, { FC, useEffect, useRef, useState } from "react";
// Next
import Image from "next/image";
import { useRouter } from "next/navigation";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Functions
import { fetchProductImage } from "@/lib/functions/product-fetcher";
import {
	getCartItemQty,
	totalCartItemPrice,
	totalCartPrice,
} from "@/lib/functions/cart-helpers";
import useOutsideAlerter from "@/lib/hooks/outside-click";
import { handleCheckout } from "@/lib/functions/checkout";
// Store
import { updateCartStore, useCartStore } from "@/lib/stores/cart-store";
import { useModalsStore } from "@/lib/stores/modals-store";
// Types and constants
import { auth } from "@/lib/config/firebase";
import { colors } from "@/lib/config/constants";
// Icons
import CloseIcon from "../icon/Close";
import CheckmarkIcon from "../icon/Checkmark";

const ProductAddedModal: FC = () => {
	const modalRef = useRef<HTMLDivElement>(null);

	const router = useRouter();

	const [imageUrl, setImageUrl] = useState<string | null>(null);
	// Cart Store
	const cartItems = useCartStore((state) => state.items);
	const clearCart = useCartStore((state) => state.clearCart);
	// Modal Store
	const productAddedModalOpen = useModalsStore(
		(state) => state.productAddedModalOpen,
	);
	const setProductAddedModalOpen = useModalsStore(
		(state) => state.setProductAddedModalOpen,
	);
	const cartProduct = useModalsStore((state) => state.cartProduct);

	useOutsideAlerter(modalRef, () => {
		if (productAddedModalOpen) setProductAddedModalOpen(false);
	});

	useEffect(() => {
		document.addEventListener("visibilitychange", updateCartStore);
		window.addEventListener("focus", updateCartStore);
		return () => {
			document.removeEventListener("visibilitychange", updateCartStore);
			window.removeEventListener("focus", updateCartStore);
		};
	}, []);

	useEffect(() => {
		console.log(cartProduct);
		if (cartProduct) fetchProductImage(cartProduct.id, setImageUrl);
	}, [cartProduct]);

	return (
		<div className="hidden sm:block">
			<AnimatePresence>
				{cartProduct && productAddedModalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-50 flex items-center justify-center"
						data-testid="product-added-modal"
					>
						<motion.div
							ref={modalRef}
							initial={{ scale: 0.9 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.9 }}
							transition={{ duration: 0.3 }}
							className="relative bg-white w-full max-w-4xl px-10 py-6 text-center flex"
						>
							<div className="w-1/2 p-4 flex flex-col items-center">
								<h3 className="text-secondary flex items-center">
									<CheckmarkIcon />
									Added to cart successfully!
								</h3>
								{imageUrl && (
									<Image
										src={imageUrl}
										width={150}
										height={150}
										alt={cartProduct.name}
										className="my-4"
										data-testid="product-added-modal-image"
									/>
								)}
								<p data-testid="product-added-modal-name">
									{cartProduct.name}
								</p>
								<p className="flex items-center m-1">
									<span className="text-xs uppercase font-semibold">
										Price:
									</span>
									<span
										className="pl-2 text-secondary"
										data-testid="product-added-modal-price"
									>
										${cartProduct.price.toFixed(2)}
									</span>
								</p>
								<p className="flex items-center m-1">
									<span className="text-xs uppercase font-semibold">
										Size:
									</span>
									<span
										className="pl-2 text-secondary"
										data-testid="product-added-modal-size"
									>
										{cartProduct.selectedSize.name}
									</span>
								</p>
								<p className="flex items-center m-1">
									<span className="text-xs uppercase font-semibold">
										QTY:
									</span>
									<span
										className="pl-2 text-secondary"
										data-testid="product-added-modal-qty"
									>
										{getCartItemQty(
											cartItems,
											cartProduct.id,
											cartProduct.selectedSize.id,
										)}
									</span>
								</p>
								<p className="flex items-center m-1">
									<span className="text-xs uppercase font-semibold">
										Total:
									</span>
									<span
										className="pl-2 text-secondary"
										data-testid="product-added-modal-total"
									>
										$
										{totalCartItemPrice(
											cartItems,
											cartProduct,
											cartProduct.selectedSize.id,
										).toFixed(2)}
									</span>
								</p>
							</div>

							<div className="w-1/2 p-4 flex flex-col items-center">
								<h3>
									There are{" "}
									<span className="text-secondary">
										{cartItems.length}
									</span>{" "}
									items in your cart
								</h3>
								<p className="m-1 pt-4">
									<span className="text-xs uppercase font-semibold">
										Total price:
									</span>
									<span className="pl-2 text-secondary text-4xl">
										${totalCartPrice(cartItems).toFixed(2)}
									</span>
								</p>
								<motion.button
									whileHover={{
										backgroundColor: colors.secondary,
										color: colors.white,
									}}
									whileTap={{
										backgroundColor: colors.secondary,
										color: colors.white,
									}}
									className="w-full md:w-2/3 mt-6 py-4 border border-2 border-secondary text-black bg-white font-semibold uppercase text-sm tracking-widest"
									onClick={() =>
										setProductAddedModalOpen(false)
									}
									data-testid="product-added-modal-continue"
								>
									Continue Shopping
								</motion.button>
								<motion.button
									whileHover={{
										backgroundColor: colors.black,
									}}
									whileTap={{
										backgroundColor: colors.black,
									}}
									className="w-full md:w-2/3 py-4 text-white font-semibold uppercase text-sm tracking-widest mt-6 bg-secondary"
									onClick={() => {
										router.push("/cart");
										setProductAddedModalOpen(false);
									}}
									data-testid="product-added-modal-cart"
								>
									Go to cart
								</motion.button>
								<motion.button
									whileHover={{
										backgroundColor: colors.black,
									}}
									whileTap={{
										backgroundColor: colors.black,
									}}
									className="w-full md:w-2/3 mt-6 py-4 bg-secondary text-white font-semibold uppercase text-sm tracking-widest"
									onClick={() => {
										handleCheckout(
											cartItems,
											auth.currentUser?.email || "",
										);
										clearCart();
										setProductAddedModalOpen(false);
									}}
									data-testid="product-added-modal-checkout"
								>
									Proceed to checkout
								</motion.button>
							</div>
							<motion.button
								initial={{ rotate: 0, color: colors.white }}
								whileHover={{
									rotate: 180,
									color: colors.secondary,
								}}
								whileTap={{
									rotate: 180,
									color: colors.secondary,
								}}
								transition={{ duration: 0.2 }}
								className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 -mt-8"
								onClick={() => setProductAddedModalOpen(false)}
								data-testid="product-added-modal-close"
							>
								<CloseIcon />
							</motion.button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ProductAddedModal;
