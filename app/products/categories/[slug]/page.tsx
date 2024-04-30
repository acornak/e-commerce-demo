import React from "react";
// Next
import Link from "next/link";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import StyledHero from "@/components/hero/StyledHero";
import NewsletterBanner from "@/components/common/Newsletter";
// Types and constants
import { Category, getAllCategories } from "@/lib/models/category";
// Images
import aboutHero from "@/public/about/about_hero.webp";
import StyledCategoryHero from "@/components/hero/StyledCategoryHero";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	const categories = getAllCategories();

	return categories.map((category: Category) => ({
		slug: category.slug,
	}));
}

const CategoryPage = async ({
	params,
}: {
	params: { slug: string };
}): Promise<JSX.Element> => {
	const categories = getAllCategories();

	const category = categories.find((c) => c.slug === params.slug);
	if (!category) {
		return (
			<>
				<StyledHero
					image={aboutHero}
					link={params.slug}
					title={params.slug}
					h="h-60"
					product
					category
				/>
				<div className="mt-6">
					<StyledSectionHeading title="Category not found" />
				</div>
				<p className="mt-2 text-center mb-10">
					The category you are looking for does not exist.
					<br />
					If you want to go to categories page, click{" "}
					<Link href="/products/categories" className="underline">
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
			<StyledCategoryHero
				categoryId={category.id}
				link={params.slug}
				title={category.name}
				h="h-[65vh]"
			/>
			<div className="mt-6">
				<StyledSectionHeading title={category.name} />
			</div>

			<NewsletterBanner />
		</>
	);
};

export default CategoryPage;
