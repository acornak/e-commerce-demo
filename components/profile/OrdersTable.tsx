"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";
import { CartItem, Order, Product } from "@/lib/config/types";
// Functions
import { totalCartPrice } from "@/lib/functions/cart-helpers";
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
// Icons
import PdfIcon from "../icon/Pdf";

type OrderProductProps = {
	item: CartItem;
	lastItem?: boolean;
	dots?: boolean;
};

const OrderProduct: FC<OrderProductProps> = ({
	item,
	lastItem,
	dots,
}): JSX.Element => {
	const [product, setProduct] = useState<Product | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		fetchProductById(item.productId, setProduct);
		fetchProductImage(item.productId, setImageUrl);
	}, [item.productId]);

	if (!product || !imageUrl) {
		return <p>Loading...</p>;
	}

	return (
		<div className="flex flex-row justify-center items-center text-center">
			<Link href={`/products/${product.slug}`}>
				<Image
					src={imageUrl}
					width={100}
					height={100}
					alt={product?.name}
				/>
			</Link>
			{!lastItem && <span>+</span>}
			{/* TODO: and X products more */}
			{dots && <span>...</span>}
		</div>
	);
};

type OrderRowProps = {
	order: Order;
};

const OrderRow: FC<OrderRowProps> = ({ order }): JSX.Element => {
	return (
		<tr>
			<td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm hidden lg:table-cell">
				<div>
					{order.createdAt.toLocaleDateString("en-GB", {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
					})}
				</div>
				<div>
					{order.createdAt.toLocaleTimeString("en-GB", {
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					})}
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
				<div className="flex justify-center items-center w-full h-full">
					<motion.button
						whileHover={{ color: colors.secondary, scale: 1.05 }}
						whileTap={{ color: colors.secondary, scale: 1.05 }}
						className="flex flex-row"
					>
						<PdfIcon />
						<p className="px-2">{order.id}</p>
					</motion.button>
				</div>
			</td>
			<td className="px-6 text-gray-900 text-sm hidden md:table-cell">
				<div className="flex flex-row lg:hidden">
					{order.items
						.slice(0, 2)
						.map((item: CartItem, index: number) => (
							<OrderProduct
								key={item.productId}
								item={item}
								lastItem={
									index + 1 === order.items.length ||
									index + 1 === 2
								}
								dots={index + 1 === 2 && order.items.length > 3}
							/>
						))}
				</div>
				<div className="flex-row hidden lg:flex xl:hidden">
					{order.items
						.slice(0, 3)
						.map((item: CartItem, index: number) => (
							<OrderProduct
								key={item.productId}
								item={item}
								lastItem={
									index + 1 === order.items.length ||
									index + 1 === 3
								}
								dots={index + 1 === 3 && order.items.length > 3}
							/>
						))}
				</div>
				<div className="flex-row hidden xl:flex">
					{order.items
						.slice(0, 4)
						.map((item: CartItem, index: number) => (
							<OrderProduct
								key={item.productId}
								item={item}
								lastItem={
									index + 1 === order.items.length ||
									index + 1 === 4
								}
								dots={index + 1 === 4 && order.items.length > 3}
							/>
						))}
				</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
				${totalCartPrice(order.items).toFixed(2)}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
				{/* TODO: add checkmark instead of text */}
				{order.paid ? "Yes" : "No"}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
				{order.status}
			</td>
		</tr>
	);
};

type OrdersTableProps = {
	orders?: Order[];
};

const OrdersTable: FC<OrdersTableProps> = ({ orders }): JSX.Element => {
	if (!orders || orders.length === 0) {
		return (
			<div className="pb-10">
				<p className="text-lg pb-10">
					Looks like you haven&apos;t created any orders yet.
				</p>
				{/* TODO */}
				<Link href="/products">
					<motion.div
						initial={{
							scale: 1,
							color: colors.white,
							backgroundColor: colors.black,
						}}
						whileHover={{
							scale: 1.05,
							backgroundColor: colors.secondary,
							color: colors.black,
						}}
						whileTap={{
							scale: 1.05,
							backgroundColor: colors.secondary,
							color: colors.black,
						}}
						transition={{ duration: 0.2 }}
						className="p-4 uppercase text-xs tracking-widest"
					>
						Start shopping
					</motion.div>
				</Link>
			</div>
		);
	}

	return (
		<table className="w-[90%] mb-10 mx-2 px-10 border-b border border-gray-300">
			<thead className="border border-1 border-gray-300 w-full">
				<tr>
					<th
						scope="col"
						className="w-1/10 px-6 py-3 text-center text-sm font-medium text-black uppercase tracking-wider border-r border-gray-300 hidden lg:table-cell"
					>
						Date
					</th>
					<th
						scope="col"
						className="w-1/10 px-6 py-3 text-center text-sm font-medium text-black uppercase tracking-wider border-r border-gray-300"
					>
						Order Nr
					</th>
					<th
						scope="col"
						className="w-1/3 px-6 py-3 text-left text-sm font-medium text-black uppercase tracking-wider border-r border-gray-300 hidden lg:table-cell"
					>
						Products
					</th>
					<th
						scope="col"
						className="w-1/10 px-6 py-3 text-center text-sm font-medium text-black uppercase tracking-wider border-r border-gray-300"
					>
						Total
					</th>
					<th
						scope="col"
						className="w-1/10 px-6 py-3 text-center text-sm font-medium text-black uppercase tracking-wider border-r border-gray-300"
					>
						Paid
					</th>
					<th
						scope="col"
						className="w-1/10 px-6 py-3 text-center text-sm font-medium text-black uppercase tracking-wider border-r border-gray-300"
					>
						Status
					</th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{orders.map((order) => (
					<OrderRow
						key={order.id + Math.random() * 4567}
						order={order}
					/>
				))}
			</tbody>
		</table>
	);
};
export default OrdersTable;
