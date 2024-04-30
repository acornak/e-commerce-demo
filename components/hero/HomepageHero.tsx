"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Images
import heroWomen from "@/public/homepage/hero_1.jpeg";
import heroMen from "@/public/homepage/hero_2.webp";
import heroChildren from "@/public/homepage/hero_3.jpeg";
// Types and constants
import { colors } from "@/lib/config/constants";
// Icons
import ChevronRightIcon from "../icon/ChevronRight";
import ChevronLeftIcon from "../icon/ChevronLeft";
// Components
import { StyledHeroHeading } from "../styled/Heading";

type Heroes = {
	image: StaticImageData;
	heading: string | JSX.Element;
	content: string | JSX.Element;
};

type HeroHeadingProps = {
	heading: string;
	subheading: string;
};

const HeroHeading: FC<HeroHeadingProps> = ({
	heading,
	subheading,
}): JSX.Element => (
	<div className="xl:-ml-96 px-20">
		<p>
			<span className="text-white text-xs md:text-sm tracking-3xl uppercase">
				{subheading}
			</span>
		</p>
		<StyledHeroHeading title={heading} />
	</div>
);

type HeroButtonProps = {
	text: string;
	href: string;
};

const HeroButton: FC<HeroButtonProps> = ({ text, href }): JSX.Element => (
	<Link href={href}>
		<motion.div
			whileHover={{
				scale: 1.05,
				backgroundColor: colors.secondary,
				color: colors.white,
				transition: { duration: 0.3 },
			}}
			whileTap={{
				scale: 1.05,
				backgroundColor: colors.secondary,
				color: colors.white,
				transition: { duration: 0.3 },
			}}
			style={{
				backgroundColor: colors.white,
				color: colors.black,
				borderRadius: "9999px",
			}}
			className="py-3 rounded-full px-6 uppercase text-xs cursor-pointer"
		>
			{text}
		</motion.div>
	</Link>
);

type HeroContentProps = {
	text: string;
	buttonText: string;
	href: string;
};

const HeroContent: FC<HeroContentProps> = ({
	text,
	buttonText,
	href,
}): JSX.Element => (
	<div className="flex flex-col text-white text-sm md:text-xl items-center justify-center xl:-ml-96 px-20">
		<p className="pb-6">{text}</p>

		<HeroButton text={buttonText} href={href} />
	</div>
);

const heroes: Heroes[] = [
	{
		image: heroWomen,
		heading: (
			<HeroHeading
				heading="Glasses for Women"
				subheading="Stylish Protection"
			/>
		),
		content: (
			<HeroContent
				text="Sunglasses for the brightest stars under the sun."
				buttonText="Shop Now"
				href="/products/categories/women"
			/>
		),
	},
	{
		image: heroMen,
		heading: (
			<HeroHeading
				heading="Glasses for Men"
				subheading="Visual Experience"
			/>
		),
		content: (
			<HeroContent
				text="Be prepared for the unexpected."
				buttonText="Shop Now"
				href="/products/categories/men"
			/>
		),
	},
	{
		image: heroChildren,
		heading: (
			<HeroHeading
				heading="Glasses for Children"
				subheading="Protect the Future"
			/>
		),
		content: (
			<HeroContent
				text="Protect your child's eyes from the sun."
				buttonText="Shop Now"
				href="/products/categories/children"
			/>
		),
	},
];

const HomepageHero: FC = (): JSX.Element => {
	const [current, setCurrent] = useState<number>(0);
	const [isChanging, setIsChanging] = useState<boolean>(false);

	const handleNext = (): void => {
		if (!isChanging) {
			setIsChanging(true);
			setTimeout(() => {
				setCurrent((curr) => (curr + 1) % heroes.length);
				setIsChanging(false);
			}, 200);
		}
	};

	const handlePrev = (): void => {
		if (!isChanging) {
			setIsChanging(true);
			setTimeout(() => {
				setCurrent(
					(curr) => (curr - 1 + heroes.length) % heroes.length,
				);
				setIsChanging(false);
			}, 200);
		}
	};

	useEffect(() => {
		let intervalId: number | null = null;

		const startInterval = () => {
			if (!isChanging && !intervalId) {
				intervalId = window.setInterval(() => {
					setCurrent(
						(prevCurrent) => (prevCurrent + 1) % heroes.length,
					);
				}, 4000);
			}
		};

		const stopInterval = () => {
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}
		};

		startInterval();

		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				stopInterval();
			} else {
				startInterval();
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			stopInterval();
			document.removeEventListener(
				"visibilitychange",
				handleVisibilityChange,
			);
		};
	}, [isChanging]);

	return (
		<section className="flex flex-col items-center justify-center h-[65vh] md:h-[75vh] lg:h-[95vh]">
			<div className="flex justify-center items-center relative w-full h-full">
				<AnimatePresence mode="sync" initial={false}>
					<motion.div
						key={current}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							opacity: { duration: 0.5, ease: "linear" },
						}}
						className="w-full h-full absolute"
					>
						<Image
							src={heroes[current].image.src}
							alt="hero"
							fill
							style={{ objectFit: "cover" }}
							priority
						/>
						<div className="absolute inset-0 bg-black bg-opacity-30" />
					</motion.div>
				</AnimatePresence>
				<motion.div
					key={current}
					className="absolute inset-0 flex flex-col justify-center items-center text-center p-4"
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						y: {
							type: "spring",
							stiffness: 100,
							damping: 10,
							mass: 0.75,
						},
						opacity: {
							duration: 0.5,
						},
					}}
				>
					{heroes[current].heading}
					{heroes[current].content}
				</motion.div>
				<motion.button
					type="button"
					onClick={handlePrev}
					className="absolute left-0 z-10 bg-white overflow-hidden"
					aria-label="Go to previous slide"
					whileHover={{
						scale: 1.3,
						color: colors.secondary,
					}}
					whileTap={{
						scale: 1.3,
						color: colors.secondary,
					}}
					transition={{
						type: "spring",
						stiffness: 300,
					}}
					style={{ transformOrigin: "left center" }}
				>
					<ChevronLeftIcon size="3em" />
				</motion.button>
				<motion.button
					type="button"
					onClick={handleNext}
					className="absolute right-0 z-10 bg-white overflow-hidden"
					aria-label="Go to next slide"
					whileHover={{
						scale: 1.3,
						color: colors.secondary,
					}}
					whileTap={{
						scale: 1.3,
						color: colors.secondary,
					}}
					transition={{
						type: "spring",
						stiffness: 300,
					}}
					style={{ transformOrigin: "right center" }}
				>
					<ChevronRightIcon size="3em" />
				</motion.button>
			</div>
		</section>
	);
};

export default HomepageHero;
