import React from "react";
import { NextPage } from "next";
import Link from "next/link";

const NotFound: NextPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full">
				<h2 className="mt-6 text-center text-6xl font-semibold">
					404 - Page Not Found
				</h2>
				<p className="mt-2 text-center text-white dark:text-black">
					The page you are looking for does not exist.
					<br />
					If you want to go to homepage, click{" "}
					<Link
						href="/"
						className="underline text-secondary dark:text-darksecondary"
					>
						here
					</Link>
					.
				</p>
			</div>
		</div>
	);
};

export default NotFound;
