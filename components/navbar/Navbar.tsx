"use client";

import React, { useEffect, useRef, useState } from "react";
// Next
import Link from "next/link";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Fonts
import { dancing } from "@/app/fonts";
// Types and constants
import { colors } from "@/lib/config/constants";
// Store
import { updateCartStore, useCartStore } from "@/lib/stores/cart-store";
// Components
import { useModalsStore } from "@/lib/stores/modals-store";
import useOutsideAlerter from "@/lib/hooks/outside-click";
import { useAuthStore } from "@/lib/stores/auth-store";
import DesktopItems from "./Desktop";
import MobileItems from "./NavbarMobile";
import { NavItemsDesktop, NavItemsMobile } from "./NavItems";
import { NavIcons, MenuIcons } from "./NavIcons";
// Icons
import BarsIcon from "../icon/Bars";

const Navbar = (): JSX.Element => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [selected, setSelected] = useState<number | null>(null);
	const [shouldShowNavbar, setShouldShowNavbar] = useState<boolean>(true);
	const toggleDrawerMenuOpen = useModalsStore(
		(state) => state.toggleDrawerMenuOpen,
	);
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const user = useAuthStore((state) => state.user);
	const initialLoading = useAuthStore((state) => state.initialLoading);
	const logOut = useAuthStore((state) => state.logOut);

	useEffect(() => {
		if (!initialLoading && user) {
			setLoggedIn(true);
		} else if (!user) {
			setLoggedIn(false);
		}
	}, [initialLoading, user]);

	useOutsideAlerter(dropdownRef, () => {
		if (dropdownOpen) setDropdownOpen(false);
	});

	const handleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				if (dropdownOpen) setDropdownOpen(false);
			}
		};

		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [dropdownOpen]);

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
				className={`${navClass} fixed transition-all ease-in-out duration-300 bg-white w-full z-50 flex justify-between items-center px-5 lg:px-12 py-3 lg:py-6 border border-b border-gray-300`}
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
				<div className="space-x-4 hidden md:flex relative">
					<NavIcons
						selected={selected}
						setSelected={setSelected}
						icons={MenuIcons(cartItems, loggedIn, handleDropdown)}
						navItems={NavItemsDesktop}
					/>

					<AnimatePresence>
						{dropdownOpen && (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.2 }}
								className="absolute right-20 top-5 mt-2 py-2 w-48 bg-white shadow-xl z-20 border border-gray-200"
								ref={dropdownRef}
							>
								<ul className="uppercase tracking-widest">
									<Link
										href="/account"
										onClick={() => setDropdownOpen(false)}
									>
										<motion.li
											whileHover={{
												scale: 1.05,
												color: colors.secondary,
											}}
											whileTap={{
												scale: 1.05,
												color: colors.secondary,
											}}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Account
										</motion.li>
									</Link>
									<Link
										href="/orders"
										onClick={() => setDropdownOpen(false)}
									>
										<motion.li
											whileHover={{
												scale: 1.05,
												color: colors.secondary,
											}}
											whileTap={{
												scale: 1.05,
												color: colors.secondary,
											}}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Orders
										</motion.li>
									</Link>
									<motion.button
										type="button"
										whileHover={{
											scale: 1.05,
											color: colors.secondary,
										}}
										whileTap={{
											scale: 1.05,
											color: colors.secondary,
										}}
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 uppercase tracking-widest w-full text-start"
										onClick={() => {
											logOut();
											setDropdownOpen(false);
										}}
									>
										Logout
									</motion.button>
								</ul>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<div className="flex space-x-4 md:hidden">
					<NavIcons
						selected={selected}
						setSelected={setSelected}
						icons={MenuIcons(cartItems, loggedIn, handleDropdown)}
						navItems={NavItemsMobile}
						mobile
					/>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
