"use client";

import React, { useState } from "react";
// Next
import { NextPage } from "next";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import { LoginForm, RegisterForm } from "@/components/navbar/Login";
import WishlistHero from "@/components/hero/WishlistHero";

const Wishlist: NextPage = (): JSX.Element => {
	const [showRegister, setShowRegister] = useState<boolean>(false);

	return (
		<>
			<WishlistHero />
			<div className="flex flex-col items-center justify-center text-center mt-6">
				<div>
					<StyledSectionHeading title="Log in first" />
					<h2 className="my-4 pb-6">
						Please log in or register before adding items to your
						wishlist
					</h2>
					<div className="">
						{showRegister ? (
							<RegisterForm setShowRegister={setShowRegister} />
						) : (
							<LoginForm setShowRegister={setShowRegister} />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Wishlist;
