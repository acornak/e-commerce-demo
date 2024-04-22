// Types and constants
import { Product } from "../models/product";

export const fetchProduct = (
	productId: number,
	setProduct: (product: Product) => void,
) => {
	fetch(`/api/products?id=${productId}`)
		.then((response) => response.json())
		.then((data) => setProduct(data.product))
		.catch((error) => console.error("Fetching product failed:", error));
};

export const fetchProductImage = (
	productId: number,
	setImageUrl: (url: string) => void,
) => {
	fetch(`/api/products/image?productId=${productId}`)
		.then((response) => response.blob())
		.then((blob) => {
			const url = URL.createObjectURL(blob);
			setImageUrl(url);
			return () => URL.revokeObjectURL(url);
		})
		.catch((error) => console.error("Fetching image failed:", error));
};

export const fetchProductByCategory = (
	category: string,
	setProducts: (products: Product[]) => void,
	limit?: number,
) => {
	fetch(`/api/products?category=${category}${limit && `&limit=${limit}`}`)
		.then((response) => response.json())
		.then((data) => setProducts(data.products))
		.catch((error) => console.error("Fetching products failed:", error));
};
