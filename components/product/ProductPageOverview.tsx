"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Types and Constants
import { colors } from "@/lib/config/constants";
import { Product } from "@/lib/models/product";
// Stores
import { useWishlistStore } from "@/lib/stores/wishlist-store";
// Functions
import {
	fetchProduct,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
// Icons
import ChevronRightIcon from "../icon/ChevronRight";
import HeartIcon from "../icon/Heart";
import CheckmarkRoundIcon from "../icon/CheckmarkRound";
import StyledLoading from "../styled/Loading";

type ProductPageOverviewProps = {
	productId: number;
};

const ProductPageOverview: FC<ProductPageOverviewProps> = ({
	productId,
}): JSX.Element => {
	const [product, setProduct] = useState<Product>();
	const [imageUrl, setImageUrl] = useState<string | null>();
	const [showTooltip, setShowTooltip] = useState<boolean>(false);
	// Wishlist store
	const wishlistItems = useWishlistStore((state) => state.items);
	const addWishlistItem = useWishlistStore((state) => state.addItem);
	const removeWishlistItem = useWishlistStore((state) => state.removeItem);

	useEffect(() => {
		fetchProduct(productId, setProduct);
		fetchProductImage(productId, setImageUrl);

		document.getElementById("product-overview")?.scrollIntoView();
	}, []);

	const itemAlreadyInWishlist = wishlistItems.some(
		(item) => item.productId === productId,
	);

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

	if (!product || !imageUrl) {
		return (
			<div className="flex items-center justify-center h-screen">
				<StyledLoading />
			</div>
		);
	}

	return (
		<>
			<div
				className="text-start w-full px-4 flex items-center bg-gray-100 py-2"
				id="product-overview"
			>
				<Link href="/">
					<motion.p
						whileHover={{
							color: colors.secondary,
						}}
						whileTap={{
							color: colors.secondary,
						}}
						transition={{ duration: 0.2 }}
						className="inline"
					>
						Home
					</motion.p>
				</Link>
				<ChevronRightIcon />
				<Link href="/products">
					<motion.p
						whileHover={{
							color: colors.secondary,
						}}
						whileTap={{
							color: colors.secondary,
						}}
						transition={{ duration: 0.2 }}
						className="inline"
					>
						Products
					</motion.p>
				</Link>
				<ChevronRightIcon />
				<Link href={`/products/${product.slug}`}>
					<motion.p
						whileHover={{
							color: colors.secondary,
						}}
						whileTap={{
							color: colors.secondary,
						}}
						transition={{ duration: 0.2 }}
						className="inline"
					>
						{product.name}
					</motion.p>
				</Link>
			</div>
			<div className="flex flex-col md:flex-row my-10 mx-20">
				{imageUrl && (
					<div className="flex-1">
						<Image
							src={imageUrl}
							alt={product.name}
							width={800}
							height={800}
							objectFit="cover"
							priority
						/>
					</div>
				)}
				<div className="flex-1 ">
					<div className="xl:w-4/5">
						<div className="flex justify-between items-center pb-4">
							<p className="font-medium text-2xl tracking-widest">
								{product.name}
							</p>
							<button
								type="button"
								onMouseEnter={() => {
									setShowTooltip(true);
								}}
								onMouseLeave={() => setShowTooltip(false)}
								className="relative cursor-pointer hover:text-secondary transition-colors duration-200 ease-in-out"
								onClick={handleAddToWishlist}
							>
								{itemAlreadyInWishlist ? (
									<CheckmarkRoundIcon />
								) : (
									<HeartIcon />
								)}

								<motion.span
									className="absolute bottom-full mb-2 w-auto min-w-[160px] p-3 bg-black text-white text-xs rounded z-50 -translate-x-1/2 right-1/2 text-center"
									initial="hidden"
									animate={showTooltip ? "visible" : "hidden"}
									variants={{
										hidden: {
											opacity: 0,
											y: -10,
											scale: 0.5,
										},
										visible: { opacity: 1, y: 0, scale: 1 },
									}}
									style={{ whiteSpace: "nowrap" }}
								>
									{itemAlreadyInWishlist
										? "Remove from "
										: "Add to "}
									your wishlist
								</motion.span>
							</button>
						</div>
						<div className="flex items-center border-b border-gray-300 pb-10 mb-6">
							<p className="font-medium text-xl tracking-widest text-secondary">
								${product.price.toFixed(2)}
							</p>
							{product.previousPrice &&
								product.previousPrice > product.price && (
									<span className="pl-2 line-through text-gray-400">
										${product.previousPrice.toFixed(2)}
									</span>
								)}
						</div>
						<div className="pb-4">
							<p className="text-sm leading-8 text-justify text-gray-500">
								{product.description}
							</p>
						</div>
						<div className="border border-gray-200 relative mt-4">
							<p className="font-medium text-green-600 uppercase tracking-widest bg-white absolute -top-4 left-1/4 text-xl">
								Special Offer
							</p>
							<ul className="pt-4 text-green-600">
								<li className="flex items-center justify-between py-2 px-4">
									<p className="text-sm">Free Shipping</p>
									<p className="text-sm text-green-600">
										+$0.00
									</p>
								</li>
								<li className="flex items-center justify-between py-2 px-4">
									<p className="text-sm">Free Returns</p>
									<p className="text-sm">+$0.00</p>
								</li>
								<li className="flex items-center justify-between py-2 px-4">
									<p className="text-sm">
										Money Back Guarantee
									</p>
									<p className="text-sm">+$0.00</p>
								</li>
							</ul>
						</div>
						<div />
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductPageOverview;
