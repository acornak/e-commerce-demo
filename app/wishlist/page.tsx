import React from "react";
// Next
import { NextPage } from "next";
// Components
import SectionHeading from "@/components/styled/Heading";

const Wishlist: NextPage = (): JSX.Element => {
	return (
		<div className="text-center mt-6">
			<SectionHeading title="Wishlist" />
			<h2 className="mt-4">
				Please log in or register before adding items to your wishlist
			</h2>
		</div>
	);
};

export default Wishlist;
