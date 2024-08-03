import React from "react";
// Next
import { NextPage } from "next";
import Link from "next/link";

const NotFound: NextPage = () => {
	return (
		<div
			className="flex items-center justify-center py-10 lg:py-20 px-8 mt-20"
			data-testid="not-found-page"
		>
			<div className="w-full">
				<h2 className="mt-6 text-center text-4xl lg:text-6xl font-semibold">
					404 - Page Not Found
				</h2>
				<p className="mt-2 text-center">
					The page you are looking for does not exist.
					<br />
					If you want to go to homepage, click{" "}
					<Link href="/" className="underline">
						here
					</Link>
					.
				</p>
			</div>
		</div>
	);
};

export default NotFound;
