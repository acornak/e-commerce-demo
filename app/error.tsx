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
		<div className="flex items-center justify-center py-10 lg:py-20 px-8">
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
