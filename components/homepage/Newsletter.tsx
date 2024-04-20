"use client";

import React from "react";
// Next
import Image from "next/image";
// Animations
import { motion } from "framer-motion";
// Icons
import newsletter from "@/public/misc/newsletter.webp";
import PlaneIcon from "../icons/Plane";
// Images

const Newsletter = (): JSX.Element => {
	return (
		<div className="my-12">
			<div className="flex justify-center items-center">
				<div className="flex flex-row w-full justify-center">
					<div className="hidden lg:flex md:w-1/2 justify-center items-center">
						<Image
							src={newsletter.src}
							alt="Newsletter"
							width={600}
							height={600}
						/>
					</div>
					<div className="w-3/4 lg:w-1/3 mx-10 flex flex-col items-center border border-secondary py-20 lg:py-24 px-10">
						<div className="text-2xl uppercase tracking-widest font-normal">
							Get updates
							<div className="w-1/2 bg-secondary h-1 mx-auto mt-2" />
						</div>
						<div className="text-xs my-4 text-gray-600 text-center">
							Subscribe to our newsletter and get the latest
							products and 30% off discount!
						</div>
						<div className="flex mt-4">
							<input
								type="email"
								placeholder="Your email"
								className="md:text-xs px-4 py-2 border border-gray-300 border-r-0 bg-gray-100"
							/>
							<motion.button
								whileHover={{
									backgroundColor: "#FFFFFF",
									color: "#F6347",
								}}
								transition={{ duration: 0.3 }}
								className="px-4 py-2 bg-secondary text-white cursor-pointer border border-secondary border-1"
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
