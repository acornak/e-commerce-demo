"use client";

import React from "react";
// Next
import Image, { StaticImageData } from "next/image";
// Animations
import { motion } from "framer-motion";
// Images
import aviator from "@/public/categories/aviator.png";
import cateye from "@/public/categories/cateye.png";
import rectangle from "@/public/categories/rectangle.png";
import round from "@/public/categories/round.png";
import safety from "@/public/categories/safety.png";
import stylish from "@/public/categories/stylish.png";

type Category = {
	image: StaticImageData;
	title: string;
};

const categories: Category[] = [
	{
		image: aviator,
		title: "Aviator",
	},
	{
		image: cateye,
		title: "Cat Eye",
	},
	{
		image: rectangle,
		title: "Rectangle",
	},
	{
		image: round,
		title: "Round",
	},
	{
		image: safety,
		title: "Safety",
	},
	{
		image: stylish,
		title: "Stylish",
	},
];

const Collection = (): JSX.Element => {
	return (
		<div className="flex justify-center items-center">
			<div
				className="w-[90%] text-center bg-white z-60 -mt-10 border border-gray-200"
				style={{ zIndex: 10 }}
			>
				<div className="text-3xl uppercase tracking-widest pt-6">
					Our Collection
					<div className="w-1/6 bg-orange-500 h-1 mx-auto mt-2" />
				</div>

				<div className="flex justify-center items-center space-x-20 my-20">
					{categories.map(
						(category: Category): JSX.Element => (
							<div key={category.title} className="text-center">
								<div className="relative group">
									<motion.div
										whileHover={{ scale: 1.1 }}
										className="inline-block rounded-full overflow-hidden border border-gray-300 flex justify-center items-center cursor-pointer"
										style={{
											width: "120px",
											height: "120px",
										}}
									>
										<motion.div
											initial={{ opacity: 0 }}
											whileHover={{ opacity: 0.8 }}
											className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center rounded-full overflow-hidden"
											transition={{ duration: 0.3 }}
										/>
										<Image
											src={category.image}
											alt={category.title}
											width={110}
											height={110}
											objectFit="contain"
										/>
									</motion.div>
								</div>
								<p className="mt-8 uppercase tracking-widest text-sm">
									{category.title}
								</p>
							</div>
						),
					)}
				</div>
			</div>
		</div>
	);
};

export default Collection;
