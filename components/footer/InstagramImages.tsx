"use client";

import React, { FC } from "react";
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
import ig5 from "@/public/instagram/ig_5.webp";
import ig6 from "@/public/instagram/ig_6.webp";
import ig7 from "@/public/instagram/ig_7.webp";
// Icons
import { InstagramIcon } from "../icon/Instagram";
import ChevronLeftIcon from "../icon/ChevronLeft";
import ChevronRightIcon from "../icon/ChevronRight";

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
		<div
			className="flex relative w-full"
			data-testid="footer-instagram-images"
		>
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
								rel="noopener noreferrer"
							>
								<motion.div
									className="absolute inset-0"
									initial={{ opacity: 1 }}
									whileHover={{ opacity: 1, scale: 1.05 }}
									whileTap={{ opacity: 1, scale: 1.05 }}
									transition={{ duration: 0.3 }}
								>
									<Image
										src={image.src}
										alt="Instagram post"
										fill
										sizes="10vw"
										style={{
											objectFit: "cover",
										}}
										priority
									/>
									<motion.div
										className="absolute inset-0 flex justify-center items-center text-white bg-black bg-opacity-40"
										initial={{ opacity: 0 }}
										whileHover={{ opacity: 1 }}
										whileTap={{ opacity: 1 }}
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

export default InstagramImages;
