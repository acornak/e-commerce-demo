"use client";

import React from "react";
// Next
import { NextPage } from "next";
import { redirect } from "next/navigation";
// Stores
import { useAuthStore } from "@/lib/stores/auth-store";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import StyledLoading from "@/components/styled/Loading";

const AccountPage: NextPage = (): JSX.Element => {
	const user = useAuthStore((state) => state.user);
	const initialLoading = useAuthStore((state) => state.initialLoading);

	if (initialLoading)
		return (
			<div className="flex items-center justify-center mt-32 p-10">
				<StyledLoading />
			</div>
		);

	if (!user) {
		redirect("/login?redirect=account");
	}

	return (
		<>
			<div className="pt-28">
				<StyledSectionHeading title="Account Page" />
			</div>
		</>
	);
};

export default AccountPage;
