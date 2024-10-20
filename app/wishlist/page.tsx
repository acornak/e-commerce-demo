import React from "react";
// Next
import { NextPage } from "next";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import WishlistTable from "@/components/product/WishlistTable";
import StyledHero from "@/components/hero/StyledHero";
import LoginPrompt from "@/components/common/LoginPrompt";
// Images
import wishlistHero from "@/public/misc/wishlist.webp";

const WishlistPage: NextPage = (): JSX.Element => {
	return (
		<>
			<StyledHero image={wishlistHero} link="wishlist" title="Wishlist" />
			<div className="flex flex-col items-center justify-center text-center mt-6">
				<div>
					<StyledSectionHeading title="Products you love" />
					<LoginPrompt />
				</div>
				<WishlistTable />
			</div>
		</>
	);
};

export default WishlistPage;
