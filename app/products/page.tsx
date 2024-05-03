import React from "react";
// Next
import { NextPage } from "next";
// Components
import StyledHero from "@/components/hero/StyledHero";
import NewsletterBanner from "@/components/common/Newsletter";
import ProductGrid from "@/components/product/ProductGrid";
import ProductsFilter from "@/components/product/ProductsFilter";
// Images
import productsHero from "@/public/products/products_hero.webp";

// https://pertic-store-demo.myshopify.com/collections/all
const ProductsPage: NextPage = (): JSX.Element => {
	return (
		<>
			<StyledHero image={productsHero} link="products" title="Products" />
			<div className="flex flex-col lg:flex-row">
				<div className="lg:w-1/4 w-full">
					<ProductsFilter />
				</div>
				<div className="lg:w-3/4 w-full">
					<ProductGrid />
				</div>
			</div>

			<NewsletterBanner />
		</>
	);
};

export default ProductsPage;
