"use client";

import React from "react";
// Next
import { NextPage } from "next";
// Animations
import { motion } from "framer-motion";
// Types and Constants
import colors from "@/lib/config/constants";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import WishlistHero from "@/components/hero/WishlistHero";
import WishlistTable from "@/components/product/WIshlistTable";
import { useModalsStore } from "@/lib/stores/modals-store";

const Wishlist: NextPage = (): JSX.Element => {
	const setLoginModalOpen = useModalsStore(
		(state) => state.setLoginModalOpen,
	);

	return (
		<>
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
							onClick={() => setLoginModalOpen(true)}
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
