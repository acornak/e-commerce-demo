"use client";

import React from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";
// Images
import borat from "@/public/misc/borat.png";
import woman from "@/public/misc/woman.png";
// Components
import { StyledSectionHeading } from "../styled/Heading";

const ExploreButton = ({ href }: { href: string }): JSX.Element => (
	<Link href={href}>
		<motion.button
			whileHover={{
				scale: 1.05,
				backgroundColor: colors.secondary,
				color: colors.white,
			}}
			whileTap={{
				scale: 1.05,
				backgroundColor: colors.secondary,
				color: colors.white,
			}}
			type="button"
			transition={{ duration: 0.6 }}
			className="bg-white text-secondary-red font-medium py-2 px-4 w-full sm:w-2/3 md:w-[120%] xl:w-2/3 rounded-full uppercase tracking-xl font-semibold"
		>
			Explore now
		</motion.button>
	</Link>
);

const Explore = (): JSX.Element => {
	const [hovered, setHovered] = React.useState<number | null>(null);

	return (
		<>
			<StyledSectionHeading title="Explore new arrivals" />
			<div className="flex justify-center items-center mt-10 px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
					<div className="flex flex-col bg-secondary-red">
						<div
							className="flex md:flex-row flex-col-reverse items-start text-start w-full h-full relative overflow-hidden p-6"
							onMouseEnter={() => setHovered(0)}
							onMouseLeave={() => setHovered(null)}
						>
							<div
								className="flex flex-col space-y-3 pl-6 pt-10 w-2/3 pb-10"
								style={{
									zIndex: 10,
								}}
							>
								<div className="border-l-2 border-white">
									<p className="pl-4 text-xl text-white">
										Spring {new Date().getFullYear()}
									</p>
									<p className="pl-4 text-xl text-white">
										For Ladies
									</p>
								</div>
								<h2 className="text-white text-4xl text-white pt-3 pb-6">
									Stylish and Comfortable
								</h2>
								<ExploreButton href="/products/men" />
							</div>
							<motion.div
								animate={
									hovered === 0
										? { scale: 1.1 }
										: { scale: 1 }
								}
								transition={{ duration: 1 }}
								className="absolute -right-20 sm:-right-40 xl:-right-60 -bottom-16 w-[120%] h-[120%] overflow-hidden"
							>
								<Image
									src={borat.src}
									alt="borat"
									fill
									sizes="20vw"
									style={{
										objectFit: "contain",
									}}
								/>
							</motion.div>
						</div>
					</div>
					<div className="flex flex-col bg-secondary-blue">
						<div
							className="flex md:flex-row flex-col-reverse items-start text-start w-full h-full relative overflow-hidden p-6"
							onMouseEnter={() => setHovered(1)}
							onMouseLeave={() => setHovered(null)}
						>
							<div
								className="flex flex-col space-y-3 pl-6 pt-10 w-2/3 pb-10"
								style={{
									zIndex: 10,
								}}
							>
								<div className="border-l-2 border-white">
									<p className="pl-4 text-xl text-white">
										New Collection
									</p>
									<p className="pl-4 text-xl text-white">
										For Ladies
									</p>
								</div>
								<h2 className="text-white text-4xl text-white pt-3 pb-6">
									Stylish and Comfortable
								</h2>
								<ExploreButton href="/products/women" />
							</div>
							<motion.div
								animate={
									hovered === 1
										? { scale: 1.1 }
										: { scale: 1 }
								}
								transition={{ duration: 1 }}
								className="absolute -right-30 md:-right-40 lg:-right-40 xl:-right-52 -bottom-20 lg:-bottom-16 w-[120%] h-[120%] xl:w-[110%] xl:h-[110%] overflow-hidden"
							>
								<Image
									src={woman.src}
									alt="woman with glasses"
									fill
									sizes="20vw"
									style={{
										objectFit: "contain",
									}}
								/>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Explore;
