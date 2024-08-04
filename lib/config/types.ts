import { ReactNode } from "react";

export type Variant = {
	id: number;
	name: string;
	image: string;
	price: number;
	previousPrice?: number;
	countInStock: number;
};

export type Product = {
	id: number;
	name: string;
	slug: string;
	price: number;
	previousPrice?: number;
	previewImage?: string;
	images?: string[];
	brandId: number;
	perex: string;
	sizeIds: number[];
	categories: number[];
	rating?: number;
	countInStock?: number;
	variants?: Variant[];
	reviews?: string[];
	tags: string[];
	specialOffer?: boolean;
	description?: string;
};

export type Color = {
	[key: string]: string;
};

export type NavItem = {
	title: string;
	url: string;
	children?: NavItem[];
};

export type NavIcon = {
	title: string;
	icon: JSX.Element;
	url?: string;
	onClick?: () => void;
};

export type ChevronProps = {
	size?: string;
};

export type DesktopNavProps = {
	selected: null | number;
	setSelected: (index: number | null) => void;
	items?: NavItem[];
};

export type IconProps = {
	className?: string;
	fill?: string;
};

export type FaqQuestion = {
	question: string;
	answer: string;
};

export type SortOption = {
	label: string;
	value: string;
	sortFunc: (products: Product[]) => Product[];
};

export type CartItem = {
	productId: number;
	sizeId: number;
	price: number;
	quantity: number;
};

export type Address = {
	street: string;
	city: string;
	state?: string;
	zipCode: string;
	country: string;
};

export type Order = {
	id: string;
	email: string;
	items: CartItem[];
	status: "pending" | "processing" | "completed" | "cancelled";
	paid: boolean;
	address?: Address;
	createdAt?: Date;
	updatedAt?: Date;
};

export type WishlistItem = {
	productId: number;
};

export type Brand = {
	id: number;
	name: string;
	slug: string;
	image?: string;
};

export type Category = {
	id: number;
	name: string;
	slug: string;
	image?: string;
};

export type Size = {
	id: number;
	name: string;
};

export type User = {
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	address?: Address;
	cartItems?: CartItem[];
	wishlistItems?: WishlistItem[];
	createdAt?: Date;
	updatedAt?: Date;
};

export type FormProps = {
	setShowRegister: (show: boolean) => void;
};

export type ButtonProps = {
	children: ReactNode;
	onClick?: () => void;
};
