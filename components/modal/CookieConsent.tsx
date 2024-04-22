"use client";

import React, { useEffect, useState } from "react";
// Next
import { usePathname } from "next/navigation";
import Link from "next/link";
// Cookie
import { hasCookie, setCookie } from "cookies-next";

const CookieConsent = (): JSX.Element | null => {
	const pathname = usePathname();
	const [showConsent, setShowConsent] = useState<boolean>(false);

	useEffect(() => {
		setShowConsent(
			!hasCookie("cookieConsent") && pathname !== "/privacy-policy",
		);
	}, [pathname]);

	const acceptCookie = (): void => {
		setShowConsent(false);
		setCookie("cookieConsent", "true", { maxAge: 31536000 });
	};

	const rejectCookie = (): void => {
		setShowConsent(false);
		setCookie("cookieConsent", "false", { maxAge: 31536000 });
	};

	if (!showConsent) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
			style={{
				zIndex: 1000,
			}}
		>
			<div className="bg-white text-black p-6 w-2/3">
				<h1 className="text-xl font-bold tracking-widest text-center pb-4">
					Cookie Consent
				</h1>
				<p className="text-center mb-4">
					We use cookies on our website to enhance your user
					experience and improve our services. Cookies help us
					remember your preferences, understand how you interact with
					our site, and provide content tailored to your interests.
				</p>
				<p className="text-center">
					<Link
						className="underline hover:text-gray-300"
						href="/privacy-policy"
					>
						Learn more
					</Link>
				</p>
				<div className="flex justify-around pt-6">
					<button
						type="button"
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
						onClick={() => acceptCookie()}
					>
						Accept
					</button>
					<button
						type="button"
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
						onClick={() => rejectCookie()}
					>
						Decline
					</button>
				</div>
			</div>
		</div>
	);
};

export default CookieConsent;
