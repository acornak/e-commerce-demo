"use client";

import React, { useState } from "react";
// Next
import { NextPage } from "next";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Types and Constants
import colors from "@/lib/config/constants";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import WishlistHero from "@/components/hero/WishlistHero";
import LoginModal from "@/components/modal/LoginModal";
import WishlistTable from "@/components/product/WIshlistTable";

const Wishlist: NextPage = (): JSX.Element => {
	const [loginOpen, setLoginOpen] = useState(false);

	return (
		<>
			<LoginModal
				loginModalOpen={loginOpen}
				setLoginModalOpen={setLoginOpen}
			/>
			<AnimatePresence>
				{loginOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.7 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black bg-opacity-80"
						style={{
							zIndex: 20,
						}}
						onClick={() => {
							setLoginOpen(false);
						}}
					/>
				)}
			</AnimatePresence>
			<WishlistHero />
			<div className="flex flex-col items-center justify-center text-center mt-6">
				<div>
					<StyledSectionHeading title="Products you love" />
					<h2 className="my-4 pb-6">
						For better experience, please{" "}
						<motion.p
							whileHover={{ color: colors.secondary }}
							whileTap={{ color: colors.secondary }}
							className="inline font-bold cursor-pointer"
							onClick={() => setLoginOpen(true)}
						>
							login
						</motion.p>{" "}
						first.
					</h2>
				</div>
				<WishlistTable />
			</div>
		</>
	);
};

export default Wishlist;
