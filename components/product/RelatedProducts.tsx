import React, { FC, useEffect, useState } from "react";
// Functions
import { fetchProductsByTag } from "@/lib/functions/product-fetcher";
// Types and constants
import { Product } from "@/lib/config/types";
import ProductPreview from "./ProductPreview";

type RelatedProductsProps = {
	tags: string[];
};

const RelatedProducts: FC<RelatedProductsProps> = ({ tags }): JSX.Element => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedProducts = await fetchProductsByTag(tags);
				setProducts(fetchedProducts);
			} catch (error) {
				console.error("Fetching related products failed:", error);
			}
		};

		fetchData();
	}, [tags]);

	return (
		<div className="container mx-auto mb-10">
			<div className="grid grid-cols-2 lg:grid-cols-4">
				{products.map((product) => (
					<ProductPreview
						key={product.id + Math.random() * 4567}
						product={product}
					/>
				))}
			</div>
		</div>
	);
};

export default RelatedProducts;
