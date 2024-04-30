import { Product } from "@/lib/models/product";
import React, { FC } from "react";

type ProductPageReviewsProps = {
	product: Product;
};

const ProductPageReviews: FC<ProductPageReviewsProps> = ({
	product,
}): JSX.Element => {
	if (!product.reviews) {
		return (
			<div className="text-center">
				<h1 className="text-lg font-semibold tracking-widest my-20">
					No reviews yet
				</h1>
			</div>
		);
	}

	// TODO
	return (
		<div className="text-center">
			<h1 className="text-lg font-semibold tracking-widest my-20">
				No reviews yet
			</h1>
		</div>
	);
};

export default ProductPageReviews;
