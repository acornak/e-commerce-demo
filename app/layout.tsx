import React from "react";
// Components
import Navbar from "@/components/navbar/Navbar";
// Next
import type { Metadata } from "next";
// Fonts
import { montserrat } from "./fonts";
// Styles
import "./globals.css";

export const metadata: Metadata = {
	title: "E-commerce demo",
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
				<Navbar />
				<main className="h-full overflow-y-auto main overscroll-none">
					{children}
				</main>
			</body>
		</html>
	);
}
