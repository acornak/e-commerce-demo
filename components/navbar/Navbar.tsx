"use client";

import React, { FC, useState } from "react";
// Next
import Link from "next/link";
// Components
// Animations
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
// Fonts
import { dancing } from "@/app/fonts";
// Types
import { NavIcon, NavItem } from "@/config/types";
import { NavItems, icons } from "./ NavItems";
// Icons
import BarsIcon from "../icons/Bars";
import ChevronRightIcon from "../icons/ChevronRight";
import UserIcon from "../icons/User";

type DesktopNavProps = {
	selected: null | number;
	setSelected: (index: number | null) => void;
};

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
			</motion.li>
		))}
	</LayoutGroup>
);

interface NavIconsProps extends DesktopNavProps {
	cartItems: number;
	mobile?: boolean;
}

const NavIcons: FC<NavIconsProps> = ({
	selected,
	setSelected,
	cartItems,
	mobile,
}) => {
	return (
		<LayoutGroup id="nav-icons">
			{icons(cartItems).map(
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
							<Link href={icon.url}>{icon.icon}</Link>
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

const Navbar = (): JSX.Element => {
	const [selected, setSelected] = useState<number | null>(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const cartItems = 0;

	return (
		<>
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
					/>
				</div>
				<div className="flex space-x-4 md:hidden">
					<NavIcons
						selected={selected}
						setSelected={setSelected}
						cartItems={cartItems}
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
						className="fixed inset-0 bg-black bg-opacity-70 z-60"
						onClick={() => setIsDrawerOpen(false)}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default Navbar;
