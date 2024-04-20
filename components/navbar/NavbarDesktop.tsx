"use client";

import React, { useState } from "react";
// Next
import Link from "next/link";
// Animations
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
// Fonts
import { dancing } from "@/app/fonts";
// Styles
import "./Navbar.css";

import { NavIcon, NavItem } from "@/config/types";
import { NavItems, Icons } from "./ NavItems";
// Types

const NavbarDesktop = (): JSX.Element => {
	const [selected, setSelected] = useState<number | null>(null);

	return (
		<nav className="sticky top-0 bg-white w-full shadow-md z-50 flex justify-between items-center px-12 py-8">
			<div className={`${dancing.className} text-3xl logo`}>
				Demo Project
			</div>
			<ul className="flex justify-center items-center space-x-8 uppercase grow">
				<LayoutGroup id="nav-items">
					{NavItems.map((item: NavItem, index: number) => (
						<motion.li
							key={item.title}
							onMouseEnter={() => setSelected(index)}
							onMouseLeave={() => setSelected(null)}
							className="cursor-pointer relative"
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
			</ul>
			<div className="flex space-x-4">
				<LayoutGroup id="nav-icons">
					{Icons.map(
						(icon: NavIcon, index: number): JSX.Element => (
							<motion.div
								key={icon.title}
								whileHover={{ color: "#FF6347" }}
								onMouseEnter={() =>
									setSelected(index + NavItems.length)
								}
								onMouseLeave={() => setSelected(null)}
								transition={{ duration: 0.2 }}
								className="cursor-pointer relative"
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
						),
					)}
				</LayoutGroup>
			</div>
		</nav>
	);
};

export default NavbarDesktop;
