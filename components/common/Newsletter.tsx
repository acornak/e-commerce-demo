"use client";

import React from "react";
// Animations
import { motion } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";
// Icons
import EmailIcon from "../icon/Email";

const NewsletterBanner = (): JSX.Element => {
	return (
		<div className="w-full border-t pt-4 border-gray-300 px-4">
			<div className="container mx-auto py-4">
				<div className="flex flex-col lg:flex-row items-center justify-between">
					<div className="hidden lg:flex items-center w-1/4 xl:w-1/5 uppercase font-semibold border-r border-gray-300">
						<EmailIcon />
						<p className="ml-2 hidden lg:flex text-gray-600 ">
							Sign up for our newsletter
						</p>
					</div>
					<div className="order-1 lg:order-none text-sm text-gray-600 lg:flex-1 pb-4 lg:pb-0 text-center">
						<p>
							Subscribe to the weekly newsletter for all the
							latest updates
						</p>
					</div>
					<div className="order-2 lg:order-none mt-4 lg:mt-0">
						<input
							type="email"
							placeholder="Your email address..."
							className="bg-gray-100 px-6 sm:px-20 py-3 sm:text-sm"
						/>
						<motion.button
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
							className="bg-black text-white px-6 py-3 uppercase text-sm tracking-widest"
						>
							Submit
						</motion.button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsletterBanner;
