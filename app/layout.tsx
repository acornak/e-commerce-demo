import React from "react";
// Next
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
// Components
import Navbar from "@/components/navbar/Navbar";
import CookieConsent from "@/components/cookie/CookieConsent";
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
				<Navbar />
				<main className="h-full overflow-y-auto main overscroll-none">
					<CookieConsent />
					{children}
				</main>
			</body>
		</html>
	);
}
