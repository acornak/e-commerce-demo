import React from "react";
// Next
import { NextPage } from "next";
// Components
import StyledHero from "@/components/hero/StyledHero";
import { StyledSectionHeading } from "@/components/styled/Heading";
import NewsletterBanner from "@/components/common/Newsletter";
// Images
import privacyImage from "@/public/misc/privacy.webp";

const PrivacyPolicyPage: NextPage = (): JSX.Element => {
	return (
		<>
			<StyledHero
				image={privacyImage}
				link="privacy-policy"
				title="Privacy Policy"
			/>
			<div className="text-center my-6">
				<StyledSectionHeading title="Terms and Conditions" />
				<h2 className="mt-4">
					Last updated:{" "}
					<time dateTime="2024-04-20">April 20, 2024</time>
				</h2>
			</div>
			<NewsletterBanner />
		</>
	);
};

export default PrivacyPolicyPage;
