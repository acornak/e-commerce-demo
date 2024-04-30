"use client";

import React, { useEffect, useState } from "react";
// Next
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Fonts
import { dancing } from "@/app/fonts";
// Types and constants
import { colors } from "@/lib/config/constants";
// Store
import { updateCartStore, useCartStore } from "@/lib/stores/cart-store";
// Components
import { useModalsStore } from "@/lib/stores/modals-store";
import DesktopItems from "./Desktop";
import MobileItems from "./NavbarMobile";
import { NavItemsDesktop, NavItemsMobile } from "./NavItems";
import { NavIcons, MenuIcons } from "./NavIcons";
// Icons
import BarsIcon from "../icon/Bars";

const Navbar = (): JSX.Element => {
	const [selected, setSelected] = useState<number | null>(null);
	const [shouldShowNavbar, setShouldShowNavbar] = useState<boolean>(true);
	const toggleDrawerMenuOpen = useModalsStore(
		(state) => state.toggleDrawerMenuOpen,
	);

	useEffect((): (() => void) => {
		let lastScrollTop = 0;

		const handleScroll = (): void => {
			const currentScrollTop =
				window.scrollY || document.documentElement.scrollTop;

			if (currentScrollTop < lastScrollTop || currentScrollTop < 50) {
				setShouldShowNavbar(true);
			} else {
				setShouldShowNavbar(false);
			}
			lastScrollTop = currentScrollTop;
		};

		const handleMouseMove = (e: MouseEvent) => {
			const currentScrollTop =
				window.scrollY || document.documentElement.scrollTop;

			if (e.clientY < 50) {
				setShouldShowNavbar(true);
			} else if (e.clientY > 185 && currentScrollTop !== 0) {
				setShouldShowNavbar(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("mousemove", handleMouseMove);

		return (): void => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	const cartItems = useCartStore((state) =>
		state.items.reduce((total, item) => total + item.quantity, 0),
	);

	useEffect(() => {
		document.addEventListener("visibilitychange", updateCartStore);
		window.addEventListener("focus", updateCartStore);
		return () => {
			document.removeEventListener("visibilitychange", updateCartStore);
			window.removeEventListener("focus", updateCartStore);
		};
	}, []);

	const navClass = shouldShowNavbar ? "top-0" : "-top-full";

	return (
		<>
			<MobileItems items={NavItemsMobile} />
			<nav
				className={`${navClass} fixed transition-all ease-in-out duration-300 bg-white w-full z-50 flex justify-between items-center px-5 lg:px-12 py-3 lg:py-8 border border-b border-gray-300`}
				style={{
					zIndex: 20,
				}}
			>
				<motion.div
					className="cursor-pointer lg:hidden"
					initial={{ color: "#333" }}
					whileHover={{ color: colors.secondary }}
					whileTap={{ color: colors.secondary }}
					transition={{ duration: 0.2 }}
					onClick={() => toggleDrawerMenuOpen()}
				>
					<BarsIcon />
				</motion.div>

				<Link
					className={`${dancing.className} text-4xl hidden lg:flex cursor-pointer select-none`}
					href="/"
				>
					Glassify
				</Link>
				<ul className="flex justify-center items-center text-center space-x-8">
					<Link
						className={`${dancing.className} text-3xl lg:hidden cursor-pointer select-none`}
						href="/"
					>
						Glassify
					</Link>
					<DesktopItems
						selected={selected}
						setSelected={setSelected}
						items={NavItemsDesktop}
					/>
				</ul>
				<div className="space-x-4 hidden md:flex">
					<NavIcons
						selected={selected}
						setSelected={setSelected}
						icons={MenuIcons(cartItems)}
						navItems={NavItemsDesktop}
					/>
				</div>
				<div className="flex space-x-4 md:hidden">
					<NavIcons
						selected={selected}
						setSelected={setSelected}
						icons={MenuIcons(cartItems)}
						navItems={NavItemsMobile}
						mobile
					/>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
