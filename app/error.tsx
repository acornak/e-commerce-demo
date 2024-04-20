"use client";

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full">
				<h2 className="mt-6 text-center text-4xl font-semibold">
					Something went wrong!
				</h2>
				<div className="mt-6 text-center">
					<button
						type="button"
						className="px-4 py-2 text-white uppercase text-sm bg-secondary"
						onClick={() => reset()}
					>
						Try again
					</button>
				</div>
			</div>
		</div>
	);
}
