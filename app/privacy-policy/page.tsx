import React from "react";
// Next
import { NextPage } from "next";
// Components
import PrivacyHero from "@/components/hero/PrivacyHero";
import { StyledSectionHeading } from "@/components/styled/Heading";

const PrivacyPolicy: NextPage = (): JSX.Element => {
	return (
		<>
			<PrivacyHero />
			<div className="text-center mt-6">
				<StyledSectionHeading title="Terms and Conditions" />
				<h2 className="mt-4">
					Last updated:{" "}
					<time dateTime="2024-04-20">April 20, 2024</time>
				</h2>
			</div>
		</>
	);
};

export default PrivacyPolicy;
