"use client";

import React, { useEffect, useState } from "react";
// Types and constants
import { Product } from "@/lib/models/Product";
// Components
import ProductPreview from "./ProductPreview";
import { StyledSectionHeading } from "../styled/Heading";

const TopProducts = (): JSX.Element => {
	const [topProducts, setTopProducts] = useState<Product[]>([]);
	// const [bestSellers, setBestSellers] = useState<Product[]>([]);
	// const [topRates, setTopRates] = useState<Product[]>([]);

	useEffect((): void => {
		fetch("/api/products?category=top&limit=12")
			.then((response) => response.json())
			.then((data) => setTopProducts(data.products));

		// fetch("/api/products?category=best-sellers&limit=12")
		// 	.then((response) => response.json())
		// 	.then((data) => setBestSellers(data.products));

		// fetch("/api/products?category=top-rates&limit=12")
		// 	.then((response) => response.json())
		// 	.then((data) => setTopRates(data.products));
	}, []);

	useEffect(() => {
		console.log(topProducts);
		// console.log(bestSellers);
		// console.log(topRates);
	}, [topProducts]);

	return (
		<>
			<div className="flex justify-center items-center text-center mt-6">
				<div>
					<StyledSectionHeading title="Top Products" />
					<div className="container mx-auto">
						<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
							{topProducts.map(
								(product: Product): JSX.Element => (
									<ProductPreview
										key={product.id}
										product={product}
									/>
								),
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TopProducts;
