"use client";

import React, { useEffect, useState } from "react";
// Types
import { Product } from "@/lib/models/Product";

const TopProducts = (): JSX.Element => {
	const [topProducts, setTopProducts] = useState<Product[]>([]);
	const [bestSellers, setBestSellers] = useState<Product[]>([]);
	const [topRates, setTopRates] = useState<Product[]>([]);

	useEffect((): void => {
		fetch("/api/products?category=top&limit=12")
			.then((response) => response.json())
			.then((data) => setTopProducts(data.products));

		fetch("/api/products?category=best-sellers&limit=12")
			.then((response) => response.json())
			.then((data) => setBestSellers(data.products));

		fetch("/api/products?category=top-rates&limit=12")
			.then((response) => response.json())
			.then((data) => setTopRates(data.products));
	}, []);

	useEffect(() => {
		console.log(topProducts);
		console.log(bestSellers);
		console.log(topRates);
	}, [topProducts, bestSellers, topRates]);

	return (
		<div className="flex justify-center items-center">
			<div className="text-3xl uppercase tracking-widest pt-6">
				Pick your winner
				<div className="w-2/3 bg-orange-500 h-1 mx-auto mt-2" />
			</div>
		</div>
	);
};

export default TopProducts;
