// Types and constants
import { Product } from "../models/product";

export const fetchProduct = (
	productId: number,
	setProduct: (product: Product) => void,
) => {
	fetch(`/api/products?productId=${productId}`)
		.then((response) => response.json())
		.then((data) => setProduct(data.product))
		.catch((error) => console.error("Fetching product failed:", error));
};

export const fetchAllProductsPaginated = (
	setProducts: (products: Product[]) => void,
	setTotalPages: (totalPages: number) => void,
	page: number,
	limit: number = 10000,
) => {
	setProducts([]);
	fetch(`/api/products?&page=${page}${limit && `&limit=${limit}`}`)
		.then((response) => response.json())
		.then((data) => {
			setProducts(data.products);
			setTotalPages(data.totalPages);
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
