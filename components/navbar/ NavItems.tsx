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
	{
		title: "Portfolio",
		url: "/portfolio",
	},
];

const Icons: NavIcon[] = [
	{
		title: "Magnifier",
		icon: <MagnifierIcon />,
		url: "/search",
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
		title: "Bag",
		icon: <BagIcon />,
		url: "/bag",
	},
];

export { NavItems, Icons };
