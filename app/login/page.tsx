"use client";

import React, { Suspense, useState } from "react";
// Next
import { NextPage } from "next";
import { redirect, useSearchParams } from "next/navigation";
// Stores
import { useAuthStore } from "@/lib/stores/auth-store";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import HandleLoginForm from "@/components/login/HandleLoginForm";
import StyledLoading from "@/components/styled/Loading";

const RedirectHandler: React.FC = () => {
	const searchParams = useSearchParams();
	const redirectPath = searchParams.get("redirect");
	const user = useAuthStore((state) => state.user);

	if (user) {
		if (redirectPath) {
			redirect(`/${redirectPath}`);
		} else {
			redirect("/");
		}
	}

	return null;
};

const LoginPage: NextPage = (): JSX.Element => {
	const [showRegister, setShowRegister] = useState(false);
	const initialLoading = useAuthStore((state) => state.initialLoading);

	if (initialLoading)
		return (
			<div className="flex items-center justify-center mt-32 p-10">
				<StyledLoading />
			</div>
		);

	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center h-screen">
					<StyledLoading />
				</div>
			}
		>
			<div className="my-3 pt-20">
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
			<RedirectHandler />
		</Suspense>
	);
};

export default LoginPage;
