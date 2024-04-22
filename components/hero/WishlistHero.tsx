"use client";

import React from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Types and Constants
import colors from "@/lib/config/constants";
// Images
import heroImage from "@/public/misc/wishlist.webp";
// Components
import { StyledHeroHeading } from "../styled/Heading";
// Icons
import ChevronRightIcon from "../icon/ChevronRight";

const WishlistHero = (): JSX.Element => {
	return (
		<section className="flex flex-col items-center justify-center h-[70%]">
			<div className="flex justify-center items-center relative w-full h-full">
				<Image
					src={heroImage.src}
					alt="Privacy Hero"
					fill
					style={{
						objectFit: "cover",
					}}
					priority
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50" />
				<div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
					<StyledHeroHeading title="Wishlist" />

					<div className="text-white flex items-center">
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
						Wishlist
					</div>
				</div>
			</div>
		</section>
	);
};

export default WishlistHero;
