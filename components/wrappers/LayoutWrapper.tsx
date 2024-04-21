"use client";

import React, { FC, ReactNode } from "react";
// Next
import { usePathname } from "next/navigation";
// Components
import Navbar from "../navbar/Navbar";
import CookieConsent from "../cookie/CookieConsent";
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
				<Footer />
			</>
		);
	}

	return (
		<>
			<Navbar />
			<CookieConsent />
			{children}
			<Sitemap />
			<Footer />
		</>
	);
};

export default LayoutWrapper;
