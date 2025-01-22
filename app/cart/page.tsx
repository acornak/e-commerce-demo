"use client";

import React from "react";
// Next
import { NextPage } from "next";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Types and Constants
import { colors } from "@/lib/config/constants";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import CartTable from "@/components/product/CartTable";
import LoginPrompt from "@/components/common/LoginPrompt";
// Icons
import ChevronRightIcon from "@/components/icon/ChevronRight";

const CartPage: NextPage = (): JSX.Element => {
	return (
		<div
			className="flex flex-col items-center justify-center text-center pt-14 lg:pt-24"
			data-testid="cart-page"
		>
			<div className="text-start w-full px-4 flex items-center bg-gray-100 py-2 pt-4">
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
				<LoginPrompt />
			</div>
			<CartTable />
		</div>
	);
};

export default CartPage;
