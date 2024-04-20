import React from "react";
// Icons
import { NavIcon, NavItem } from "@/config/types";
import BagIcon from "../icons/Bag";
import MagnifierIcon from "../icons/Magnifier";
import UserIcon from "../icons/User";
import HeartIcon from "../icons/Heart";
// Types

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

const CartIcon = ({ cartItems }: { cartItems: number }) => (
	<div className="relative">
		<BagIcon />
		<div
			className="absolute -top-2 -right-2 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
			style={{ backgroundColor: "#FF6347" }}
		>
			{cartItems}
		</div>
	</div>
);

const SearchIcon = ({
	setIsSearchOpen,
}: {
	setIsSearchOpen: (open: boolean) => void;
}) => (
	<button
		type="button"
		aria-label="Search for products"
		className="relative"
		onClick={() => setIsSearchOpen(true)}
	>
		<MagnifierIcon />
	</button>
);

const icons = (
	cartItems: number,
	setIsSearchOpen: (open: boolean) => void,
): NavIcon[] => [
	{
		title: "Magnifier",
		icon: <SearchIcon setIsSearchOpen={setIsSearchOpen} />,
	},
	{
		title: "User",
		icon: <UserIcon />,
		url: "/user",
	},
	{
		title: "Heart",
		icon: <HeartIcon />,
		url: "/wishlist",
	},
	{
		title: "Cart",
		icon: <CartIcon cartItems={cartItems} />,
		url: "/cart",
	},
];

export { NavItems, icons };
