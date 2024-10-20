"use client";

import React, { FC, useEffect, useRef, useState } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Store
import { updateCartStore, useCartStore } from "@/lib/stores/cart-store";
import { useModalsStore } from "@/lib/stores/modals-store";
// Functions
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
// Types and constants
import { Product, Size } from "@/lib/config/types";
import { colors } from "@/lib/config/constants";
// Components
import useOutsideAlerter from "@/lib/hooks/outside-click";
import StyledLoading from "../styled/Loading";
// Icons
import CloseIcon from "../icon/Close";
import SizePicker from "../common/SizePicker";

const ProductPreviewModal: FC = (): JSX.Element => {
	const modalRef = useRef<HTMLDivElement>(null);
	const productPreviewModalOpen = useModalsStore(
		(state) => state.productPreviewModalOpen,
	);

	const [selectedSize, setSelectedSize] = useState<Size | null>(null);
	const [product, setProduct] = useState<Product | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [quantity, setQuantity] = useState<number>(1);
	const [error, setError] = useState<string | null>(null);
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
		setSelectedSize(null);
		setQuantity(1);
	}, [productPreviewModalOpen]);

	useEffect(() => {
		if (!productId) return;
		setLoading(true);
		const fetchData = async () => {
			try {
				const fetchedProduct = await fetchProductById(productId);
				setProduct(fetchedProduct);

				const fetchedUrl = await fetchProductImage(productId);
				setImageUrl(fetchedUrl);
			} catch (err) {
				console.error("Fetching product failed:", err);
				setError("Something went wrong. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [productId]);

	const handleAddToCart = () => {
		if (product && selectedSize) {
			addItem({
				productId: product.id,
				price: product.price,
				quantity,
				sizeId: selectedSize.id,
			});
			setProductPreviewModalOpen(false);
			setCartProduct(product, selectedSize);
			setProductAddedModalOpen(true);
			setQuantity(1);
		}
	};

	useOutsideAlerter(modalRef, () => {
		if (productPreviewModalOpen) setProductPreviewModalOpen(false);
	});

	const handleContent = () => {
		// TODO: add error notification
		if (error) {
			setProductPreviewModalOpen(false);
			return <></>;
		}

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
				data-testid="product-preview-modal"
			>
				<motion.div
					ref={modalRef}
					className="relative bg-white p-6 w-full lg:max-w-[60%] xl:max-w-[50%] m-4 max-h-[90%]"
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
						data-testid="close-product-preview-modal"
					>
						<CloseIcon />
					</motion.button>
					<div className="grid grid-cols-1 sm:grid-cols-2 w-full">
						<div className="relative flex justify-center items-center mb-4">
							<Link
								href={`/products/${product.slug}`}
								onClick={() => {
									setProductPreviewModalOpen(false);
								}}
							>
								<Image
									src={imageUrl}
									alt={product.name}
									width={500}
									height={500}
									className="mx-auto w-3/5 sm:w-full"
									data-testid="product-preview-image"
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

							<SizePicker
								product={product}
								selectedSize={selectedSize}
								setSelectedSize={setSelectedSize}
							/>

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
										data-testid="decrease-quantity"
									>
										-
									</button>
									<div
										className="w-12 text-center select-none"
										data-testid="quantity"
									>
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
										data-testid="increase-quantity"
									>
										+
									</button>
								</div>
								<div className="col-span-2">
									<button
										type="button"
										className={`px-4 py-2 uppercase tracking-widest font-semibold ${
											selectedSize != null
												? "bg-secondary text-white hover:bg-black"
												: "bg-white text-gray-300 border border-gray-300"
										}`}
										onClick={handleAddToCart}
										disabled={selectedSize === null}
										data-testid="add-to-cart"
									>
										Add to cart
									</button>
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
