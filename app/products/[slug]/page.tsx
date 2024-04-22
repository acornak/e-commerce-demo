import React from "react";
// Types and constants
import { Product, getAllProducts } from "@/lib/models/product";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	const products = getAllProducts();

	return products.map((product: Product) => ({
		slug: product.slug,
	}));
}

const ProductPage = async ({
	params,
}: {
	params: { slug: string };
}): Promise<JSX.Element> => {
	const products = getAllProducts();

	const product = products.find((p) => p.slug === params.slug);
	if (!product) {
		return <div>Product not found</div>;
	}

	return <div>{product.name}</div>;
};

export default ProductPage;
