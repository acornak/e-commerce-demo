export type Product = {
	id: number;
	name: string;
	slug?: string;
	image: string;
	banner: string;
	price: number;
	previousPrice?: number;
	brand: string;
	description: string;
	category: string[];
	rating: number;
	countInStock: number;
	variants: string[];
	reviews: string[];
	features: string[];
	tags: string[];
	createdAt: string;
};
