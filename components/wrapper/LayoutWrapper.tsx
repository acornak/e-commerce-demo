"use client";

import React, { FC, ReactNode } from "react";
// Next
import { usePathname } from "next/navigation";
// Components
import Navbar from "../navbar/Navbar";
import CookieConsent from "../modal/CookieConsent";
import Sitemap from "../footer/Sitemap";
import Footer from "../footer/Footer";
import NavbarAdmin from "../navbar/NavbarAdmin";

type LayoutWrapperProps = {
	children: ReactNode;
};

const LayoutWrapper: FC<LayoutWrapperProps> = ({ children }) => {
	const pathname = usePathname();

	if (pathname.includes("/admin")) {
		return (
			<>
				<NavbarAdmin />
				{children}
				<div className="sticky top-[100vh]">
					<Footer />
				</div>
			</>
		);
	}

	return (
		<>
			<Navbar />
			<CookieConsent />
			{children}
			<div className="sticky top-[100vh]">
				<Sitemap />
				<Footer />
			</div>
		</>
	);
};

export default LayoutWrapper;
