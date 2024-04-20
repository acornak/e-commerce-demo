import React, { FC } from "react";
// Animations
import { motion } from "framer-motion";
import Link from "next/link";
import CloseIcon from "../icons/Close";

type ShoppingCartProps = {
	cartOpen: boolean;
	setCartOpen: (open: boolean) => void;
	cartItems: number;
};

const ShoppingCart: FC<ShoppingCartProps> = ({
	cartOpen,
	cartItems,
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
			className="fixed top-0 right-0 h-full bg-white shadow-xl z-50"
			style={{ width: "500px" }}
		>
			<div className="flex items-center justify-between w-full">
				<motion.button
					initial={{ rotate: 0, color: "#000000" }}
					whileHover={{ rotate: 180, color: "#FF6347" }}
					transition={{ duration: 0.2 }}
					className="transform -translate-y-1/2 translate-x-1/2 px-3"
					onClick={() => setCartOpen(false)}
				>
					<CloseIcon />
				</motion.button>
				<span className="text-xl font-semibold text-center flex-grow border-l border-r border-gray-300 py-2">
					Shopping Cart
				</span>
				<span className="text-xl flex-shrink-0 px-4">{cartItems}</span>
			</div>
			<hr className="border-gray-300" />
			<div className="flex flex-col items-center justify-center h-full text-center px-6">
				<h1 className="text-3xl font-semibold py-4">
					Your cart is empty
				</h1>
				<p className="text-lg pb-10">
					Looks like you haven&apos;t added any items to your cart
					yet.
				</p>
				<Link href="/products">
					<motion.div
						initial={{
							scale: 1,
							color: "#FFFFFF",
							backgroundColor: "#000000",
						}}
						whileHover={{
							scale: 1.05,
							backgroundColor: "#FF6347",
							color: "#000000",
						}}
						transition={{ duration: 0.2 }}
						className="p-4 uppercase text-xs tracking-widest"
					>
						Start shopping
					</motion.div>
				</Link>
			</div>
		</motion.div>
	);
};

export default ShoppingCart;
