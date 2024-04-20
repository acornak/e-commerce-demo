import React from "react";
// Components
import HomepageHero from "@/components/hero/HomepageHero";
import Collection from "@/components/collection/Collection";

export default function Home(): JSX.Element {
	return (
		<>
			<HomepageHero />
			<Collection />
		</>
	);
}
