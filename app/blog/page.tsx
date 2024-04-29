import React from "react";
// Next
import { NextPage } from "next";
// Components
import StyledHero from "@/components/hero/StyledHero";
import NewsletterBanner from "@/components/common/Newsletter";
// Images
import blogHero from "@/public/blog/blog_hero.webp";

const BlogPage: NextPage = (): JSX.Element => {
	return (
		<>
			<StyledHero image={blogHero} link="blog" title="Blog" h="h-96" />
			<NewsletterBanner />
		</>
	);
};

export default BlogPage;
