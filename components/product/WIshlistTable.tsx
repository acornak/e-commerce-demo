"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Types and constants
import { Product } from "@/lib/models/product";
import colors from "@/lib/config/constants";
// Store
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import {
	fetchProduct,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
// Icons
import { useCartStore } from "@/lib/stores/cart-store";
import Image from "next/image";
import useHydration from "@/lib/hooks/use-hydratation";
import StyledLoading from "../styled/Loading";
import TrashIcon from "../icon/Trash";

type WishlistItemProps = {
	productId: number;
};

const WishlistItem: FC<WishlistItemProps> = ({ productId }): JSX.Element => {
	const [product, setProduct] = useState<Product | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const removeWishlistItem = useWishlistStore((state) => state.removeItem);
	const addCartItem = useCartStore((state) => state.addItem);

	useEffect(() => {
		fetchProduct(productId, setProduct);
		fetchProductImage(productId, setImageUrl);
	}, [productId]);

	return (
		<>
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
				<div className="flex items-center space-x-4">
					{product && imageUrl && (
						<Link href={`/products/${product.slug}`}>
							<Image
								src={imageUrl}
								width={100}
								height={100}
								alt={product?.name}
							/>
						</Link>
					)}
					{product?.name}
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
						className="uppercase text-sm px-3 py-2 sm:tracking-widest"
						onClick={() =>
							addCartItem({
								productId,
								price: product?.price,
								quantity: 1,
							})
						}
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

	if (!hydrated) {
		return <StyledLoading />;
	}

	return (
		<>
			<table className="w-2/3 pb-6 mx-2">
				<thead className="border border-1 border-gray-300 w-full">
					<tr>
						<th
							scope="col"
							className="w-1/3 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
						>
							Product Name
						</th>
						<th
							scope="col"
							className="w-1/4 px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider border-l border-r border-gray-300 hidden sm:table-cell"
						>
							Price
						</th>
						<th
							scope="col"
							className="w-1/4 px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider"
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
					{items.map((item) => (
						<tr key={item.productId}>
							<WishlistItem productId={item.productId} />
						</tr>
					))}
				</tbody>
			</table>
			{items.length === 0 ? (
				<div className="py-6">
					<div className="text-lg pb-6">
						Looks like you haven&apos;t added any items to your
						Wishlist.
					</div>
					<Link href="/products">
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
				<Link href="/products">
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
