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
import LoginPrompt from "@/components/common/LoginPrompt";
// Icons
import ChevronRightIcon from "@/components/icon/ChevronRight";

const Checkout: NextPage = (): JSX.Element => {
	return (
		<div className="flex flex-col items-center justify-center text-center pt-14 lg:pt-24">
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
				<ChevronRightIcon />
				<Link href="/checkout">
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
						Checkout
					</motion.p>
				</Link>
			</div>
			<div>
				<StyledSectionHeading title="Checkout" />
				<LoginPrompt />
			</div>
		</div>
	);
};

export default Checkout;
