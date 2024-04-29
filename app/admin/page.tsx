"use client";

import React from "react";
// Next
import { NextPage } from "next";
import { redirect } from "next/navigation";
// Stores
import { useAuthStore } from "@/lib/stores/auth-store";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";

const Admin: NextPage = (): JSX.Element => {
	const loggedIn = useAuthStore((state) => state.loggedIn);

	if (!loggedIn) {
		redirect("/login");
	}

	return (
		<>
			<div className="text-center mt-6">
				<StyledSectionHeading title="Admin Dashboard" />
			</div>
		</>
	);
};

export default Admin;
