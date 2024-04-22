import React, { FC, useEffect, useState } from "react";
// Next
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Types and constants
import colors from "@/lib/config/constants";
import { Product } from "@/lib/models/product";
// Store
import { CartItem, useCartStore } from "@/lib/stores/cart-store";
// Icons
import Image from "next/image";
import CloseIcon from "../icons/Close";
// Components
import TrashIcon from "../icons/Trash";

const EmptyCart = () => (
	<>
		<h1 className="text-3xl font-semibold py-4">Your cart is empty</h1>
		<p className="text-lg pb-10">
			Looks like you haven&apos;t added any items to your cart yet.
		</p>
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
	</>
);

type CartItemPreviewProps = {
	item: CartItem;
};

const CartItemPreview: FC<CartItemPreviewProps> = ({ item }) => {
	const [product, setProduct] = useState<Product | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const removeItem = useCartStore((state) => state.removeItem);
	const addQuantity = useCartStore((state) => state.addQuantity);
	const removeQuantity = useCartStore((state) => state.removeQuantity);

	useEffect(() => {
		fetch(`/api/products?id=${item.productId}`)
			.then((response) => response.json())
			.then((data) => setProduct(data.product))
			.catch((error) => console.error("Fetching product failed:", error));

		fetch(`/api/products/image?productId=${item.productId}`)
			.then((response) => response.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				setImageUrl(url);
				return () => URL.revokeObjectURL(url);
			})
			.catch((error) => console.error("Fetching image failed:", error));
	}, [item.productId]);

	if (!product || !imageUrl) {
		return <></>;
	}

	return (
		<div className="flex items-center justify-between text-start w-full py-4">
			<div className="flex items-center space-x-4">
				<Link href={`/products/${product.slug}`}>
					<Image
						src={imageUrl}
						alt={product.name}
						width={80}
						height={80}
					/>
				</Link>
				<div>
					<h1 className="font-semibold">{product.name}</h1>
					<p className="text-gray-500">
						<motion.button
							whileHover={{
								scale: 1.5,
								color: colors.secondary,
							}}
							whileTap={{
								scale: 1.5,
								color: colors.secondary,
							}}
							onClick={() => removeQuantity(item)}
						>
							-
						</motion.button>{" "}
						QTY: {item.quantity}{" "}
						<motion.button
							whileHover={{
								scale: 1.5,
								color: colors.secondary,
							}}
							whileTap={{
								scale: 1.5,
								color: colors.secondary,
							}}
							onClick={() => addQuantity(item)}
						>
							+
						</motion.button>
					</p>
					<p className="text-xs text-gray-500">
						${product.price.toFixed(2)} / piece
					</p>
				</div>
			</div>
			<div className="flex items-center space-x-4">
				<p className="text-sm font-semibold text-secondary">
					${(product.price * item.quantity).toFixed(2)}
				</p>

				<motion.button
					initial={{ color: colors.black }}
					whileHover={{ color: colors.secondary }}
					whileTap={{ color: colors.secondary }}
					transition={{ duration: 0.2 }}
					onClick={() => removeItem(item)}
				>
					<TrashIcon />
				</motion.button>
			</div>
		</div>
	);
};

type ShoppingCartProps = {
	cartOpen: boolean;
	setCartOpen: (open: boolean) => void;
	items: CartItem[];
};

const ShoppingCart: FC<ShoppingCartProps> = ({
	cartOpen,
	items,
	setCartOpen,
}) => {
	return (
		<motion.div
			initial="closed"
			animate={cartOpen ? "open" : "closed"}
			variants={{
				open: { x: 0, opacity: 1 },
				closed: { x: "100%", opacity: 0 },
			}}
			transition={{
				type: "tween",
				ease: "easeInOut",
				duration: 0.3,
			}}
			className="fixed top-0 right-0 h-full bg-white shadow-xl z-50 w-5/6 max-w-[500px] flex flex-col"
		>
			<div className="sticky top-0 bg-white z-10">
				<div className="flex items-center justify-between w-full px-3 py-2">
					<motion.button
						initial={{ rotate: 0, color: colors.black }}
						whileHover={{
							rotate: 180,
							color: colors.secondary,
						}}
						whileTap={{ rotate: 180, color: colors.secondary }}
						transition={{ duration: 0.2 }}
						className="transform -translate-y-1/2 translate-x-1/2 px-2"
						onClick={() => setCartOpen(false)}
					>
						<CloseIcon />
					</motion.button>
					<span className="text-xl font-semibold text-center flex-grow border-l border-r border-gray-300">
						Shopping Cart
					</span>
					<span className="text-lg flex-shrink-0 font-bold px-4">
						{items
							.map((item) => item.quantity)
							.reduce((a, b) => a + b, 0)}
					</span>
				</div>
				<hr className="border-gray-300" />
			</div>
			<div className="flex-grow overflow-auto">
				<hr className="border-gray-300" />
				{items.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full text-center px-6">
						<EmptyCart />
					</div>
				) : (
					<div className="flex flex-col items-start justify-start text-center px-6">
						{items.map((item, index) => (
							<>
								<CartItemPreview
									key={item.productId}
									item={item}
								/>
								{index !== items.length - 1 && (
									<hr className="w-full border-gray-300" />
								)}
							</>
						))}
					</div>
				)}
			</div>
			<div className="bg-white">
				<hr className="border-gray-300" />
				<div className="flex justify-between w-full px-4 py-6">
					<span className="uppercase">Total:</span>
					<span className="text-xl text-secondary font-bold">
						$
						{items
							.map((item) => item.quantity * item.price)
							.reduce((a, b) => a + b, 0)
							.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-center items-center text-white tracking-widest">
					<Link href="/cart" className="bg-gray-800 w-1/2 ">
						<motion.button
							whileHover={{
								backgroundColor: colors.secondary,
								color: colors.black,
							}}
							whileTap={{
								backgroundColor: colors.secondary,
								color: colors.black,
							}}
							className="text-center py-4 uppercase w-full"
						>
							View Cart
						</motion.button>
					</Link>
					<Link href="/checkout" className="bg-black w-1/2 ">
						<motion.button
							whileHover={{
								backgroundColor: colors.secondary,
								color: colors.black,
							}}
							whileTap={{
								backgroundColor: colors.secondary,
								color: colors.black,
							}}
							className="text-center py-4 uppercase w-full"
						>
							Checkout
						</motion.button>
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default ShoppingCart;
