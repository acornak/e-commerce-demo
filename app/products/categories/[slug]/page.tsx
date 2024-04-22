import React from "react";
// Types and constants
import { Category, getAllCategories } from "@/lib/models/category";

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
		return <div>Category not found</div>;
	}

	return <div>{category.name}</div>;
};

export default CategoryPage;
