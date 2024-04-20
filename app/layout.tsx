import React from "react";
// Next
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
// Components
import Navbar from "@/components/navbar/Navbar";
import CookieConsent from "@/components/cookie/CookieConsent";
import Footer from "@/components/footer/Footer";
import Sitemap from "@/components/footer/Sitemap";
// Fonts
import { montserrat } from "./fonts";
// Styles
import "./globals.css";

export const metadata: Metadata = {
	title: "Glassify",
	description: "Demo project for e-commerce website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<Analytics />
				<main className="h-full overflow-y-auto main overscroll-none">
					<Navbar />
					<CookieConsent />
					{children}
					<Sitemap />
					<Footer />
				</main>
			</body>
		</html>
	);
}
