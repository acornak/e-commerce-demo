"use client";

import React, { useEffect, useState } from "react";
// Next
import Link from "next/link";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Fonts
import { dancing } from "@/app/fonts";
// Types and constants
import colors from "@/lib/config/constants";
// Store
import { useCartStore } from "@/lib/stores/cart-store";
// Components
import DesktopItems from "./Desktop";
import MobileItems from "./NavbarMobile";
import { NavItems } from "./NavItems";
import SearchBar from "./SearchBar";
import LoginModal from "../modal/LoginModal";
import ShoppingCart from "./Cart";
import { NavIcons, menuIcons } from "./NavIcons";
// Icons
import BarsIcon from "../icon/Bars";

const Navbar = (): JSX.Element => {
	const [selected, setSelected] = useState<number | null>(null);
	const [searchOpen, setSearchOpen] = useState<boolean>(false);
	const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
	const [cartOpen, setCartOpen] = useState<boolean>(false);
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
	const items = useCartStore((state) => state.items);
	const cartItems = useCartStore((state) =>
		state.items.reduce((total, item) => total + item.quantity, 0),
	);

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				if (searchOpen) setSearchOpen(false);
				if (drawerOpen) setDrawerOpen(false);
				if (loginModalOpen) setLoginModalOpen(false);
				if (cartOpen) setCartOpen(false);
			}
		};

		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [searchOpen, drawerOpen, loginModalOpen, cartOpen]);

	const showFade = (): boolean => {
		if (searchOpen || drawerOpen || loginModalOpen || cartOpen) return true;
		return false;
	};

	return (
		<>
			<LoginModal
				modalOpen={loginModalOpen}
				setModalOpen={setLoginModalOpen}
			/>
			<SearchBar searchOpen={searchOpen} />
			<AnimatePresence>
				{cartOpen && (
					<ShoppingCart setCartOpen={setCartOpen} items={items} />
				)}
			</AnimatePresence>
			<MobileItems
				drawerOpen={drawerOpen}
				setDrawerOpen={setDrawerOpen}
				items={NavItems}
			/>
			<nav
				className="sticky top-0 bg-white w-full z-50 flex justify-between items-center px-5 lg:px-12 py-3 lg:py-8 border border-b border-gray-300"
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
					onClick={() => setDrawerOpen((prev) => !prev)}
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
						items={NavItems}
					/>
				</ul>
				<div className="space-x-4 hidden md:flex">
					<NavIcons
						selected={selected}
						setSelected={setSelected}
						icons={menuIcons(
							cartItems,
							setSearchOpen,
							setLoginModalOpen,
							setCartOpen,
						)}
					/>
				</div>
				<div className="flex space-x-4 md:hidden">
					<NavIcons
						selected={selected}
						setSelected={setSelected}
						icons={menuIcons(
							cartItems,
							setSearchOpen,
							setLoginModalOpen,
							setCartOpen,
						)}
						mobile
					/>
				</div>
			</nav>
			<AnimatePresence>
				{showFade() && (
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
							setSearchOpen(false);
							setDrawerOpen(false);
							setLoginModalOpen(false);
							setCartOpen(false);
						}}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default Navbar;
