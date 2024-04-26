"use client";

import React from "react";
// Next
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Fonts
import { dancing } from "@/app/fonts";
// Types and constants
import colors from "@/lib/config/constants";

const Sitemap = (): JSX.Element => {
	return (
		<footer className="bg-white text-black text-start mt-4 border-t border-gray-300 mx-2">
			<div className="container mx-auto">
				<div className="grid grid-cols-3 md:grid-cols-4 gap-6 py-6 items-start">
					<div className="text-xs hidden md:block">
						<h3
							className={`${dancing.className} text-5xl select-none`}
						>
							Glassify
							<hr className="w-1/3 border-black mt-2" />
						</h3>
						<ul className="mt-4 ">
							<motion.li
								whileHover={{ color: colors.secondary }}
								whileTap={{ color: colors.secondary }}
								className="py-2 pr-10 cursor-pointer"
							>
								Sophisticated simplicity for the independent
								mind.
							</motion.li>
						</ul>
					</div>
					<div className="text-xs tracking-widest text-center">
						<h3 className="font-bold text-base md:text-lg flex flex-col items-center">
							Categories
							<hr className="w-1/6 border-black mt-2" />
						</h3>
						<ul className="mt-4">
							<li className="py-2">
								<motion.span
									whileHover={{ color: colors.secondary }}
									whileTap={{ color: colors.secondary }}
									className="py-2"
								>
									<Link href="/products/categories/women">
										Woman&apos;s glasses
									</Link>
								</motion.span>
							</li>
							<li className="py-2">
								<motion.span
									whileHover={{ color: colors.secondary }}
									whileTap={{ color: colors.secondary }}
									className="cursor-pointer"
								>
									<Link href="/products/categories/men">
										Mens&apos;s glasses
									</Link>
								</motion.span>
							</li>
							<li className="py-2">
								<motion.span
									whileHover={{ color: colors.secondary }}
									whileTap={{ color: colors.secondary }}
									className="cursor-pointer"
								>
									<Link href="/products/categories/children">
										Children&apos;s glasses
									</Link>
								</motion.span>
							</li>
							<li className="py-2">
								<motion.span
									whileHover={{ color: colors.secondary }}
									whileTap={{ color: colors.secondary }}
									className="cursor-pointer"
								>
									<Link href="/products/categories/stylish">
										Designer eyeglasses
									</Link>
								</motion.span>
							</li>
						</ul>
					</div>
					<div className="text-xs tracking-widest text-center">
						<h3 className="font-bold text-base md:text-lg flex flex-col items-center">
							Support
							<hr className="w-1/6 border-black mt-2" />
						</h3>
						<ul className="mt-4">
							<Link href="/privacy-policy">
								<motion.li
									whileHover={{ color: colors.secondary }}
									whileTap={{ color: colors.secondary }}
									className="py-2 cursor-pointer"
								>
									FAQ
								</motion.li>
							</Link>
							<Link href="/privacy-policy">
								<motion.li
									whileHover={{ color: colors.secondary }}
									whileTap={{ color: colors.secondary }}
									className="py-2 cursor-pointer"
								>
									Privacy Policy
								</motion.li>
							</Link>
							<Link href="/privacy-policy">
								<motion.li
									whileHover={{ color: colors.secondary }}
									whileTap={{ color: colors.secondary }}
									className="py-2 cursor-pointer"
								>
									Terms of Service
								</motion.li>
							</Link>
							<Link href="/privacy-policy">
								<motion.li
									whileHover={{ color: colors.secondary }}
									whileTap={{ color: colors.secondary }}
									className="py-2 cursor-pointer"
								>
									Accessibility
								</motion.li>
							</Link>
						</ul>
					</div>
					<div className="text-xs tracking-widest text-center">
						<h3 className="font-bold text-base md:text-lg flex flex-col items-center">
							Contact
							<hr className="w-1/6 border-black mt-2" />
						</h3>
						<ul className="mt-4">
							<Link href="https://facebook.com/">
								<motion.li
									whileHover={{ color: colors.secondary }}
									whileTap={{ color: colors.secondary }}
									className="py-2 cursor-pointer"
								>
									Facebook
								</motion.li>
							</Link>
							<Link href="https://www.instagram.com/">
								<motion.li
									whileHover={{ color: colors.secondary }}
									whileTap={{ color: colors.secondary }}
									className="py-2 cursor-pointer"
								>
									Instagram
								</motion.li>
							</Link>
							<motion.li
								whileHover={{ color: colors.secondary }}
								whileTap={{ color: colors.secondary }}
								className="py-2 cursor-pointer"
							>
								Write us
							</motion.li>
							<motion.li
								whileHover={{ color: colors.secondary }}
								whileTap={{ color: colors.secondary }}
								className="py-2 cursor-pointer"
							>
								Career
							</motion.li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Sitemap;
