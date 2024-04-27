import React from "react";
// Next
import { NextPage } from "next";
// Components
import HomepageHero from "@/components/hero/HomepageHero";
import Collection from "@/components/homepage/Collection";
import Explore from "@/components/product/Explore";
import TopProducts from "@/components/product/TopProducts";
import HomepageNewsletter from "@/components/homepage/Newsletter";
import Social from "@/components/footer/Social";

const Home: NextPage = (): JSX.Element => {
	return (
		<>
			<HomepageHero />
			<Collection />
			<Explore />
			<TopProducts />
			<HomepageNewsletter />
			<Social />
		</>
	);
};

export default Home;
