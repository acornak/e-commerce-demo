"use client";

import React from "react";
// Next
import { NextPage } from "next";
import Image from "next/image";
// Animations
import { motion } from "framer-motion";
// Components
import StyledHero from "@/components/hero/StyledHero";
import NewsletterBanner from "@/components/common/Newsletter";
// Images
import aboutHero from "@/public/about/about_hero.webp";
import storyImage from "@/public/about/about_story.webp";
import aboutBanner from "@/public/about/about_banner.webp";
import anna from "@/public/about/anna.webp";
import maria from "@/public/about/maria.jpeg";
// Icons
import DiamondIcon from "@/components/icon/Diamond";
import ShippingIcon from "@/components/icon/Shipping";
import PaymentsIcon from "@/components/icon/Payments";
import ReturnsIcon from "@/components/icon/Returns";
import SupportIcon from "@/components/icon/Support";

const OurStory = (): JSX.Element => (
	<div className="flex flex-col items-center justify-center text-center my-16">
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div className="mx-8 flex md:relative">
				<motion.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 1.1 }}
					transition={{ duration: 2 }}
					className="w-full h-full"
				>
					<Image
						src={storyImage.src}
						fill
						style={{
							objectFit: "cover",
						}}
						alt="Our story"
						className="hidden md:block"
					/>
					<Image
						src={storyImage.src}
						width={1000}
						height={1000}
						style={{
							height: "auto",
							width: "auto",
						}}
						alt="Our story"
						className="md:hidden"
					/>
				</motion.div>
			</div>

			<div className="mx-8 text-start flex flex-col">
				<h2 className="text-4xl lg:text-7xl font-semibold pt-4">
					Our Story
				</h2>
				<h2 className="text-xl lg:text-3xl font-semibold pt-4 pb-10">
					Cenean imperdiet. Fusce vel dui Praesent adipiscing.
				</h2>
				<p className="text-sm text-justify pb-4">
					Ut enim ad minim veniam, quis nostrud exercitation ullamco
					laboris nisi ut aliquip ex ea commodo consequat. Duis aute
					irure dolor in reprehenderit in voluptate velit esse cillum
					dolore eu fugiat nulla pariatur. Excepteur sint occaecat
					cupidatat non proident, sunt in culpa qui officia deserunt
					mollit anim id est laborum. Lorem ipsum dolor sit amet,
					consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi
					ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu
					fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</p>
				<p className="text-sm text-justify">
					Maecenas egestas arcu quis ligula mattis placerat. Quisque
					id mi. Sed a libero. Vestibulum ullamcorper mauris at
					ligula. Aenean posuere, tortor sed cursus feugiat, nunc
					augue blandit nunc, eu sollicitudin urna dolor sagittis
					lacus. Suspendisse non nisl sit amet velit hendrerit rutrum.
					Nulla porta dolor. Nunc interdum lacus sit amet orci
				</p>
			</div>
		</div>
	</div>
);

const OurBrand = (): JSX.Element => (
	<div className="flex items-center justify-center min-h-[60vh] h-[95vh] md:h-[70vh] lg:h-[80vh]">
		<div className="relative w-full h-full ">
			<Image
				src={aboutBanner.src}
				alt="Hero image"
				fill
				style={{
					objectFit: "cover",
				}}
				priority
			/>
			<div className="absolute inset-0 -top-10 flex items-center justify-center text-center md:mx-10 flex-col md:flex-row">
				<div className="w-full md:w-1/2 xl:w-1/3 p-8 text-white text-start">
					<h2 className="text-3xl lg:text-7xl font-semibold py-4">
						Behind The Brand
					</h2>
					<p className="text-sm pb-6 text-justify">
						We are a female-founded, 100% woman-led team of
						collaborative dreamers who value innovation, curiosity
						and free-thinking fearlessness in everything that we do.
					</p>
					<p className="text-sm text-justify">
						We take immeasurable pride in our work, intentionally
						stitching love into the very fiber and fabric of our
						designs. We are small, but we are a mighty group of
						talented individuals dedicated to bringing you
						otherworldly designs with imagery to match.
					</p>
				</div>
				<div className="w-full md:w-1/2 text-start">
					<div className="mx-1 flex relative justify-center items-center">
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 1.02 }}
							transition={{ duration: 2 }}
							className="mx-2 bg-white"
						>
							<Image
								src={anna.src}
								width={300}
								height={300}
								style={{
									height: "auto",
									width: "auto",
								}}
								alt="Our story"
							/>
							<p className="text-black px-4 pt-4 md:text-lg font-semibold">
								Anna Smith
							</p>
							<p className="text-black px-4 pb-4 text-sm">CEO</p>
						</motion.div>
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 1.02 }}
							transition={{ duration: 2 }}
							className="mx-2 bg-white"
						>
							<Image
								src={maria.src}
								width={300}
								height={300}
								style={{
									height: "auto",
									width: "auto",
								}}
								alt="Our story"
							/>
							<p className="text-black px-4 pt-4 text-lg font-semibold">
								Maria Smith
							</p>
							<p className="text-black px-4 pb-4 text-sm">
								Head of design
							</p>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const OurCommitment = (): JSX.Element => (
	<div className="flex flex-col items-center justify-center text-center mt-6 mb-10">
		<DiamondIcon />
		<p className="text-xl sm:text-2xl lg:text-4xl font-semibold pt-4 pb-10">
			We&apos;re committing to create the change
			<br />
			we want to see in the world
		</p>
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<div className="mx-8 border border-gray-300 p-6 flex flex-col items-center">
				<p className="text-secondary">
					<ShippingIcon />
				</p>
				<h3 className="text-lg font-semibold pt-4">Free Shipping</h3>
				<p className="text-sm">Capped at $39 per order</p>
			</div>
			<div className="mx-8 border border-gray-300 p-6 flex flex-col items-center">
				<p className="text-secondary">
					<PaymentsIcon />
				</p>
				<h3 className="text-lg font-semibold pt-4">
					Security Payments
				</h3>
				<p className="text-sm">Up to 12 months installments</p>
			</div>
			<div className="mx-8 border border-gray-300 p-6 flex flex-col items-center">
				<p className="text-secondary">
					<ReturnsIcon />
				</p>
				<h3 className="text-lg font-semibold pt-4">14-Day Returns</h3>
				<p className="text-sm">Shop with confidence</p>
			</div>
			<div className="mx-8 border border-gray-300 p-6 flex flex-col items-center">
				<p className="text-secondary">
					<SupportIcon />
				</p>
				<h3 className="text-lg font-semibold pt-4">24/7 Support</h3>
				<p className="text-sm">Delivered to your door</p>
			</div>
		</div>
	</div>
);

const AboutPage: NextPage = (): JSX.Element => {
	return (
		<>
			<StyledHero image={aboutHero} link="about" title="About Us" />
			<OurStory />
			<OurBrand />
			<OurCommitment />
			<NewsletterBanner />
		</>
	);
};

export default AboutPage;
