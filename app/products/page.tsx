import React, { Suspense } from "react";
// Next
import { NextPage } from "next";
// Components
import StyledHero from "@/components/hero/StyledHero";
import NewsletterBanner from "@/components/common/Newsletter";
import AllProducts from "@/components/product/AllProducts";
import ProductsFilter from "@/components/product/ProductsFilter";
import StyledLoading from "@/components/styled/Loading";
// Images
import productsHero from "@/public/products/products_hero.webp";

// https://pertic-store-demo.myshopify.com/collections/all
const ProductsPage: NextPage = (): JSX.Element => {
	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center h-screen">
					<StyledLoading />
				</div>
			}
		>
			<StyledHero image={productsHero} link="products" title="Products" />
			<div className="flex flex-col lg:flex-row">
				<div className="lg:w-1/4 w-full">
					<ProductsFilter />
				</div>
				<div className="lg:w-3/4 w-full">
					<AllProducts />
				</div>
			</div>

			<NewsletterBanner />
		</Suspense>
	);
};

export default ProductsPage;
