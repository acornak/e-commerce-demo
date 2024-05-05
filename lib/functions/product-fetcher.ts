// Types and constants
import { SortOption } from "../config/types";
import { Product } from "../models/product";

export const fetchProductById = async (
	productId: number,
	setProduct: (product: Product) => void,
) => {
	await fetch(`/api/products?productId=${productId}`)
		.then((response) => response.json())
		.then((data) => setProduct(data.product))
		.catch((error) =>
			console.error("Fetching product by id failed:", error),
		);
};

export const fetchProductsPaginated = async (
	setProducts: (products: Product[]) => void,
	setTotalPages: (totalPages: number) => void,
	page: number,
	categoryId: number | null,
	brandId: number | null,
	sizes: number[] | null,
	priceRange: [number, number] | null,
	sort: SortOption | null,
	setLoading?: (loading: boolean) => void,
	limit: number = 10000,
) => {
	if (setLoading) {
		setLoading(true);
	}
	setProducts([]);
	await fetch(
		`/api/products?&page=${page}${
			categoryId ? `&categoryId=${categoryId}` : ""
		}${brandId ? `&brandId=${brandId}` : ""}${
			sizes ? `&sizeIds=${encodeURIComponent(sizes.join(","))}` : ""
		}${priceRange ? `&priceRange=${priceRange[0]}-${priceRange[1]}` : ""}${
			sort ? `&sortBy=${sort.value}` : ""
		}&limit=${limit}`,
	)
		.then((response) => response.json())
		.then((data) => {
			setProducts(data.products);
			setTotalPages(data.totalPages);
			if (setLoading) {
				setLoading(false);
			}
		})
		.catch((error) => console.error("Fetching products failed:", error));
};

export const fetchAllProducts = async (
	setProducts: (products: Product[]) => void,
	limit: number = 10000,
) => {
	await fetch(`/api/products?limit=${limit}`)
		.then((response) => response.json())
		.then((data) => setProducts(data.products))
		.catch((error) => console.error("Fetching products failed:", error));
};

export const fetchProductImage = async (
	productId: number,
	setImageUrl: (url: string) => void,
	setProductImageModalUrl?: (url: string) => void,
) => {
	await fetch(`/api/products/image?productId=${productId}`)
		.then((response) => response.blob())
		.then((blob) => {
			const url = URL.createObjectURL(blob);
			setImageUrl(url);
			if (setProductImageModalUrl) {
				setProductImageModalUrl(url);
			}
			return () => URL.revokeObjectURL(url);
		})
		.catch((error) => console.error("Fetching image failed:", error));
};

export const fetchProductsByCategory = async (
	categoryId: number,
	setProducts: (products: Product[]) => void,
	limit?: number,
) => {
	await fetch(
		`/api/products?categoryId=${categoryId}${limit && `&limit=${limit}`}`,
	)
		.then((response) => response.json())
		.then((data) => setProducts(data.products))
		.catch((error) =>
			console.error("Fetching products by category failed:", error),
		);
};

export const fetchProductsByTag = async (
	tags: string[],
	setProducts: (products: Product[]) => void,
	limit?: number,
) => {
	const queryParams = tags
		.map((tag) => `tags=${encodeURIComponent(tag)}`)
		.join("&");

	await fetch(`/api/products?${queryParams}${limit && `&limit=${limit}`}`)
		.then((response) => response.json())
		.then((data) => setProducts(data.products))
		.catch((error) =>
			console.error("Fetching products by tag failed:", error),
		);
};

export const fetchProductsMaxPrice = async (
	setMaxPrice: (maxPrice: number) => void,
	setPriceRange?: (priceRange: [number, number]) => void,
	setMax?: (max: number) => void,
) => {
	await fetch(`/api/products/max-price`)
		.then((response) => response.json())
		.then((data) => {
			setMaxPrice(data.maxPrice);
			if (setPriceRange) setPriceRange([0, data.maxPrice]);
			if (setMax) setMax(data.maxPrice);
		})
		.catch((error) => console.error("Fetching max price failed:", error));
};
