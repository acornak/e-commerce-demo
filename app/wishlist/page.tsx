import React from "react";
// Next
import { NextPage } from "next";

const Wishlist: NextPage = (): JSX.Element => {
	return (
		<div className="text-center mt-6">
			<div className="text-3xl uppercase tracking-widest pt-6">
				Wishlist
				<div className="w-1/6 bg-orange-500 h-1 mx-auto mt-2" />
			</div>
			<h2 className="mt-4">
				Please log in or register before adding items to your wishlist
			</h2>
		</div>
	);
};

export default Wishlist;
