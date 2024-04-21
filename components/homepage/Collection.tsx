"use client";

import React, { useState } from "react";
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
import ChevronRightIcon from "../icons/ChevronRight";
import ChevronLeftIcon from "../icons/ChevronLeft";

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

const CategoriesCarousel = ({
	itemCount = 4,
}: {
	itemCount?: number;
}): JSX.Element => {
	const [visibleStart, setVisibleStart] = useState<number>(0);

	const handleNext = (): void => {
		if (visibleStart < categories.length - itemCount) {
			setVisibleStart(visibleStart + 1);
		}
	};

	const handlePrev = (): void => {
		if (visibleStart > 0) {
			setVisibleStart(visibleStart - 1);
		}
	};

	return (
		<div className="flex justify-center items-center my-20">
			<div className="relative">
				{visibleStart > 0 && (
					<button
						type="button"
						className="absolute -left-8 top-1/2 -translate-y-1/2 z-20"
						onClick={handlePrev}
						aria-label="Previous category"
					>
						<ChevronLeftIcon size="3em" />
					</button>
				)}
				<div className="flex overflow-hidden">
					{categories
						.slice(visibleStart, visibleStart + itemCount)
						.map((category: Category) => (
							<div
								key={category.title}
								className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 py-2 px-5 lg:px-4 xl:px-10 flex-none"
							>
								<div className="relative">
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
											whileHover={{ opacity: 1 }}
											className="absolute inset-0 bg-black bg-opacity-20 rounded-full overflow-hidden"
											transition={{ duration: 0.3 }}
										/>
										<Image
											src={category.image}
											alt={category.title}
											width={110}
											height={110}
											style={{
												objectFit: "contain",
												height: "auto",
												width: "auto",
											}}
										/>
									</motion.div>
								</div>
								<p className="uppercase tracking-widest text-sm text-center mt-6">
									{category.title}
								</p>
							</div>
						))}
				</div>
				{visibleStart < categories.length - itemCount && (
					<button
						type="button"
						className="absolute -right-8 top-1/2 -translate-y-1/2 z-20"
						onClick={handleNext}
						aria-label="Next category"
					>
						<ChevronRightIcon size="3em" />
					</button>
				)}
			</div>
		</div>
	);
};

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
				<div className="sm:hidden">
					<CategoriesCarousel itemCount={2} />
				</div>
				<div className="hidden sm:block md:hidden">
					<CategoriesCarousel itemCount={3} />
				</div>
				<div className="hidden md:block lg:hidden">
					<CategoriesCarousel itemCount={4} />
				</div>
				<div className="hidden lg:block">
					<CategoriesCarousel itemCount={6} />
				</div>
			</div>
		</div>
	);
};

export default Collection;
