import React from "react";
// Icons
import { NavIcon, NavItem } from "@/config/types";
import BagIcon from "../icons/Bag";
import MagnifierIcon from "../icons/Magnifier";
import UserIcon from "../icons/User";
import HeartIcon from "../icons/Heart";

const NavItems: NavItem[] = [
	{
		title: "Home",
		url: "/",
	},
	{
		title: "Shop",
		url: "/shop",
	},
	{
		title: "Features",
		url: "/features",
	},
	{
		title: "Pages",
		url: "/pages",
	},
	{
		title: "Blog",
		url: "/blog",
	},
];

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

const icons = (
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

export { NavItems, icons };
