"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Types and Constants
import { colors } from "@/lib/config/constants";
// Functions
import { fetchCategoryImage } from "@/lib/functions/category-fetcher";
// Components
import { StyledHeroHeading } from "../styled/Heading";
// Icons
import ChevronRightIcon from "../icon/ChevronRight";

type StyledCategoryHeroProps = {
	categoryId: number;
	link: string;
	title: string;
	h?: string;
};

const StyledCategoryHero: FC<StyledCategoryHeroProps> = ({
	categoryId,
	link,
	title,
	h = "h-[70vh]",
}): JSX.Element => {
	const [imageUrl, setImageUrl] = useState<string | null>();

	useEffect(() => {
		fetchCategoryImage(categoryId, setImageUrl);
	}, [categoryId]);

	return (
		<section
			className={`flex flex-col items-center justify-center min-h-[60vh] ${h}`}
		>
			<div className="flex justify-center items-center relative w-full h-full">
				{imageUrl && (
					<Image
						src={imageUrl}
						alt="Hero image"
						fill
						style={{
							objectFit: "cover",
						}}
						priority
					/>
				)}
				<div className="absolute inset-0 bg-black bg-opacity-50" />
				<div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
					<StyledHeroHeading title={title} />

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

						<Link href="/products">
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
								Products
							</motion.p>
						</Link>
						<ChevronRightIcon />

						<Link href="/products/categories">
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
								Categories
							</motion.p>
						</Link>
						<ChevronRightIcon />
						<Link href={`/products/categories/${link}`}>
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
								{title}
							</motion.p>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default StyledCategoryHero;
