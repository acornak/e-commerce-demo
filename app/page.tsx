import React from "react";
// Components
import HomepageHero from "@/components/hero/HomepageHero";
import Collection from "@/components/homepage/Collection";
import TopProducts from "@/components/products/TopProducts";
import Social from "@/components/footer/Social";
import Newsletter from "@/components/homepage/Newsletter";

export default function Home(): JSX.Element {
	return (
		<>
			<HomepageHero />
			<Collection />
			<TopProducts />
			<Newsletter />
			<Social />
		</>
	);
}
