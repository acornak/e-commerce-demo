import React from "react";
// Next
import { NextPage } from "next";
// Components
import PrivacyHero from "@/components/hero/PrivacyHero";

const PrivacyPolicy: NextPage = (): JSX.Element => {
	return (
		<>
			<PrivacyHero />
			<div className="text-center mt-6">
				<div className="text-3xl uppercase tracking-widest pt-6">
					Privacy Policy
					<div className="w-1/6 bg-orange-500 h-1 mx-auto mt-2" />
				</div>
				<h2 className="mt-4">
					Last updated:{" "}
					<time dateTime="2024-04-20">April 20, 2024</time>
				</h2>
			</div>
		</>
	);
};

export default PrivacyPolicy;
