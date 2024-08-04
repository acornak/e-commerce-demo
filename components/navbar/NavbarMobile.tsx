"use client";

import React, { FC, useState } from "react";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Types and constants
import { NavItem } from "@/lib/config/types";
import { colors } from "@/lib/config/constants";
// Components
import { useModalsStore } from "@/lib/stores/modals-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import HandleLoginForm from "../login/HandleLoginForm";
// Icons
import BarsIcon from "../icon/Bars";
import ChevronRightIcon from "../icon/ChevronRight";
import UserIcon from "../icon/User";

type MobileItemsProps = {
	items: NavItem[];
};

const MobileItems: FC<MobileItemsProps> = ({ items }): JSX.Element => {
	const drawerMenuOpen = useModalsStore((state) => state.drawerMenuOpen);
	const setDrawerMenuOpen = useModalsStore(
		(state) => state.setDrawerMenuOpen,
	);

	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const [showLogin, setShowLogin] = useState<boolean>(false);
	const [showRegister, setShowRegister] = useState<boolean>(false);
	const user = useAuthStore((state) => state.user);
	const initialLoading = useAuthStore((state) => state.initialLoading);

	const handleContent = () => {
		if (showLogin) {
			if (!initialLoading && user) {
				return (
					<>
						<div className="px-4 pt-4 text-lg flex flex-col items-center justify-center">
							<p className="text-center text-sm pb-6">
								Logged in as {user.email}
							</p>
						</div>
						<motion.li
							className="border-b border-t border-gray-300"
							onHoverStart={() => setHoverIndex(items.length + 1)}
							onHoverEnd={() => setHoverIndex(null)}
							initial={{ color: "#333" }}
							animate={{
								color:
									hoverIndex === items.length + 1
										? colors.secondary
										: "#333",
							}}
						>
							<a
								href="/account"
								className="flex justify-between items-center px-4"
							>
								Your Account
								<span className="flex items-center">
									<div className="mx-2 h-14 w-px bg-gray-300" />{" "}
									<motion.div
										animate={{
											scale:
												hoverIndex === items.length + 1
													? 1.5
													: 1,
										}}
										transition={{
											type: "spring",
											stiffness: 300,
										}}
									>
										<ChevronRightIcon />
									</motion.div>
								</span>
							</a>
						</motion.li>
						<motion.li
							className="border-b border-gray-300"
							onHoverStart={() => setHoverIndex(items.length + 2)}
							onHoverEnd={() => setHoverIndex(null)}
							initial={{ color: "#333" }}
							animate={{
								color:
									hoverIndex === items.length + 2
										? colors.secondary
										: "#333",
							}}
						>
							<a
								href="/settings"
								className="flex justify-between items-center px-4"
							>
								Account Settings
								<span className="flex items-center">
									<div className="mx-2 h-14 w-px bg-gray-300" />{" "}
									<motion.div
										animate={{
											scale:
												hoverIndex === items.length + 2
													? 1.5
													: 1,
										}}
										transition={{
											type: "spring",
											stiffness: 300,
										}}
									>
										<ChevronRightIcon />
									</motion.div>
								</span>
							</a>
						</motion.li>
						<div className="flex items-center justify-center">
							<motion.button
								type="button"
								whileHover={{
									backgroundColor: colors.black,
								}}
								whileTap={{
									backgroundColor: colors.black,
								}}
								onClick={() => useAuthStore.getState().logOut()}
								className="w-2/3 p-4 mt-4 text-white uppercase bg-secondary"
							>
								Logout
							</motion.button>
						</div>
					</>
				);
			}
			return (
				<div className="px-4 pt-4 text-lg">
					<HandleLoginForm
						showRegister={showRegister}
						setShowRegister={setShowRegister}
					/>
				</div>
			);
		}
		return items.map((item, index) => (
			<motion.li
				key={item.title}
				className="border-b border-gray-300"
				onHoverStart={() => setHoverIndex(index)}
				onHoverEnd={() => setHoverIndex(null)}
				initial={{ color: "#333" }}
				animate={{
					color: hoverIndex === index ? colors.secondary : "#333",
				}}
			>
				<a
					href={item.url}
					className="flex justify-between items-center px-4"
				>
					{item.title}
					<span className="flex items-center">
						<div className="mx-2 h-14 w-px bg-gray-300" />{" "}
						<motion.div
							animate={{
								scale: hoverIndex === index ? 1.5 : 1,
							}}
							transition={{
								type: "spring",
								stiffness: 300,
							}}
						>
							<ChevronRightIcon />
						</motion.div>
					</span>
				</a>
			</motion.li>
		));
	};

	return (
		<AnimatePresence>
			{drawerMenuOpen && (
				<motion.div
					initial="closed"
					animate="open"
					exit="closed"
					variants={{
						open: { x: 0, opacity: 1 },
						closed: { x: "-100%", opacity: 0 },
					}}
					transition={{
						type: "tween",
						ease: "easeInOut",
						duration: 0.3,
					}}
					className="fixed top-0 left-0 h-full bg-white shadow-xl uppercase z-50"
					style={{ width: "400px" }}
				>
					<ul>
						<div className="flex justify-between border-b border-gray-300 uppercase text-xs">
							<button
								type="button"
								className={`${
									showLogin
										? "bg-white text-black"
										: "bg-black text-white"
								} p-3 flex items-center justify-center w-1/2 md:w-full cursor-pointer`}
								onClick={() =>
									showLogin
										? setShowLogin(false)
										: setDrawerMenuOpen(false)
								}
							>
								<BarsIcon />
								<span className="pl-4">Menu</span>
							</button>
							<button
								type="button"
								className={`${
									showLogin
										? "bg-black text-white"
										: "bg-white text-black"
								} flex items-center justify-center w-1/2 md:hidden`}
								onClick={() =>
									showLogin
										? setDrawerMenuOpen(false)
										: setShowLogin(true)
								}
							>
								<div className="w-5 h-5">
									<UserIcon />
								</div>
								<span className="pl-4">
									{user ? "Logged in" : "Login"}
								</span>
							</button>
						</div>
						{handleContent()}
					</ul>
					<motion.button
						whileHover={{ backgroundColor: colors.black }}
						whileTap={{ backgroundColor: colors.black }}
						type="button"
						onClick={() => setDrawerMenuOpen(false)}
						className="absolute bottom-0 w-full p-4 text-white uppercase text-sm bg-secondary"
					>
						Close
					</motion.button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MobileItems;
