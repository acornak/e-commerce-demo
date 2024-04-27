"use client";

import React from "react";
// Next
import { NextPage } from "next";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Store
import { useModalsStore } from "@/lib/stores/modals-store";
// Types and Constants
import { colors } from "@/lib/config/constants";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import CartTable from "@/components/product/CartTable";
// Icons
import ChevronRightIcon from "@/components/icon/ChevronRight";

const Cart: NextPage = (): JSX.Element => {
	const setLoginModalOpen = useModalsStore(
		(state) => state.setLoginModalOpen,
	);

	return (
		<div className="flex flex-col items-center justify-center text-center">
			<div className="text-start w-full px-4 flex items-center bg-gray-100 py-2">
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
				<Link href="/cart">
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
						Your Shopping Cart
					</motion.p>
				</Link>
			</div>
			<div>
				<StyledSectionHeading title="Your Shopping Cart" />
				<h2 className="my-4 pb-6">
					For better experience, please{" "}
					<motion.p
						whileHover={{ color: colors.secondary }}
						whileTap={{ color: colors.secondary }}
						className="inline font-bold cursor-pointer"
						onClick={() => setLoginModalOpen(true)}
					>
						login
					</motion.p>{" "}
					first.
				</h2>
			</div>
			<CartTable />
		</div>
	);
};

export default Cart;
