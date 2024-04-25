"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Types and constants
import { Product } from "@/lib/models/product";
import colors from "@/lib/config/constants";
// Store
import { updateCartStore, useCartStore } from "@/lib/stores/cart-store";
import {
	updateWishlistStore,
	useWishlistStore,
} from "@/lib/stores/wishlist-store";
import { useModalsStore } from "@/lib/stores/modals-store";
// Functions
import { fetchProductImage } from "@/lib/functions/product-fetcher";
// Icons
import HeartIcon from "../icon/Heart";
import BagIcon from "../icon/Bag";
import MagnifierIcon from "../icon/Magnifier";
import CheckmarkRoundIcon from "../icon/CheckmarkRound";

type ProductButtonProps = {
	children: ReactNode;
	tooltipText: string;
	setHovered: (hovered: boolean) => void;
	onClickEvent?: any;
};

const tooltipVariants = {
	hidden: { opacity: 0, y: -10, scale: 0.5 },
	visible: { opacity: 1, y: 0, scale: 1 },
};

const ProductButton: FC<ProductButtonProps> = ({
	children,
	tooltipText,
	setHovered,
	onClickEvent,
}): JSX.Element => {
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

	return (
		<div className="relative flex items-center" onClick={onClickEvent}>
			<motion.button
				tabIndex={0}
				whileHover={{
					scale: 1.1,
					backgroundColor: colors.secondary,
					color: colors.white,
				}}
				whileTap={{
					scale: 1.1,
					backgroundColor: colors.secondary,
					color: colors.white,
				}}
				onMouseEnter={() => {
					setShowTooltip(true);
					setHovered(true);
				}}
				onMouseLeave={() => setShowTooltip(false)}
				onClick={() => {
					setShowTooltip(false);
				}}
				className="bg-white rounded-full p-2 m-1"
				type="button"
				aria-label="Go to the product page"
			>
				{children}
			</motion.button>
			<motion.span
				className="absolute bottom-full mb-2 w-auto min-w-[160px] p-3 bg-black text-white text-xs rounded z-50 -translate-x-1/2 right-1/2"
				initial="hidden"
				animate={showTooltip ? "visible" : "hidden"}
				variants={tooltipVariants}
				style={{ whiteSpace: "nowrap" }}
			>
				{tooltipText}
			</motion.span>
		</div>
	);
};

type ProductPreviewProps = {
	product: Product;
};

const ProductPreview: FC<ProductPreviewProps> = ({ product }): JSX.Element => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [hovered, setHovered] = useState<boolean>(false);
	// Cart store
	const addCartItem = useCartStore((state) => state.addItem);
	const cartItems = useCartStore((state) => state.items);
	// Wishlist store
	const wishlistItems = useWishlistStore((state) => state.items);
	const addWishlistItem = useWishlistStore((state) => state.addItem);
	const removeWishlistItem = useWishlistStore((state) => state.removeItem);
	// Modals store
	const setProductAddedModalOpen = useModalsStore(
		(state) => state.setProductAddedModalOpen,
	);
	const setProductPreviewModalOpen = useModalsStore(
		(state) => state.setProductPreviewModalOpen,
	);
	const setPreviewProductId = useModalsStore(
		(state) => state.setPreviewProductId,
	);
	const setCartProduct = useModalsStore((state) => state.setCartProduct);

	setPreviewProductId(product.id);

	useEffect(() => {
		document.addEventListener("visibilitychange", updateCartStore);
		document.addEventListener("visibilitychange", updateWishlistStore);
		window.addEventListener("focus", updateWishlistStore);
		window.addEventListener("focus", updateCartStore);
		return () => {
			document.removeEventListener(
				"visibilitychange",
				updateWishlistStore,
			);
			document.removeEventListener("visibilitychange", updateCartStore);
			window.removeEventListener("focus", updateWishlistStore);
			window.removeEventListener("focus", updateCartStore);
		};
	}, []);

	const hasHover = () => {
		return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
	};

	const itemAlreadyInCart = cartItems.some(
		(item) => item.productId === product.id,
	);

	const itemAlreadyInWishlist = wishlistItems.some(
		(item) => item.productId === product.id,
	);

	const handleAddToCart = () => {
		if (product) {
			addCartItem({
				productId: product.id,
				price: product.price,
				quantity: 1,
			});
			setCartProduct(product);
			setProductAddedModalOpen(true);
			setHovered(false);
		}
	};

	const handleAddToWishlist = () => {
		if (product) {
			if (itemAlreadyInWishlist) {
				removeWishlistItem({
					productId: product.id,
				});
			} else {
				addWishlistItem({
					productId: product.id,
				});
			}
		}
	};

	useEffect(() => {
		fetchProductImage(product.id, setImageUrl);
	}, [product.id]);

	return (
		<div className="flex flex-col items-center">
			<div
				className="relative flex justify-center items-center"
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...(hasHover() && {
					onMouseEnter: () => setHovered(true),
					onMouseLeave: () => setHovered(false),
				})}
			>
				{imageUrl && (
					<>
						<Link
							href={`/products/${product.slug}`}
							className="cursor-pointer"
						>
							<Image
								src={imageUrl}
								alt={product.name}
								width={500}
								height={500}
							/>
						</Link>
						<AnimatePresence>
							{hovered && (
								<motion.div
									className="flex flex-col absolute right-10 top-0 h-full justify-center items-center space-y-2 p-2"
									initial={{ opacity: 0, x: 50 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 50 }}
									transition={{
										duration: 0.3,
										type: "tween",
										ease: "easeInOut",
									}}
								>
									<ProductButton
										setHovered={setHovered}
										tooltipText={
											itemAlreadyInWishlist
												? "Item added to wishlist"
												: "Add to wishlist"
										}
										onClickEvent={handleAddToWishlist}
									>
										{itemAlreadyInWishlist ? (
											<CheckmarkRoundIcon />
										) : (
											<HeartIcon />
										)}
									</ProductButton>
									<ProductButton
										setHovered={setHovered}
										tooltipText={
											itemAlreadyInCart
												? "Item added to cart"
												: "Add to cart"
										}
										onClickEvent={handleAddToCart}
									>
										{itemAlreadyInCart ? (
											<CheckmarkRoundIcon />
										) : (
											<BagIcon />
										)}
									</ProductButton>

									<ProductButton
										setHovered={setHovered}
										tooltipText="Quick preview"
										onClickEvent={() =>
											setProductPreviewModalOpen(true)
										}
									>
										<MagnifierIcon />
									</ProductButton>
								</motion.div>
							)}
						</AnimatePresence>
					</>
				)}
			</div>
			<div className="text-sm flex flex-col items-center min-h-12 text-center mt-4">
				{product.name}
			</div>
			<div className="text-base flex flex-row items-center font-bold text-secondary space-x-2 justify-center">
				${product.price}
				{product.previousPrice &&
					product.previousPrice > product.price && (
						<span className="pl-2 text-sm line-through text-gray-400">
							${product.previousPrice}
						</span>
					)}
			</div>
		</div>
	);
};

export default ProductPreview;
