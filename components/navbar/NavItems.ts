// Types and constants
import { NavItem } from "@/lib/config/types";

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

const NavItemsAdmin: NavItem[] = [
	{
		title: "Dashboard",
		url: "/admin",
	},
	{
		title: "Products",
		url: "/admin/products",
	},
	{
		title: "Orders",
		url: "/admin/orders",
	},
	{
		title: "Customers",
		url: "/admin/customers",
	},
	{
		title: "Shop",
		url: "/",
	},
];

export { NavItems, NavItemsAdmin };
