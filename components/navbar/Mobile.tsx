"use client";

import React, { FC, useState } from "react";
// Next
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Components
import { NavItems } from "./NavItems";
// Icons
import BarsIcon from "../icons/Bars";
import ChevronRightIcon from "../icons/ChevronRight";
import UserIcon from "../icons/User";

type MobileItemsProps = {
	isDrawerOpen: boolean;
	setIsDrawerOpen: (open: boolean) => void;
};

const MobileItems: FC<MobileItemsProps> = ({
	isDrawerOpen,
	setIsDrawerOpen,
}): JSX.Element => {
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	return (
		<motion.div
			initial="closed"
			animate={isDrawerOpen ? "open" : "closed"}
			variants={{
				open: { x: 0, opacity: 1 },
				closed: { x: "-100%", opacity: 0 },
			}}
			transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
			className="fixed top-0 left-0 h-full bg-white shadow-xl z-50 uppercase"
			style={{ width: "320px" }}
		>
			<ul>
				<div className="flex justify-between border-b border-gray-300 uppercase text-xs">
					<button
						type="button"
						className="bg-black text-white p-3 flex items-center justify-center w-1/2 cursor-pointer"
						onClick={() => setIsDrawerOpen(false)}
					>
						<BarsIcon />
						<span className="pl-4">Menu</span>
					</button>
					<Link
						href="/login"
						className="flex items-center justify-center w-1/2"
					>
						<div className="w-5 h-5">
							<UserIcon />
						</div>
						<span className="pl-4">Login</span>
					</Link>
				</div>

				{NavItems.map((item, index) => (
					<motion.li
						key={item.title}
						className="border-b border-gray-300"
						onHoverStart={() => setHoverIndex(index)}
						onHoverEnd={() => setHoverIndex(null)}
						initial={{ color: "#333" }}
						animate={{
							color: hoverIndex === index ? "#FF6347" : "#333",
						}}
					>
						<a
							href={item.url}
							className="flex justify-between items-center px-4"
						>
							{item.title}
							<span className="flex items-center">
								<div className="mx-2 h-14 w-px bg-gray-300" />{" "}
								<motion.div
									animate={{
										scale: hoverIndex === index ? 1.5 : 1,
									}}
									transition={{
										type: "spring",
										stiffness: 300,
									}}
								>
									<ChevronRightIcon />
								</motion.div>
							</span>
						</a>
					</motion.li>
				))}
			</ul>
			<button
				type="button"
				onClick={() => setIsDrawerOpen(false)}
				className="absolute bottom-0 w-full p-4 text-white uppercase text-sm"
				style={{
					backgroundColor: "#FF6347",
				}}
			>
				Close
			</button>
		</motion.div>
	);
};

export default MobileItems;
