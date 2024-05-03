"use client";

import React, { FC } from "react";
// Next
import { useRouter } from "next/navigation";
// Animations
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
// Types and constants
import { DesktopNavProps, NavItem } from "@/lib/config/types";
import { colors } from "@/lib/config/constants";

interface DesktopItemsProps extends DesktopNavProps {
	items: NavItem[];
}

const DesktopItems: FC<DesktopItemsProps> = ({
	selected,
	setSelected,
	items,
}) => {
	const router = useRouter();
	return (
		<LayoutGroup id="nav-items">
			{items.map((item: NavItem, index: number) => (
				<motion.li
					key={item.title}
					onMouseEnter={() => setSelected(index)}
					onMouseLeave={() => setSelected(null)}
					className="cursor-pointer relative hidden lg:flex uppercase grow"
					initial={{ color: "#333" }}
					animate={{
						color: selected === index ? colors.secondary : "#333",
					}}
					transition={{ duration: 0.2 }}
					onClick={() => router.push(item.url)}
				>
					{item.title}
					<AnimatePresence>
						{selected === index && (
							<motion.div
								className="absolute left-0 bottom-0 h-0.5 bg-secondary"
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
							/>
						)}
					</AnimatePresence>
				</motion.li>
			))}
		</LayoutGroup>
	);
};

export default DesktopItems;
