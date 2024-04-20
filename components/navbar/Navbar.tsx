"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import Link from "next/link";
// Animations
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
// Components
import { dancing } from "@/app/fonts";
import { DesktopNavProps, NavIcon } from "@/config/types";
import DesktopItems from "./Desktop";
import MobileItems from "./Mobile";
import { NavItems, icons } from "./NavItems";
// Fonts
// Types
// Icons
import BarsIcon from "../icons/Bars";
import SearchBar from "./Search";

interface NavIconsProps extends DesktopNavProps {
	setIsSearchOpen: (open: boolean) => void;
	cartItems: number;
	mobile?: boolean;
}

const NavIcons: FC<NavIconsProps> = ({
	selected,
	setSelected,
	setIsSearchOpen,
	cartItems,
	mobile,
}) => {
	return (
		<LayoutGroup id="nav-icons">
			{icons(cartItems, setIsSearchOpen).map(
				(icon: NavIcon, index: number): JSX.Element | null => {
					if (
						mobile &&
						(icon.title === "Heart" || icon.title === "User")
					)
						return null;

					return (
						<motion.div
							key={icon.title}
							whileHover={{ color: "#FF6347" }}
							onMouseEnter={() =>
								setSelected(index + NavItems.length)
							}
							onMouseLeave={() => setSelected(null)}
							transition={{ duration: 0.2 }}
							className="cursor-pointer relative pb-1"
							style={{ display: "flex" }}
						>
							{icon.url ? (
								<Link href={icon.url}>{icon.icon}</Link>
							) : (
								icon.icon
							)}
							<AnimatePresence>
								{selected === index + NavItems.length && (
									<motion.div
										className="absolute left-0 bottom-0 h-0.5"
										data-testid={`${icon.title}Underline`}
										layoutId={`underline-${index}`}
										initial={{
											width: 0,
											x: 0,
											backgroundColor: "#FF6347",
										}}
										animate={{
											width: "100%",
											x: 0,
											backgroundColor: "#FF6347",
										}}
										exit={{
											width: 0,
											x: 0,
											backgroundColor: "black",
										}}
										transition={{
											duration: 0.3,
											ease: "easeInOut",
										}}
									/>
								)}
							</AnimatePresence>
						</motion.div>
					);
				},
			)}
		</LayoutGroup>
	);
};

const Navbar = (): JSX.Element => {
	const [selected, setSelected] = useState<number | null>(null);
	const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const cartItems = 0;

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				if (isSearchOpen) setIsSearchOpen(false);
				if (isDrawerOpen) setIsDrawerOpen(false);
			}
		};

		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [isSearchOpen, isDrawerOpen]);

	return (
		<>
			<SearchBar isSearchOpen={isSearchOpen} />
			<nav className="top-0 bg-white w-full z-50 flex justify-between items-center px-5 lg:px-12 py-3 lg:py-8">
				<motion.div
					className="cursor-pointer lg:hidden"
					initial={{ color: "#333" }}
					whileHover={{ color: "#FF6347" }}
					transition={{ duration: 0.2 }}
					onClick={() => setIsDrawerOpen((prev) => !prev)}
				>
					<BarsIcon />
				</motion.div>
				<MobileItems
					isDrawerOpen={isDrawerOpen}
					setIsDrawerOpen={setIsDrawerOpen}
				/>

				<Link
					className={`${dancing.className} text-3xl hidden lg:flex cursor-pointer select-none`}
					href="/"
				>
					Demo Project
				</Link>
				<ul className="flex justify-center items-center space-x-8">
					<Link
						className={`${dancing.className} text-2xl lg:hidden cursor-pointer select-none`}
						href="/"
					>
						Demo Project
					</Link>
					<DesktopItems
						selected={selected}
						setSelected={setSelected}
					/>
				</ul>
				<div className="space-x-4 hidden md:flex">
					<NavIcons
						selected={selected}
						setSelected={setSelected}
						cartItems={cartItems}
						setIsSearchOpen={setIsSearchOpen}
					/>
				</div>
				<div className="flex space-x-4 md:hidden">
					<NavIcons
						selected={selected}
						setSelected={setSelected}
						cartItems={cartItems}
						setIsSearchOpen={setIsSearchOpen}
						mobile
					/>
				</div>
			</nav>
			<AnimatePresence>
				{isDrawerOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.7 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black bg-opacity-80"
						style={{
							zIndex: 20,
						}}
						onClick={() => setIsDrawerOpen(false)}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{isSearchOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.7 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black bg-opacity-80"
						style={{
							zIndex: 20,
						}}
						onClick={() => {
							setIsSearchOpen(false);
						}}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default Navbar;
