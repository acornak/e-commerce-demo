import React, { FC } from "react";
// Next
import Link from "next/link";
// Animations
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
// Types and constants
import { NavIcon, DesktopNavProps } from "@/lib/config/types";
import colors from "@/lib/config/constants";
// Components
import { NavItems } from "./NavItems";
// Icons
import BagIcon from "../icon/Bag";
import MagnifierIcon from "../icon/Magnifier";
import UserIcon from "../icon/User";
import HeartIcon from "../icon/Heart";

const CartIcon = ({
	cartItems,
	setCartOpen,
}: {
	cartItems: number;
	setCartOpen: (open: boolean) => void;
}) => (
	<button
		type="button"
		aria-label="Open shopping cart"
		className="relative"
		onClick={() => setCartOpen(true)}
	>
		<BagIcon />
		<div className="absolute -top-2 -right-2 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs bg-secondary">
			{cartItems}
		</div>
	</button>
);

const SearchIcon = ({
	setSearchOpen,
}: {
	setSearchOpen: (open: boolean) => void;
}) => (
	<button
		type="button"
		aria-label="Search for products"
		className="relative"
		onClick={() => setSearchOpen(true)}
	>
		<MagnifierIcon />
	</button>
);

const LoginIcon = ({
	setLoginModalOpen,
}: {
	setLoginModalOpen: (open: boolean) => void;
}) => (
	<button
		type="button"
		aria-label="Search for products"
		className="relative"
		onClick={() => setLoginModalOpen(true)}
	>
		<UserIcon />
	</button>
);

const menuIcons = (
	cartItems: number,
	setSearchOpen: (open: boolean) => void,
	setLoginModalOpen: (open: boolean) => void,
	setCartOpen: (open: boolean) => void,
): NavIcon[] => [
	{
		title: "Magnifier",
		icon: <SearchIcon setSearchOpen={setSearchOpen} />,
	},
	{
		title: "User",
		icon: <LoginIcon setLoginModalOpen={setLoginModalOpen} />,
	},
	{
		title: "Heart",
		icon: <HeartIcon />,
		url: "/wishlist",
	},
	{
		title: "Cart",
		icon: <CartIcon cartItems={cartItems} setCartOpen={setCartOpen} />,
	},
];

const AdminUserIcon = ({
	dropdownOpen,
	handleDropdown,
}: {
	dropdownOpen: boolean;
	handleDropdown: () => void;
}) => (
	<div className="relative">
		<button
			type="button"
			aria-label="Toggle user menu"
			className="relative"
			onClick={() => handleDropdown()}
		>
			<UserIcon />
		</button>
		<AnimatePresence>
			{dropdownOpen && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.2 }}
					className="absolute right-0 mt-2 py-2 w-48 bg-white shadow-xl z-20 border border-gray-200"
				>
					<ul className="uppercase tracking-widest">
						<Link href="/admin/settings">
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
								Settings
							</motion.li>
						</Link>
						<Link href="/admin/profile">
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
								Profile
							</motion.li>
						</Link>
						<Link href="/logout">
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
								Logout
							</motion.li>
						</Link>
					</ul>
				</motion.div>
			)}
		</AnimatePresence>
	</div>
);

const adminIcons = (
	dropdownOpen: boolean,
	handleDropdown: () => void,
): NavIcon[] => [
	{
		title: "User",
		icon: (
			<AdminUserIcon
				dropdownOpen={dropdownOpen}
				handleDropdown={handleDropdown}
			/>
		),
	},
];

interface NavIconsProps extends DesktopNavProps {
	icons: NavIcon[];
	mobile?: boolean;
}

const NavIcons: FC<NavIconsProps> = ({
	selected,
	setSelected,

	icons,
	mobile,
}) => {
	return (
		<LayoutGroup id="nav-icons">
			{icons.map((icon: NavIcon, index: number): JSX.Element | null => {
				if (mobile && (icon.title === "Heart" || icon.title === "User"))
					return null;

				return (
					<motion.div
						key={icon.title}
						whileHover={{ color: colors.secondary }}
						whileTap={{ color: colors.secondary }}
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
									className="absolute left-0 bottom-0 h-0.5 bg-secondary"
									data-testid={`${icon.title}Underline`}
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
					</motion.div>
				);
			})}
		</LayoutGroup>
	);
};

export { menuIcons, adminIcons, NavIcons };
