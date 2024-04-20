import React from "react";
// Components
import HomepageHero from "@/components/hero/HomepageHero";
import Collection from "@/components/collection/Collection";
import TopProducts from "@/components/products/TopProducts";
import Social from "@/components/footer/Social";

export default function Home(): JSX.Element {
	return (
		<>
			<HomepageHero />
			<Collection />
			<TopProducts />

			<Social />
		</>
	);
}
