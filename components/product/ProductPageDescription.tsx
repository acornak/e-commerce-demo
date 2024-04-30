import { Product } from "@/lib/models/product";
import React, { FC } from "react";

type ProductPageDescriptionProps = {
	product: Product;
};

const ProductPageDescription: FC<ProductPageDescriptionProps> = ({
	product,
}): JSX.Element => {
	return (
		<div className="flex items-center justify-center text-center">
			<div className="flex w-2/3">
				<h1>{product.perex}</h1>
			</div>
		</div>
	);
};

export default ProductPageDescription;
