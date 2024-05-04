"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// Animations
import { motion } from "framer-motion";

// Functions
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
import { getCartItemSize } from "@/lib/functions/cart-helpers";
import { fetchAllSizes } from "@/lib/functions/size-fetcher";
// Store
import {
	CartItem,
	updateCartStore,
	useCartStore,
} from "@/lib/stores/cart-store";
// Hooks
import useHydration from "@/lib/hooks/use-hydration";
// Types and constants
import { Product } from "@/lib/models/product";
import { colors } from "@/lib/config/constants";
import { Size } from "@/lib/models/size";
// Components
import StyledLoading from "../styled/Loading";
// Icons
import TrashIcon from "../icon/Trash";

type CartTableItemProps = {
	item: CartItem;
};

interface CartItemMobileProps extends CartTableItemProps {
	shouldRenderHr: boolean;
}

const CartItemMobile: FC<CartItemMobileProps> = ({
	item,
	shouldRenderHr,
}): JSX.Element => {
	const [product, setProduct] = useState<Product | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	// Cart Store
	const removeItem = useCartStore((state) => state.removeItem);
	const addQuantity = useCartStore((state) => state.addQuantity);
	const removeQuantity = useCartStore((state) => state.removeQuantity);

	useEffect(() => {
		document.addEventListener("visibilitychange", updateCartStore);
		window.addEventListener("focus", updateCartStore);
		return () => {
			document.removeEventListener("visibilitychange", updateCartStore);
			window.removeEventListener("focus", updateCartStore);
		};
	}, []);

	useEffect(() => {
		fetchProductById(item.productId, setProduct);
		fetchProductImage(item.productId, setImageUrl);
	}, [item.productId]);

	return (
		<div className="flex flex-col items-center justify-center w-full py-4">
			<div className="flex flex-col items-center justify-center w-full">
				<span className="font-semibold">{product?.name}</span>
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center justify-center w-1/2">
						{product && imageUrl && (
							<Link
								href={`/products/${product.slug}`}
								className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2"
							>
								<Image
									src={imageUrl}
									width={200}
									height={200}
									alt={product?.name}
								/>
							</Link>
						)}
					</div>
					<div className="flex items-center justify-center w-1/4 pb-6">
						<div className="flex flex-col items-center">
							<p className="font-semibold text-sm pb-2">QTY:</p>
							<div className="flex items-center justify-center relative">
								<button
									type="button"
									className={`p-2 border ${
										item.quantity === 1
											? "border-gray-200 text-gray-300"
											: "border-gray-300 text-black"
									}`}
									onClick={() => {
										removeQuantity(
											item.productId,
											item.sizeId,
										);
									}}
									disabled={item.quantity === 1}
								>
									-
								</button>
								<div className="w-12 text-center select-none">
									{item.quantity}
								</div>
								<button
									type="button"
									className={`p-2 border ${
										item.quantity === 10
											? "border-gray-200 text-gray-300"
											: "border-gray-300 text-black"
									}`}
									onClick={() => {
										addQuantity(
											item.productId,
											item.sizeId,
										);
									}}
									disabled={item.quantity === 10}
								>
									+
								</button>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center w-1/6">
						<motion.button
							initial={{ color: colors.black }}
							whileHover={{ color: colors.secondary }}
							whileTap={{ color: colors.secondary }}
							transition={{ duration: 0.2 }}
							onClick={() => removeItem(item)}
							type="button"
							aria-label="Remove item"
						>
							<TrashIcon />
						</motion.button>
					</div>
				</div>
				<div className="flex items-center w-3/4 text-start pb-2">
					<div className="flex justify-start w-1/2">
						<p className="text-sm">Price per unit:</p>
					</div>
					<div className="flex justify-end w-1/2 font-semibold">
						<p className="text-gray-500">
							${product && product.price.toFixed(2)}
						</p>
					</div>
				</div>
				<div className="flex items-center justify-between w-3/4">
					<div className="flex justify-start w-1/2">
						<p className="text-sm">Total price:</p>
					</div>
					<div className="flex justify-end w-1/2 font-semibold">
						<p className="text-gray-500">
							$
							{product &&
								(item.quantity * product.price).toFixed(2)}
						</p>
					</div>
				</div>
			</div>
			{shouldRenderHr && <hr className="w-full border-gray-300 mt-10" />}
		</div>
	);
};

const CartTableItem: FC<CartTableItemProps> = ({ item }): JSX.Element => {
	const [product, setProduct] = useState<Product | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [sizes, setSizes] = useState<Size[] | null>(null);
	const [selectedSize, setSelectedSize] = useState<Size | null>(null);
	// Cart Store
	const removeItem = useCartStore((state) => state.removeItem);
	const addQuantity = useCartStore((state) => state.addQuantity);
	const removeQuantity = useCartStore((state) => state.removeQuantity);

	useEffect(() => {
		fetchAllSizes(setSizes);

		document.addEventListener("visibilitychange", updateCartStore);
		window.addEventListener("focus", updateCartStore);
		return () => {
			document.removeEventListener("visibilitychange", updateCartStore);
			window.removeEventListener("focus", updateCartStore);
		};
	}, []);

	useEffect(() => {
		if (sizes) setSelectedSize(getCartItemSize(sizes, item.sizeId));
	}, [item, sizes]);

	useEffect(() => {
		fetchProductById(item.productId, setProduct);
		fetchProductImage(item.productId, setImageUrl);
	}, [item.productId]);

	return (
		<>
			<td className="px-6 text-sm font-medium text-gray-900">
				<div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4">
					{product && imageUrl && (
						<div className="flex-col">
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
								<div>
									<p>{product?.name}</p>
									{sizes && selectedSize && (
										<p className="text-gray-500 text-start">
											Size: {selectedSize.name}
										</p>
									)}
								</div>
							</Link>
						</div>
					)}
				</div>
			</td>
			<td className="px-6 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
				${product?.price.toFixed(2)}
			</td>
			<td className="px-6 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
				<div className="flex items-center justify-center relative">
					<button
						type="button"
						className={`p-2 border ${
							item.quantity === 1
								? "border-gray-200 text-gray-300"
								: "border-gray-300 text-black"
						}`}
						onClick={() => {
							removeQuantity(item.productId, item.sizeId);
						}}
						disabled={item.quantity === 1}
					>
						-
					</button>
					<div className="w-12 text-center select-none">
						{item.quantity}
					</div>
					<button
						type="button"
						className={`p-2 border ${
							item.quantity === 10
								? "border-gray-200 text-gray-300"
								: "border-gray-300 text-black"
						}`}
						onClick={() => {
							addQuantity(item.productId, item.sizeId);
						}}
						disabled={item.quantity === 10}
					>
						+
					</button>
				</div>
			</td>
			<td className="px-6 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
				${product && (item.quantity * product.price).toFixed(2)}
			</td>

			<td className=" whitespace-nowrap text-sm text-gray-500 text-center">
				<motion.button
					initial={{ color: colors.black }}
					whileHover={{ color: colors.secondary }}
					whileTap={{ color: colors.secondary }}
					transition={{ duration: 0.2 }}
					onClick={() => removeItem(item)}
					type="button"
					aria-label="Remove item"
				>
					<TrashIcon />
				</motion.button>
			</td>
		</>
	);
};

const CartTable = () => {
	const items = useCartStore((state) => state.items);
	const hydrated = useHydration(useCartStore);

	useEffect(() => {
		document.addEventListener("visibilitychange", updateCartStore);
		window.addEventListener("focus", updateCartStore);
		return () => {
			document.removeEventListener("visibilitychange", updateCartStore);
			window.removeEventListener("focus", updateCartStore);
		};
	}, []);

	if (!hydrated) {
		return <StyledLoading />;
	}

	return (
		<>
			{items.length === 0 ? (
				<div className="py-6">
					<div className="text-lg pb-6">
						Looks like you haven&apos;t added any items to your
						Shopping Cart.
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
				<>
					<div className="w-[95%] lg:w-[90%] pb-6 md:hidden border border-gray-300">
						{items.map((item, index) => (
							<CartItemMobile
								key={item.productId}
								item={item}
								shouldRenderHr={index !== items.length - 1}
							/>
						))}
					</div>
					<table className="w-[95%] lg:w-[90%] pb-6 hidden md:table">
						<thead className="border border-1 border-gray-300 w-full">
							<tr>
								<th
									scope="col"
									className="w-2/5 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-r border-gray-300"
								>
									Product Name
								</th>
								<th
									scope="col"
									className="w-1/5 px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider border-gray-300 border-l"
								>
									Price
								</th>
								<th
									scope="col"
									className="w-1/5 px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider border-gray-300 border-l"
								>
									Quantity
								</th>
								<th
									scope="col"
									className="w-1/6 px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider border-gray-300 border-l"
								>
									Total
								</th>
								<th
									scope="col"
									className="w-1/5 px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider border-gray-300 border-l"
								>
									{" "}
								</th>
							</tr>
						</thead>
						<tbody className="bg-white border border-1 border-gray-300">
							{items.map((item, index) => (
								<tr
									key={item.productId}
									className={`border-b ${
										index !== items.length - 1
											? "border-gray-300"
											: ""
									}`}
								>
									<CartTableItem item={item} />
								</tr>
							))}
						</tbody>
					</table>
					<div className="flex flex-col items-start w-[90%] items-center lg:items-start pb-6 px-10">
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
								className="uppercase px-6 py-4 mt-10 mb-6 tracking-widest"
							>
								Continue shopping
							</motion.button>
						</Link>
					</div>
					<div className="flex flex-col items-center lg:items-start w-[95%] lg:w-[90%] pb-6 px-10 py-4 border border-gray-300 mb-10">
						<p className="uppercase tracking-2xl font-semibold pt-10">
							Cart totals
						</p>
						<hr className="w-full border-gray-300 my-6" />
						<div className="flex justify-between w-full lg:w-1/2">
							<p className="text-sm">Total</p>
							<p className="font-semibold">
								$
								{items
									.map((item) => item.quantity * item.price)
									.reduce((a, b) => a + b, 0)
									.toFixed(2)}
							</p>
						</div>
						<Link href="/checkout">
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
								className="uppercase px-6 py-4 mt-10 mb-6 tracking-widest"
							>
								Proceed to checkout
							</motion.button>
						</Link>
					</div>
				</>
			)}
		</>
	);
};

export default CartTable;
