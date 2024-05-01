import React, { FC, useEffect, useState } from "react";
// Functions
import { fetchProductsByTag } from "@/lib/functions/product-fetcher";
// Types and constants
import { Product } from "@/lib/models/product";
import ProductPreview from "./ProductPreview";

type RelatedProductsProps = {
	tags: string[];
};

const RelatedProduct: FC<RelatedProductsProps> = ({ tags }): JSX.Element => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetchProductsByTag(tags, setProducts, 4);
	}, [tags]);

	return (
		<div className="container mx-auto mb-10">
			<div className="grid grid-cols-2 lg:grid-cols-4">
				{products.map((product) => (
					<ProductPreview key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default RelatedProduct;
