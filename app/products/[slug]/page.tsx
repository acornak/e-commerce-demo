import React from "react";
// Next
import Link from "next/link";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import StyledHero from "@/components/hero/StyledHero";
import NewsletterBanner from "@/components/common/Newsletter";
import ProductPageOverview from "@/components/product/ProductPageOverview";
// Types and constants
import { getAllProducts } from "@/lib/models/product";
import { Product } from "@/lib/config/types";
// Images
import aboutHero from "@/public/about/about_hero.webp";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	const products = getAllProducts();

	return products.map((product: Product) => ({
		slug: product.slug,
	}));
}

const ProductPage = async ({
	params,
}: {
	params: { slug: string };
}): Promise<JSX.Element> => {
	const products = getAllProducts();

	const product = products.find((p) => p.slug === params.slug);
	if (!product) {
		return (
			<>
				<StyledHero
					image={aboutHero}
					link={params.slug}
					title={params.slug}
					h="h-48"
					product
				/>
				<div className="mt-6">
					<StyledSectionHeading title="Product not found" />
				</div>
				<p
					className="mt-2 text-center mb-10"
					data-testid="product-not-found"
				>
					The product you are looking for does not exist.
					<br />
					If you want to go to products page, click{" "}
					<Link href="/products" className="underline">
						here
					</Link>
					.
				</p>
				<NewsletterBanner />
			</>
		);
	}

	return (
		<>
			<ProductPageOverview productId={product.id} />
			<NewsletterBanner />
		</>
	);
};

export default ProductPage;
