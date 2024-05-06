"use client";

import React, { useState } from "react";
// Next
import { NextPage } from "next";
import { redirect, useSearchParams } from "next/navigation";
// Stores
import { useAuthStore } from "@/lib/stores/auth-store";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import HandleLoginForm from "@/components/common/LoginForm";
import StyledLoading from "@/components/styled/Loading";

const LoginPage: NextPage = (): JSX.Element => {
	const searchParams = useSearchParams();
	const redirectPath = searchParams.get("redirect");
	const [showRegister, setShowRegister] = useState(false);
	const initialLoading = useAuthStore((state) => state.initialLoading);
	const user = useAuthStore((state) => state.user);

	if (initialLoading)
		return (
			<div className="flex items-center justify-center mt-32 p-10">
				<StyledLoading />
			</div>
		);

	if (user) {
		if (redirectPath) {
			redirect(`/${redirectPath}`);
		} else {
			redirect("/");
		}
	}

	return (
		<>
			<div className="my-3 pt-20 ">
				<StyledSectionHeading title="Login or Register" />
			</div>
			<div className="flex items-center justify-center">
				<div className="w-72">
					<HandleLoginForm
						showRegister={showRegister}
						setShowRegister={setShowRegister}
					/>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
