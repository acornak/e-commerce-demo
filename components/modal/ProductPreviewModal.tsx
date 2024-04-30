"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Types and constants
import { Product } from "@/lib/models/product";
import { colors } from "@/lib/config/constants";
// Store
import { updateCartStore, useCartStore } from "@/lib/stores/cart-store";
import { useModalsStore } from "@/lib/stores/modals-store";
// Functions
import {
	fetchProduct,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
// Components
import StyledLoading from "../styled/Loading";
// Icons
import CloseIcon from "../icon/Close";

const ProductPreviewModal: FC = (): JSX.Element => {
	const productPreviewModalOpen = useModalsStore(
		(state) => state.productPreviewModalOpen,
	);
	const [product, setProduct] = useState<Product | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [quantity, setQuantity] = useState<number>(1);
	const addItem = useCartStore((state) => state.addItem);

	// Modals store
	const setProductAddedModalOpen = useModalsStore(
		(state) => state.setProductAddedModalOpen,
	);
	const setProductPreviewModalOpen = useModalsStore(
		(state) => state.setProductPreviewModalOpen,
	);
	const productId = useModalsStore((state) => state.previewProductId);
	const setCartProduct = useModalsStore((state) => state.setCartProduct);

	useEffect(() => {
		document.addEventListener("visibilitychange", updateCartStore);
		window.addEventListener("focus", updateCartStore);
		return () => {
			document.removeEventListener("visibilitychange", updateCartStore);
			window.removeEventListener("focus", updateCartStore);
		};
	}, []);

	useEffect(() => {
		if (!productId) return () => {};
		fetchProduct(productId, setProduct);
		fetchProductImage(productId, setImageUrl);
		const timeout = setTimeout(() => setLoading(false), 400);
		return () => clearTimeout(timeout);
	}, [productId]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setProductPreviewModalOpen(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [setProductPreviewModalOpen]);

	const handleAddToCart = () => {
		if (product) {
			addItem({
				productId: product.id,
				price: product.price,
				quantity,
			});
			setProductPreviewModalOpen(false);
			setCartProduct(product);
			setProductAddedModalOpen(true);
			setQuantity(1);
		}
	};

	const handleContent = () => {
		if (loading || !product || !imageUrl) {
			return <StyledLoading />;
		}

		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
				className="fixed inset-0 z-50 flex items-center justify-center"
				onClick={() => {
					setProductPreviewModalOpen(false);
					setQuantity(1);
				}}
			>
				<motion.div
					className="relative bg-white p-6 w-full lg:max-w-[60%] xl:max-w-[50%] m-4 max-h-[80%]"
					initial={{ scale: 0.9 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0.9 }}
					transition={{ duration: 0.3 }}
					onClick={(e) => e.stopPropagation()}
				>
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
						onClick={() => setProductPreviewModalOpen(false)}
					>
						<CloseIcon />
					</motion.button>
					<div className="grid grid-cols-1 sm:grid-cols-2 w-full">
						<div className="relative flex justify-center items-center mb-4">
							<Link
								href={`/products/${product.slug}`}
								onClick={() => {
									setProductPreviewModalOpen(false);
									setQuantity(1);
								}}
							>
								<Image
									src={imageUrl}
									alt={product.name}
									width={500}
									height={500}
									className="mx-auto w-3/5 sm:w-full"
								/>
							</Link>
						</div>
						<div className="sm:text-start mt-8">
							<div className="text-lg flex flex-col min-h-12 font-semibold">
								{product.name}
							</div>
							<div className="justify-center sm:justify-start text-base items-center flex flex-row font-bold text-secondary space-x-2 mb-6">
								${product.price.toFixed(2)}
								{product.previousPrice &&
									product.previousPrice > product.price && (
										<span className="pl-2 text-sm line-through text-gray-400">
											${product.previousPrice.toFixed(2)}
										</span>
									)}
							</div>
							<hr />
							<div className="text-sm py-4 text-justify">
								{product.perex.slice(0, 200)}...
							</div>
							<hr />
							<div className="py-4 grid grid-cols-3 gap-4">
								<div className="flex items-center justify-center relative">
									<button
										type="button"
										className={`p-2 border ${
											quantity === 1
												? "border-gray-200 text-gray-300"
												: "border-gray-300 text-black"
										}`}
										onClick={() => {
											setQuantity((prev) => prev - 1);
										}}
										disabled={quantity === 1}
									>
										-
									</button>
									<div className="w-12 text-center select-none">
										{quantity}
									</div>
									<button
										type="button"
										className={`p-2 border ${
											quantity === 10
												? "border-gray-200 text-gray-300"
												: "border-gray-300 text-black"
										}`}
										onClick={() => {
											setQuantity((prev) => prev + 1);
										}}
										disabled={quantity === 10}
									>
										+
									</button>
								</div>
								<div className="col-span-2">
									<motion.button
										whileHover={{
											color: colors.white,
											backgroundColor: colors.black,
										}}
										whileTap={{
											color: colors.white,
											backgroundColor: colors.black,
										}}
										className="bg-secondary text-white px-4 py-2 uppercase tracking-widest font-semibold"
										onClick={handleAddToCart}
									>
										Add to cart
									</motion.button>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		);
	};

	return (
		<AnimatePresence>
			{productPreviewModalOpen && handleContent()}
		</AnimatePresence>
	);
};

export default ProductPreviewModal;
