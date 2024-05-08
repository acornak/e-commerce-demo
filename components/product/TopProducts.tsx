"use client";

import React, { useEffect, useState } from "react";
// Types and constants
import { Product } from "@/lib/config/types";
// Functions
import { fetchProductsByCategory } from "@/lib/functions/product-fetcher";
// Components
import ProductPreview from "./ProductPreview";
import { StyledSectionHeading } from "../styled/Heading";

const TopProducts = (): JSX.Element => {
	const [topProducts, setTopProducts] = useState<Product[]>([]);
	useEffect((): void => {
		fetchProductsByCategory(1, setTopProducts, 12);
	}, []);

	return (
		<div className="flex justify-center items-center text-center mt-6">
			<div>
				<StyledSectionHeading title="Pick your Winner" />
				<div className="container mx-auto">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4">
						{topProducts.map(
							(product: Product): JSX.Element => (
								<ProductPreview
									key={product.id + Math.random() * 6547}
									product={product}
								/>
							),
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopProducts;
