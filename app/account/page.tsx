"use client";

import React from "react";
// Next
import { NextPage } from "next";
import { redirect } from "next/navigation";
// Stores
import { useAuthStore } from "@/lib/stores/auth-store";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";

const AccountPage: NextPage = (): JSX.Element => {
	const loggedIn = useAuthStore((state) => state.loggedIn);

	if (!loggedIn) {
		redirect("/login");
	}

	return (
		<>
			<div className="pt-15">
				<StyledSectionHeading title="Account Page" />
			</div>
		</>
	);
};

export default AccountPage;
