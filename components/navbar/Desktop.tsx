"use client";

import React, { FC } from "react";
// Next
import Link from "next/link";
// Animations
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";

// Types
import { DesktopNavProps, NavItem } from "@/config/types";
import { NavItems } from "./NavItems";

const DesktopItems: FC<DesktopNavProps> = ({ selected, setSelected }) => (
	<LayoutGroup id="nav-items">
		{NavItems.map((item: NavItem, index: number) => (
			<motion.li
				key={item.title}
				onMouseEnter={() => setSelected(index)}
				onMouseLeave={() => setSelected(null)}
				className="cursor-pointer relative hidden lg:flex uppercase grow"
				initial={{ color: "#333" }}
				animate={{
					color: selected === index ? "#FF6347" : "#333",
				}}
				transition={{ duration: 0.2 }}
			>
				<Link href={item.url}>{item.title}</Link>
				<AnimatePresence>
					{selected === index && (
						<motion.div
							className="absolute left-0 bottom-0 h-0.5"
							layoutId={`underline-${index}`}
							initial={{
								width: 0,
								x: 0,
							}}
							animate={{
								width: "100%",
								x: 0,
							}}
							exit={{
								width: 0,
								x: 0,
								backgroundColor: "#333",
							}}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
							style={{ backgroundColor: "#FF6347" }}
						/>
					)}
				</AnimatePresence>
			</motion.li>
		))}
	</LayoutGroup>
);

export default DesktopItems;
