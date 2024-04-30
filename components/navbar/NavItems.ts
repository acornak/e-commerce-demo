// Types and constants
import { NavItem } from "@/lib/config/types";

const NavItemsMobile: NavItem[] = [
	{
		title: "Home",
		url: "/",
	},
	{
		title: "Products",
		url: "/products",
	},
	{
		title: "Wishlist",
		url: "/wishlist",
	},
	{
		title: "About Us",
		url: "/about",
	},
	{
		title: "Contact",
		url: "/contact",
	},
	{
		title: "Blog",
		url: "/blog",
	},
	{
		title: "Your Account",
		url: "/account",
	},
];

const NavItemsDesktop: NavItem[] = [
	{
		title: "Home",
		url: "/",
	},
	{
		title: "Products",
		url: "/products",
	},
	{
		title: "About Us",
		url: "/about",
	},
	{
		title: "Contact",
		url: "/contact",
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

export { NavItemsMobile, NavItemsDesktop, NavItemsAdmin };
