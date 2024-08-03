"use client";

import React, { useState } from "react";
// Next
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Images
import aviator from "@/public/categories/aviator.webp";
import cateye from "@/public/categories/cateye.webp";
import rectangle from "@/public/categories/rectangle.webp";
import round from "@/public/categories/round.webp";
import safety from "@/public/categories/safety.webp";
import stylish from "@/public/categories/stylish.webp";
// Icons
import ChevronRightIcon from "../icon/ChevronRight";
import ChevronLeftIcon from "../icon/ChevronLeft";
// Components
import { StyledSectionHeading } from "../styled/Heading";

type Category = {
	image: StaticImageData;
	title: string;
	slug: string;
};

// TODO: add category type
const categories: Category[] = [
	{
		image: aviator,
		title: "Aviator",
		slug: "?category=8",
	},
	{
		image: cateye,
		title: "Cat Eye",
		slug: "?category=9",
	},
	{
		image: rectangle,
		title: "Rectangle",
		slug: "?category=5",
	},
	{
		image: round,
		title: "Round",
		slug: "?category=6",
	},
	{
		image: safety,
		title: "Safety",
		slug: "?category=11",
	},
	{
		image: stylish,
		title: "Stylish",
		slug: "?category=12",
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
						data-testid="collection-previous-button"
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
								<Link
									href={`/products${category.slug}`}
									className="relative"
								>
									<motion.div
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 1.1 }}
										className="inline-block rounded-full overflow-hidden border border-gray-300 flex justify-center items-center cursor-pointer"
										style={{
											width: "120px",
											height: "120px",
										}}
									>
										<motion.div
											initial={{ opacity: 0 }}
											whileHover={{ opacity: 1 }}
											whileTap={{ opacity: 1 }}
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
								</Link>
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
						data-testid="collection-next-button"
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
		<div
			className="flex justify-center items-center"
			data-testid="homepage-collection"
		>
			<div
				className="w-[90%] bg-white z-60 -mt-10 border border-gray-200"
				style={{ zIndex: 10 }}
			>
				<StyledSectionHeading title="Our Collection" />
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
