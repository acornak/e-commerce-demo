import { Product } from "../models/product";

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
