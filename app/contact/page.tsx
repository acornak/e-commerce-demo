"use client";

import React, { useEffect, useState } from "react";
// Next
import { NextPage } from "next";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Map
import GoogleMapReact from "google-map-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// Components
import NewsletterBanner from "@/components/common/Newsletter";
import StyledHero from "@/components/hero/StyledHero";
import ContactForm from "@/components/common/ContactForm";
import { StyledSectionHeading } from "@/components/styled/Heading";
// Image
import contactHero from "@/public/contact/contact_hero.webp";
// Functions
import verifyCaptcha from "@/lib/functions/verify-captcha";
// Icons
import { InstagramIconFilled } from "@/components/icon/Instagram";
import LinkedInIcon from "@/components/icon/LinkedIn";
import FacebookIcon from "@/components/icon/Facebook";
// Types and constants
import { colors, location } from "@/lib/config/constants";

const ContactInfo = (): JSX.Element => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [verified, setVerified] = useState<boolean>(false);

	useEffect(() => {
		const verify = async () => {
			if (executeRecaptcha) {
				const token = await executeRecaptcha("google_map");
				verifyCaptcha(token, setVerified);
			}
		};
		verify();
	});

	return (
		<>
			<div className="flex flex-col items-center justify-center space-y-4 text-center md:m-4 md:mt-10 lg:m-10">
				<div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 lg:w-4/5">
					<div className="p-10 lg:p-20 text-start">
						<h2 className="text-sm font-semibold uppercase tracking-2xl">
							Contact Information
						</h2>
						<div
							className="max-w-60 bg-orange-500 mt-2"
							style={{ height: "2px" }}
						/>
						<p className="text-sm text-gray-700 pt-10 text-justify">
							We do not sell product from our corporate
							headquarters in New York City. If you want to visit,
							please reach out to our customer service team first.
						</p>
						<p className="text-sm text-gray-700 pt-6 pb-12 text-justify">
							1201 Broadway Suite 600
						</p>
						<a
							href="mailto:help@glassify.com"
							className="text-2xl font-semibold underline"
						>
							help@glassify.com
						</a>
						<h2 className="text-sm font-semibold pt-10 uppercase tracking-2xl">
							Follow us
						</h2>
						<div
							className="max-w-60 bg-orange-500 mt-2"
							style={{ height: "2px" }}
						/>
						<div className="pt-4 flex flex-row gap-4 items-center justify-start text-gray-600">
							<Link
								href="https://www.facebook.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<motion.p
									whileHover={{
										scale: 1.1,
										color: colors.secondary,
									}}
								>
									<FacebookIcon />
								</motion.p>
							</Link>
							<Link
								href="https://www.instagram.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<motion.p
									whileHover={{
										scale: 1.1,
										color: colors.secondary,
									}}
								>
									<InstagramIconFilled />
								</motion.p>
							</Link>
							<Link
								href="https://www.linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<motion.p
									whileHover={{
										scale: 1.1,
										color: colors.secondary,
									}}
								>
									<LinkedInIcon />
								</motion.p>
							</Link>
						</div>
					</div>
					<div
						className="w-full h-64 md:h-auto"
						style={{ width: "100%", height: "100%" }}
					>
						{verified && (
							<GoogleMapReact
								bootstrapURLKeys={{
									key:
										process.env
											.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
										"",
								}}
								defaultCenter={{
									lat: location.lat,
									lng: location.lng,
								}}
								defaultZoom={11}
								yesIWantToUseGoogleMapApiInternals
							/>
						)}
					</div>
				</div>
			</div>
			<div className="md:hidden" style={{ width: "100%", height: "50%" }}>
				{verified && (
					<GoogleMapReact
						bootstrapURLKeys={{
							key:
								process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
								"",
						}}
						defaultCenter={{
							lat: location.lat,
							lng: location.lng,
						}}
						defaultZoom={11}
						yesIWantToUseGoogleMapApiInternals
					/>
				)}
			</div>
		</>
	);
};

const ContactPage: NextPage = (): JSX.Element => {
	return (
		<>
			<StyledHero
				image={contactHero}
				link="contact"
				title="Contact Information"
			/>
			<ContactInfo />
			<StyledSectionHeading title="Contact Form" />
			<ContactForm />
			<NewsletterBanner />
		</>
	);
};

export default ContactPage;
