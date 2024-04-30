import { Product } from "@/lib/models/product";
import React, { FC } from "react";
import { StyledSectionHeading } from "../styled/Heading";

type ProductPageReviewsProps = {
	product: Product;
};

const ProductPageReviews: FC<ProductPageReviewsProps> = ({
	product,
}): JSX.Element => {
	if (!product.reviews) {
		return (
			<div className="text-center">
				<StyledSectionHeading title="No reviews yet" />
			</div>
		);
	}

	// TODO
	return (
		<div className="text-center">
			<StyledSectionHeading title="No reviews yet" />
		</div>
	);
};

export default ProductPageReviews;
