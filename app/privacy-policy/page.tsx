import React from "react";
// Components
import PrivacyHero from "@/components/hero/PrivacyHero";

export default function PrivacyPolicy(): JSX.Element {
	return (
		<>
			<PrivacyHero />
			<div className="text-center mt-6">
				<h1 className="text-3xl uppercase font-semibold tracking-widest">
					Privacy Policy
				</h1>
				<h2 className="mt-4">
					Last updated:{" "}
					<time dateTime="2024-04-20">April 20, 2024</time>
				</h2>
			</div>
		</>
	);
}
