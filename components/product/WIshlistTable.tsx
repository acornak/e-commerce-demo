"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// Animations
import { motion } from "framer-motion";
// Types and constants
import { Product } from "@/lib/models/product";
import { colors } from "@/lib/config/constants";
// Store
import {
	updateWishlistStore,
	useWishlistStore,
} from "@/lib/stores/wishlist-store";
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
import { updateCartStore } from "@/lib/stores/cart-store";
import { useModalsStore } from "@/lib/stores/modals-store";
// Hooks
import useHydration from "@/lib/hooks/use-hydration";
import StyledLoading from "../styled/Loading";
// Icons
import TrashIcon from "../icon/Trash";

type WishlistItemProps = {
	productId: number;
};

const WishlistItem: FC<WishlistItemProps> = ({ productId }): JSX.Element => {
	const [product, setProduct] = useState<Product | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	// Wishlist Store
	const removeWishlistItem = useWishlistStore((state) => state.removeItem);
	// Modal Store
	const setProductPreviewModalOpen = useModalsStore(
		(state) => state.setProductPreviewModalOpen,
	);
	const setPreviewProductId = useModalsStore(
		(state) => state.setPreviewProductId,
	);

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

	useEffect(() => {
		fetchProductById(productId, setProduct);
		fetchProductImage(productId, setImageUrl);
	}, [productId]);

	const handleAddToCart = () => {
		if (product) {
			setProductPreviewModalOpen(true);
			setPreviewProductId(productId);
		}
	};

	return (
		<>
			<td className="px-6 py-4 text-sm font-medium text-gray-900">
				<div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4">
					{product && imageUrl && (
						<Link
							href={`/products/${product.slug}`}
							className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2"
						>
							<Image
								src={imageUrl}
								width={100}
								height={100}
								alt={product?.name}
							/>
							<span>{product?.name}</span>
						</Link>
					)}
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
				${product?.price.toFixed(2)}
			</td>
			<td className="pl-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{product && (
					<motion.button
						initial={{
							color: colors.white,
							backgroundColor: colors.black,
						}}
						whileHover={{
							color: colors.white,
							backgroundColor: colors.secondary,
						}}
						whileTap={{
							color: colors.white,
							backgroundColor: colors.secondary,
						}}
						className="uppercase text-sm px-6 py-4 sm:tracking-widest"
						onClick={handleAddToCart}
					>
						Add to cart
					</motion.button>
				)}
			</td>
			<td className="py-4 whitespace-nowrap text-sm text-gray-500">
				<motion.button
					initial={{ color: colors.black }}
					whileHover={{ color: colors.secondary }}
					whileTap={{ color: colors.secondary }}
					transition={{ duration: 0.2 }}
					onClick={() => removeWishlistItem({ productId })}
					type="button"
					aria-label="Remove item"
				>
					<TrashIcon />
				</motion.button>
			</td>
		</>
	);
};

const WishlistTable = () => {
	const items = useWishlistStore((state) => state.items);
	const hydrated = useHydration(useWishlistStore);

	useEffect(() => {
		document.addEventListener("visibilitychange", updateWishlistStore);
		window.addEventListener("focus", updateWishlistStore);
		return () => {
			document.removeEventListener(
				"visibilitychange",
				updateWishlistStore,
			);
			window.removeEventListener("focus", updateWishlistStore);
		};
	}, []);

	if (!hydrated) {
		return <StyledLoading />;
	}

	return (
		<>
			<table className="w-[90%] pb-6 mx-2">
				<thead className="border border-1 border-gray-300 w-full">
					<tr>
						<th
							scope="col"
							className="w-1/3 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-r border-gray-300"
						>
							Product Name
						</th>
						<th
							scope="col"
							className="w-1/4 px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider hidden sm:table-cell"
						>
							Price
						</th>
						<th
							scope="col"
							className="w-1/4 px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider border-gray-300 border-l"
						>
							Action
						</th>
						<th
							scope="col"
							className="w-1/6 px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider"
						>
							{" "}
						</th>
					</tr>
				</thead>
				<tbody className="bg-white border border-1 border-gray-300">
					{items.map((item, index) => (
						<tr
							key={item.productId + Math.random() * 46656}
							className={`border-b ${
								index !== items.length - 1
									? "border-gray-300"
									: ""
							}`}
						>
							<WishlistItem productId={item.productId} />
						</tr>
					))}
				</tbody>
			</table>
			{items.length === 0 ? (
				<div className="py-6">
					<div className="text-lg pb-6 px-4 text-sm">
						Looks like you haven&apos;t added any items to your
						Wishlist.
					</div>
					<Link href="/products?page=1">
						<motion.button
							initial={{
								color: colors.white,
								backgroundColor: colors.black,
							}}
							whileHover={{
								color: colors.white,
								backgroundColor: colors.secondary,
							}}
							whileTap={{
								color: colors.white,
								backgroundColor: colors.secondary,
							}}
							className="uppercase px-6 py-4 tracking-widest"
						>
							Start shopping
						</motion.button>
					</Link>
				</div>
			) : (
				<Link href="/products?page=1">
					<motion.button
						initial={{
							color: colors.white,
							backgroundColor: colors.black,
						}}
						whileHover={{
							color: colors.white,
							backgroundColor: colors.secondary,
						}}
						whileTap={{
							color: colors.white,
							backgroundColor: colors.secondary,
						}}
						className="uppercase px-6 mt-10 mb-6 py-4 tracking-widest"
					>
						Continue shopping
					</motion.button>
				</Link>
			)}
		</>
	);
};

export default WishlistTable;
