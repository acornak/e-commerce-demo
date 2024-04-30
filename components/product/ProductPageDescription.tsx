import { Product } from "@/lib/models/product";
import React, { FC } from "react";

type ProductPageDescriptionProps = {
	product: Product;
};

const ProductPageDescription: FC<ProductPageDescriptionProps> = ({
	product,
}): JSX.Element => {
	return (
		<div>
			<h1>{product.description}</h1>
		</div>
	);
};

export default ProductPageDescription;
