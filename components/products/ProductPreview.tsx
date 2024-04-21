"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
// Next
import Image from "next/image";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Icons
import { Product } from "@/lib/models/Product";
import Link from "next/link";
import HeartIcon from "../icons/Heart";
import BagIcon from "../icons/Bag";
import MagnifierIcon from "../icons/Magnifier";
// Types

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
					backgroundColor: "#F6347",
					color: "#FFFFFF",
				}}
				whileTap={{
					scale: 1.1,
					backgroundColor: "#F6347",
					color: "#FFFFFF",
				}}
				onMouseEnter={() => {
					setShowTooltip(true);
					setHovered(true);
				}}
				onMouseLeave={() => setShowTooltip(false)}
				className="bg-white rounded-full p-2 m-1 cursor-pointer"
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

const ProductModal = ({ product }: { product: Product }): JSX.Element => {
	return (
		<div className="flex flex-col items-center">
			<div className="relative flex justify-center items-center">
				<Image
					src={`/api/products/image?productId=${product.id}`}
					alt={product.name}
					width={500}
					height={500}
				/>
			</div>
			<div className="text-sm flex flex-col items-center min-h-12 text-center">
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

type ProductPreviewProps = {
	product: Product;
};

const ProductPreview: FC<ProductPreviewProps> = ({ product }): JSX.Element => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [hovered, setHovered] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	useEffect(() => {
		fetch(`/api/products/image?productId=${product.id}`)
			.then((response) => response.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				setImageUrl(url);
				return () => URL.revokeObjectURL(url);
			})
			.catch((error) => console.error("Fetching image failed:", error));
	}, [product.id]);

	const handleAddToCart = () => {
		console.log("Added to cart");
	};

	return (
		<>
			{modalOpen && <ProductModal product={product} />}
			<div className="flex flex-col items-center">
				<div className="relative flex justify-center items-center">
					{imageUrl && (
						<>
							<Link href={`/products/${product.slug}`}>
								<Image
									src={imageUrl}
									alt={product.name}
									width={500}
									height={500}
									onMouseEnter={() => setHovered(true)}
									onMouseLeave={() => setHovered(false)}
									onTouchStart={() =>
										setHovered((prev) => !prev)
									}
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
										<Link href="/wishlist">
											<ProductButton
												setHovered={setHovered}
												tooltipText="Add to wishlist"
											>
												<HeartIcon />
											</ProductButton>
										</Link>
										<ProductButton
											setHovered={setHovered}
											tooltipText="Add to cart"
											onClickEvent={handleAddToCart}
										>
											<BagIcon />
										</ProductButton>

										<ProductButton
											setHovered={setHovered}
											tooltipText="Quick preview"
											onClickEvent={() =>
												setModalOpen(true)
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
				<div className="text-sm flex flex-col items-center min-h-12 text-center">
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
		</>
	);
};

export default ProductPreview;
