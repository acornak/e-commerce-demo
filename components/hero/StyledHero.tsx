"use client";

import React, { FC } from "react";
// Next
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Types and Constants
import { colors } from "@/lib/config/constants";
// Components
import { StyledHeroHeading } from "../styled/Heading";
// Icons
import ChevronRightIcon from "../icon/ChevronRight";

type StyledHeroProps = {
	image: StaticImageData;
	link: string;
	title: string;
	h?: string;
};

const StyledHero: FC<StyledHeroProps> = ({
	image,
	link,
	title,
	h = "h-[70%]",
}): JSX.Element => {
	return (
		<section className={`flex flex-col items-center justify-center ${h}`}>
			<div className="flex justify-center items-center relative w-full h-full">
				<Image
					src={image.src}
					alt="Hero image"
					fill
					style={{
						objectFit: "cover",
					}}
					priority
				/>
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
						<Link href={`/${link}`}>
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

export default StyledHero;
