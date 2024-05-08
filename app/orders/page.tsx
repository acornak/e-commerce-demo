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
// Types and constants
import { getOrders } from "@/lib/models/orders";
import { colors } from "@/lib/config/constants";
import { User, Order } from "@/lib/config/types";
import { getUser } from "@/lib/models/user";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import StyledLoading from "@/components/styled/Loading";
import OrdersTable from "@/components/profile/OrdersTable";
import NewsletterBanner from "@/components/common/Newsletter";
// Icons
import ChevronRightIcon from "@/components/icon/ChevronRight";

const OrdersPage: NextPage = (): JSX.Element => {
	const user = useAuthStore((state) => state.user);
	const initialLoading = useAuthStore((state) => state.initialLoading);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [userData, setUserData] = useState<User | null>(null);
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const fetchUserData = async () => {
			if (user && user.email) {
				const data = await getUser();
				if (data.error) {
					setError(data.error);
				}
				if (data.fsUser) {
					setUserData(data.fsUser);
				}
			}
		};
		const fetchOrders = async () => {
			if (user && user.email) {
				const data = await getOrders();
				if (data.error) {
					setError(data.error);
				}
				if (data.orders) {
					setOrders(data.orders);
				}
			}
		};

		fetchUserData();
		fetchOrders();
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
				<Link href="/orders">
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
						Your Orders
					</motion.p>
				</Link>
			</div>
			<StyledSectionHeading title="Your Orders" />
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

			<OrdersTable orders={orders} />

			<NewsletterBanner />
		</div>
	);
};

export default OrdersPage;
