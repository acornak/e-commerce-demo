export type Color = {
	[key: string]: string;
};

export type NavItem = {
	title: string;
	url: string;
};

export type NavIcon = {
	title: string;
	icon: JSX.Element;
	url?: string;
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
