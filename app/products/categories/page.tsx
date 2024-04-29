import React from "react";
// Next
import { NextPage } from "next";
// Components
import StyledHero from "@/components/hero/StyledHero";
import NewsletterBanner from "@/components/common/Newsletter";
// Images
import productsHero from "@/public/products/products_hero.webp";

// https://pertic-store-demo.myshopify.com/collections/all
const CategoriesPage: NextPage = (): JSX.Element => {
	return (
		<>
			<StyledHero
				image={productsHero}
				link="categories"
				title="Categories"
				h="h-96"
				product
			/>
			<NewsletterBanner />
		</>
	);
};

export default CategoriesPage;
