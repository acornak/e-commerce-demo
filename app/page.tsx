import React from "react";
// Components
import HomepageHero from "@/components/hero/HomepageHero";
import Collection from "@/components/homepage/Collection";
import Explore from "@/components/products/Explore";
import TopProducts from "@/components/products/TopProducts";
import Newsletter from "@/components/homepage/Newsletter";
import Social from "@/components/footer/Social";

export default function Home(): JSX.Element {
	return (
		<>
			<HomepageHero />
			<Collection />
			<Explore />
			<TopProducts />
			<Newsletter />
			<Social />
		</>
	);
}
