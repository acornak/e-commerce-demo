"use client";

import React, { useEffect, useState } from "react";
// Next
import { NextPage } from "next";
import { redirect } from "next/navigation";
// Stores
import { useAuthStore } from "@/lib/stores/auth-store";
import { User, getUser } from "@/lib/models/user";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import StyledLoading from "@/components/styled/Loading";
import UserDataForm from "@/components/account/UserDataForm";
import PasswordForm from "@/components/account/PasswordForm";
import AddressForm from "@/components/account/AddressForm";

const AccountWrapper = ({
	children,
	heading,
}: {
	children: React.ReactNode;
	heading: string;
}): JSX.Element => {
	return (
		<div className="flex flex-col items-center">
			<h1 className="text-xl tracking-wider border-b border-secondary mb-4">
				{heading}
			</h1>
			<div className="w-full px-10">{children}</div>
		</div>
	);
};

const OrdersTable = (): JSX.Element => {
	return <div className="pt-0">You have no orders yet.</div>;
};

const AccountPage: NextPage = (): JSX.Element => {
	const user = useAuthStore((state) => state.user);
	const initialLoading = useAuthStore((state) => state.initialLoading);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [userData, setUserData] = useState<User | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			if (user && user.email) {
				const data = await getUser();
				if (data.error) {
					setError(data.error);
					setLoading(false);
				}
				if (data.fsUser) {
					setUserData(data.fsUser);
					setLoading(false);
				}
			}
		};

		fetchUserData();
	}, [user]);

	if (initialLoading || loading)
		return (
			<div className="flex items-center justify-center mt-32 p-10">
				<StyledLoading />
			</div>
		);

	if (!user) {
		redirect("/login?redirect=account");
	}

	if (error) {
		return (
			<div className="flex items-center justify-center mt-32 p-10">
				<p className="text-red">{error}</p>
			</div>
		);
	}

	return (
		<>
			<div className="pt-28">
				<StyledSectionHeading title="Your Account" />
				<div className="flex text-center justify-center pb-8">
					<p>
						{/* TODO: this will be different with email/password login */}
						Welcome back
						<span className="font-semibold">
							{userData && ` ${userData.firstName}`}
						</span>
						!
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2">
					<AccountWrapper heading="Your Orders">
						<OrdersTable />
					</AccountWrapper>
					<AccountWrapper heading="Account Info">
						<UserDataForm userData={userData} email={user.email!} />
						<PasswordForm />
						<AddressForm address={userData?.address} />
					</AccountWrapper>
				</div>
			</div>
		</>
	);
};

export default AccountPage;
