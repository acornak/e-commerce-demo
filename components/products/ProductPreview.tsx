"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Types
import { Product } from "@/lib/models/Product";
// Icons
import HeartIcon from "../icons/Heart";
import BagIcon from "../icons/Bag";
import MagnifierIcon from "../icons/Magnifier";
import CloseIcon from "../icons/Close";

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
				onClick={() => {
					setShowTooltip(false);
					setHovered(false);
				}}
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

type ProductModalProps = {
	product: Product;
	imageUrl: string;
	modalOpen: boolean;
	setModalOpen: (open: boolean) => void;
};

const ProductModal: FC<ProductModalProps> = ({
	product,
	imageUrl,
	modalOpen,
	setModalOpen,
}): JSX.Element => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setModalOpen(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [setModalOpen]);

	const handleOutsideClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		if (event.target === event.currentTarget) {
			setModalOpen(false);
		}
	};

	return (
		<AnimatePresence>
			{modalOpen && (
				<motion.div
					className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
					onClick={handleOutsideClick}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<motion.div
						className="relative bg-white p-6 w-full lg:max-w-[60%] xl:max-w-[50%] m-4 max-h-[80%]"
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.9 }}
						transition={{ duration: 0.3 }}
					>
						<motion.button
							initial={{ rotate: 0, color: "#FFFFFF" }}
							whileHover={{ rotate: 180, color: "#FF6347" }}
							transition={{ duration: 0.2 }}
							className="absolute -top-4 -right-2 transform -translate-y-1/2 translate-x-1/2 -mt-8"
							onClick={() => setModalOpen(false)}
						>
							<CloseIcon />
						</motion.button>
						<div className="grid grid-cols-1 sm:grid-cols-2 w-full">
							<div className="relative flex justify-center items-center mb-4">
								<Link href={`/products/${product.slug}`}>
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
										product.previousPrice >
											product.price && (
											<span className="pl-2 text-sm line-through text-gray-400">
												$
												{product.previousPrice.toFixed(
													2,
												)}
											</span>
										)}
								</div>
								<hr />
								<div className="text-sm py-4 text-justify">
									{product.description.slice(0, 200)}...
								</div>
								<hr />
								<div className="py-4 grid grid-cols-3 gap-4">
									<div className="col-span-1">
										<input
											type="number"
											id="quantity"
											name="quantity"
											min="1"
											max="10"
											defaultValue="1"
											className="w-20 p-2 border border-gray-300 text-center text-lg"
										/>
									</div>
									<div className="col-span-2">
										<motion.button
											whileHover={{
												color: "#FFFFFF",
												backgroundColor: "#000000",
											}}
											className="bg-secondary text-white px-4 py-2 uppercase tracking-widest font-semibold"
											onClick={() => setModalOpen(false)}
										>
											Add to cart
										</motion.button>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
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
			{imageUrl && (
				<ProductModal
					product={product}
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					imageUrl={imageUrl}
				/>
			)}
			<div className="flex flex-col items-center">
				<div
					className="relative flex justify-center items-center"
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					onTouchStart={() => setHovered((prev) => !prev)}
				>
					{imageUrl && (
						<>
							<Link href={`/products/${product.slug}`}>
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
		</>
	);
};

export default ProductPreview;
