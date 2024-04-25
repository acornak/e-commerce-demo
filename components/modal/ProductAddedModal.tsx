import React, { FC, useEffect, useState } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Functions
import { fetchProductImage } from "@/lib/functions/product-fetcher";
// Store
import { updateCartStore, useCartStore } from "@/lib/stores/cart-store";
import { useModalsStore } from "@/lib/stores/modals-store";
// Types and constants
import colors from "@/lib/config/constants";
import { Product } from "@/lib/models/product";
// Icons
import CloseIcon from "../icon/Close";
import CheckmarkIcon from "../icon/Checkmark";

const ProductAddedModal: FC = () => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	// Cart Store
	const cartItems = useCartStore((state) => state.items);
	// Modal Store
	const productAddedModalOpen = useModalsStore(
		(state) => state.productAddedModalOpen,
	);
	const setProductAddedModalOpen = useModalsStore(
		(state) => state.setProductAddedModalOpen,
	);
	const cartProduct = useModalsStore((state) => state.cartProduct);

	useEffect(() => {
		document.addEventListener("visibilitychange", updateCartStore);
		window.addEventListener("focus", updateCartStore);
		return () => {
			document.removeEventListener("visibilitychange", updateCartStore);
			window.removeEventListener("focus", updateCartStore);
		};
	}, []);

	function getItemQty(productId: number): number {
		const item = cartItems.filter((i) => i.productId === productId)[0];
		return item.quantity;
	}

	function totalItemPrice(p: Product): number {
		const qty = getItemQty(p.id);
		return qty * p.price;
	}

	function totalCartPrice(): number {
		return cartItems
			.map((item) => item.quantity * item.price)
			.reduce((a, b) => a + b, 0);
	}

	useEffect(() => {
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
						onClick={() => setProductAddedModalOpen(false)}
					>
						<motion.div
							initial={{ scale: 0.9 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.9 }}
							transition={{ duration: 0.3 }}
							className="relative bg-white w-full max-w-4xl px-10 py-6 text-center flex"
							onClick={(e) => e.stopPropagation()}
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
									/>
								)}
								<p>{cartProduct.name}</p>
								<p className="flex items-center m-1">
									<span className="text-xs uppercase font-semibold">
										Price:
									</span>
									<span className="pl-2 text-secondary">
										${cartProduct.price.toFixed(2)}
									</span>
								</p>
								<p className="flex items-center m-1">
									<span className="text-xs uppercase font-semibold">
										QTY:
									</span>
									<span className="pl-2 text-secondary">
										{getItemQty(cartProduct.id)}
									</span>
								</p>
								<p className="flex items-center m-1">
									<span className="text-xs uppercase font-semibold">
										Total:
									</span>
									<span className="pl-2 text-secondary">
										$
										{totalItemPrice(cartProduct).toFixed(2)}
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
										${totalCartPrice().toFixed(2)}
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
									className="w-full md:w-2/3 mt-6 py-4 bg-secondary"
								>
									<Link
										href="/cart"
										className="text-white font-semibold uppercase text-sm tracking-widest"
									>
										Go to cart
									</Link>
								</motion.button>
								<motion.button
									whileHover={{
										backgroundColor: colors.black,
									}}
									whileTap={{
										backgroundColor: colors.black,
									}}
									className="w-full md:w-2/3 mt-6 py-4 bg-secondary"
								>
									<Link
										href="/checkout"
										className="text-white font-semibold uppercase text-sm tracking-widest"
									>
										Proceed to checkout
									</Link>
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
