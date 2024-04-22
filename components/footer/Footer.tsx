"use client";

import React from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// Animations
import { motion } from "framer-motion";
// Types and constants
import colors from "@/lib/config/constants";

const Footer = (): JSX.Element => {
	return (
		<footer className="bg-white text-black text-start mt-4 border-t border-gray-300">
			<div className="container mx-auto">
				<div className="flex justify-between items-start">
					<div className="text-xs uppercase tracking-widest py-6 px-4">
						©2024{" "}
						<Link href="www.antoncornak.com">
							<motion.span
								whileHover={{ color: colors.secondary }}
								whileTap={{ color: colors.secondary }}
							>
								Anton Čorňák
							</motion.span>
						</Link>{" "}
						| Inspired by{" "}
						<Link href="https://themeforest.net/item/pertic-modern-eyeglasses-responsive-shopify-20-theme/51637100/">
							<motion.span
								whileHover={{ color: colors.secondary }}
								whileTap={{ color: colors.secondary }}
							>
								Pertic
							</motion.span>
						</Link>
					</div>
					<div className="p-6 inline-block hidden sm:flex">
						<Image
							src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
							width={30}
							height={100}
							alt="Visa"
							className="mx-2"
							style={{
								height: "auto",
							}}
						/>
						<Image
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
							width={30}
							height={100}
							alt="Mastercard"
							className="mx-2"
							style={{
								height: "auto",
							}}
						/>
						<Image
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png"
							width={40}
							height={100}
							alt="Google Pay"
							className="mx-2"
							style={{
								height: "auto",
							}}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
