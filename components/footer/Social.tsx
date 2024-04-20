"use client";

import React, { FC, useState } from "react";
// Next
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Images
import ig1 from "@/public/instagram/ig_1.webp";
import ig2 from "@/public/instagram/ig_2.webp";
import ig3 from "@/public/instagram/ig_3.webp";
import ig4 from "@/public/instagram/ig_4.webp";
import ig5 from "@/public/instagram/ig_5.jpeg";
import ig6 from "@/public/instagram/ig_6.jpeg";
import ig7 from "@/public/instagram/ig_7.webp";
import ChevronRightIcon from "../icons/ChevronRight";
import ChevronLeftIcon from "../icons/ChevronLeft";
import InstagramIcon from "../icons/Instagram";

const images: StaticImageData[] = [ig1, ig2, ig3, ig4, ig5, ig6, ig7];

type InstagramImagesProps = {
	firstImage: number;
	imageCount: number;
	handleNext: () => void;
	handlePrevious: () => void;
};

const InstagramImages: FC<InstagramImagesProps> = ({
	firstImage,
	imageCount,
	handleNext,
	handlePrevious,
}): JSX.Element => {
	return (
		<div className="flex relative w-full">
			{firstImage !== 0 && (
				<button
					type="button"
					className="text-secondary absolute -left-10 top-1/2 -translate-y-1/2 z-10"
					onClick={handlePrevious}
					aria-label="Previous Instagram image"
				>
					<ChevronLeftIcon size="3em" />
				</button>
			)}
			<div className="flex overflow-hidden">
				{images
					.slice(firstImage, imageCount + firstImage)
					.map((image) => (
						<motion.div
							key={image.src}
							className="relative m-4 w-64 h-64 inline-block flex justify-center items-center"
						>
							<Link
								href="https://www.instagram.com/"
								target="_blank"
							>
								<motion.div
									className="absolute inset-0"
									initial={{ opacity: 1 }}
									whileHover={{ opacity: 1, scale: 1.05 }}
									transition={{ duration: 0.3 }}
								>
									<Image
										src={image.src}
										alt="Instagram post"
										layout="fill"
										objectFit="cover"
										priority
									/>
									<motion.div
										className="absolute inset-0 flex justify-center items-center text-white bg-black bg-opacity-40"
										initial={{ opacity: 0 }}
										whileHover={{ opacity: 1 }}
										transition={{ duration: 0.3 }}
									>
										<InstagramIcon />
									</motion.div>
								</motion.div>
							</Link>
						</motion.div>
					))}
			</div>

			{firstImage + imageCount < images.length && (
				<button
					type="button"
					className="text-secondary absolute -right-10 top-1/2 -translate-y-1/2 z-10"
					onClick={handleNext}
					aria-label="Next Instagram image"
				>
					<ChevronRightIcon size="3em" />
				</button>
			)}
		</div>
	);
};

const Social = (): JSX.Element => {
	const [firstImage, setFirstImage] = useState<number>(0);

	const handleNext = (): void => {
		setFirstImage((prev) => prev + 1);
	};

	const handlePrevious = (): void => {
		setFirstImage((prev) => prev - 1);
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="text-3xl uppercase tracking-widest pt-6">
				Glassify on Instagram
				<div className="w-2/3 bg-secondary h-1 mx-auto mt-2" />
			</div>
			<p className="text-2xl tracking-widest py-6 text-secondary">
				#glassify
			</p>
			<div className="flex flex-wrap justify-center items-center relative">
				<div className="hidden xl:flex">
					<InstagramImages
						firstImage={firstImage}
						imageCount={4}
						handleNext={handleNext}
						handlePrevious={handlePrevious}
					/>
				</div>
				<div className="hidden lg:flex xl:hidden">
					<InstagramImages
						firstImage={firstImage}
						imageCount={3}
						handleNext={handleNext}
						handlePrevious={handlePrevious}
					/>
				</div>
				<div className="hidden md:flex lg:hidden">
					<InstagramImages
						firstImage={firstImage}
						imageCount={2}
						handleNext={handleNext}
						handlePrevious={handlePrevious}
					/>
				</div>
				<div className="md:hidden">
					<InstagramImages
						firstImage={firstImage}
						imageCount={1}
						handleNext={handleNext}
						handlePrevious={handlePrevious}
					/>
				</div>
			</div>
		</div>
	);
};

export default Social;
