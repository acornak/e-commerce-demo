"use client";

import React from "react";
// Next
import Image from "next/image";
// Animations
import { motion } from "framer-motion";
// Images
import newsletter from "@/public/misc/newsletter.webp";
// Components
import colors from "@/config/constants";
import { StyledSectionHeading } from "../styled/Heading";
// Icons
import PlaneIcon from "../icons/Plane";

const Newsletter = (): JSX.Element => {
	return (
		<div className="my-12 items-center justify-center text-center">
			<StyledSectionHeading title="Let's stay in touch" />
			<div className="flex justify-center items-center">
				<div className="flex flex-row w-full justify-center">
					<div className="hidden lg:flex md:w-1/2 justify-center items-center">
						<Image
							src={newsletter.src}
							alt="Newsletter"
							width={600}
							height={600}
							style={{
								height: "auto",
								width: "auto",
							}}
						/>
					</div>
					<div className="w-full lg:w-1/3 mx-10 flex flex-col items-center border border-secondary py-20 lg:py-24 px-10">
						<div className="text-2xl uppercase tracking-widest font-normal">
							Get updates
							<div className="w-1/2 bg-secondary h-1 mx-auto mt-2" />
						</div>
						<div className="text-xs my-4 text-gray-600 text-center">
							Subscribe to our newsletter and get the latest
							products and 30% off discount!
						</div>
						<div className="flex mt-4 w-full md:w-2/3 lg:w-5/6">
							<input
								type="email"
								placeholder="Your email"
								className="flex-grow md:text-xs px-4 py-2 border border-gray-300 border-r-0 bg-gray-100"
							/>
							<motion.button
								whileHover={{
									backgroundColor: colors.white,
									color: colors.secondary,
								}}
								whileTap={{
									backgroundColor: colors.white,
									color: colors.secondary,
								}}
								transition={{ duration: 0.3 }}
								className="px-4 py-2 bg-secondary text-white cursor-pointer border border-secondary"
							>
								<PlaneIcon />
							</motion.button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Newsletter;
