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
	slug?: string;
	price: number;
	previousPrice?: number;
	brand: string;
	description: string;
	categories: string[];
	rating: number;
	countInStock?: number;
	variants?: Variant[];
	reviews?: string[];
	tags: string[];
};
