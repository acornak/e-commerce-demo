// Types and constants
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
		}${brandId ? `&brandId=${brandId}` : ""}
		${limit ? `&limit=${limit}` : ""}`,
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

export const fetchAllProducts = (
	setProducts: (products: Product[]) => void,
	limit: number = 10000,
) => {
	fetch(`/api/products?limit=${limit}`)
		.then((response) => response.json())
		.then((data) => setProducts(data.products))
		.catch((error) => console.error("Fetching products failed:", error));
};

export const fetchProductImage = (
	productId: number,
	setImageUrl: (url: string) => void,
	setProductImageModalUrl?: (url: string) => void,
) => {
	fetch(`/api/products/image?productId=${productId}`)
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

export const fetchProductsByCategory = (
	categoryId: number,
	setProducts: (products: Product[]) => void,
	limit?: number,
) => {
	fetch(`/api/products?categoryId=${categoryId}${limit && `&limit=${limit}`}`)
		.then((response) => response.json())
		.then((data) => setProducts(data.products))
		.catch((error) => console.error("Fetching products failed:", error));
};

export const fetchProductsByTag = (
	tags: string[],
	setProducts: (products: Product[]) => void,
	limit?: number,
) => {
	const queryParams = tags
		.map((tag) => `tags=${encodeURIComponent(tag)}`)
		.join("&");

	fetch(`/api/products?${queryParams}${limit && `&limit=${limit}`}`)
		.then((response) => response.json())
		.then((data) => setProducts(data.products))
		.catch((error) => console.error("Fetching products failed:", error));
};
