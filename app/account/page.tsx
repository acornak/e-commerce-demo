"use client";

import React, { useEffect, useState } from "react";
// Next
import { NextPage } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Stores
import { useAuthStore } from "@/lib/stores/auth-store";
import { getUser } from "@/lib/models/user";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import StyledLoading from "@/components/styled/Loading";
import UserDataForm from "@/components/profile/UserDataForm";
import PasswordForm from "@/components/profile/PasswordForm";
import AddressForm from "@/components/profile/AddressForm";
import ProfileWrapper from "@/components/profile/ProfileWrapper";
import NewsletterBanner from "@/components/common/Newsletter";
import ChevronRightIcon from "@/components/icon/ChevronRight";
// Types and constants
import { colors } from "@/lib/config/constants";
import { User } from "@/lib/config/types";

const AccountPage: NextPage = (): JSX.Element => {
	const user = useAuthStore((state) => state.user);
	const initialLoading = useAuthStore((state) => state.initialLoading);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [userData, setUserData] = useState<User | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			if (user && user.email) {
				try {
					const res = await getUser();
					setUserData(res);
				} catch (e: any) {
					setError(e.message);
				}
			}
		};
		fetchUserData();
		setLoading(false);
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
		<div className="flex flex-col items-center justify-center text-center pt-14 lg:pt-24">
			<div className="text-start w-full px-4 flex items-center bg-gray-100 py-2 pt-4">
				<Link href="/">
					<motion.p
						whileHover={{
							color: colors.secondary,
						}}
						whileTap={{
							color: colors.secondary,
						}}
						transition={{ duration: 0.2 }}
						className="inline"
					>
						Home
					</motion.p>
				</Link>
				<ChevronRightIcon />
				<Link href="/account">
					<motion.p
						whileHover={{
							color: colors.secondary,
						}}
						whileTap={{
							color: colors.secondary,
						}}
						transition={{ duration: 0.2 }}
						className="inline"
					>
						Your Account
					</motion.p>
				</Link>
			</div>

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

			<ProfileWrapper heading="Account Info">
				<UserDataForm userData={userData} email={user.email!} />
				<PasswordForm />
				<AddressForm address={userData?.address} />
			</ProfileWrapper>

			<NewsletterBanner />
		</div>
	);
};

export default AccountPage;
