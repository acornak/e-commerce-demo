"use client";

import React, { useEffect, useRef, useState } from "react";
// Next
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";
// Hooks
import useOutsideAlerter from "@/lib/hooks/outside-click";
// Fonts
import { dancing } from "@/app/fonts";
// Components
import { useModalsStore } from "@/lib/stores/modals-store";
import DesktopItems from "./DesktopItems";
import MobileItems from "./NavbarMobile";
import { NavItemsAdmin } from "./NavItems";
import { NavIcons, adminIcons } from "./NavIcons";
// Store
// Icons
import BarsIcon from "../icon/Bars";

const NavbarAdmin = (): JSX.Element => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [selected, setSelected] = useState<number | null>(null);
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const toggleDrawerMenuOpen = useModalsStore(
		(state) => state.toggleDrawerMenuOpen,
	);

	useOutsideAlerter(dropdownRef, () => {
		if (dropdownOpen) setDropdownOpen(false);
	});

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

	const handleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};

	return (
		<>
			<MobileItems items={NavItemsAdmin} />
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
					onClick={() => toggleDrawerMenuOpen()}
				>
					<BarsIcon />
				</motion.div>

				<Link
					className={`${dancing.className} text-4xl hidden lg:flex cursor-pointer select-none`}
					href="/admin"
				>
					Glassify
				</Link>
				<ul className="flex justify-center items-center space-x-8">
					<Link
						className={`${dancing.className} text-3xl lg:hidden cursor-pointer select-none`}
						href="/admin"
					>
						Glassify
					</Link>
					<DesktopItems
						selected={selected}
						setSelected={setSelected}
						items={NavItemsAdmin}
					/>
				</ul>
				<div className="space-x-4 flex" ref={dropdownRef}>
					<NavIcons
						selected={selected}
						setSelected={setSelected}
						icons={adminIcons(dropdownOpen, handleDropdown)}
						navItems={NavItemsAdmin}
					/>
				</div>
			</nav>
		</>
	);
};

export default NavbarAdmin;
