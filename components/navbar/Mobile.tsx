"use client";

import React, { FC, useState } from "react";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Components
import { NavItems } from "./NavItems";
import { LoginForm, RegisterForm } from "./Login";
// Icons
import BarsIcon from "../icons/Bars";
import ChevronRightIcon from "../icons/ChevronRight";
import UserIcon from "../icons/User";

type MobileItemsProps = {
	drawerOpen: boolean;
	setdrawerOpen: (open: boolean) => void;
};

const MobileItems: FC<MobileItemsProps> = ({
	drawerOpen,
	setdrawerOpen,
}): JSX.Element => {
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const [showLogin, setShowLogin] = useState<boolean>(false);
	const [showRegister, setShowRegister] = useState<boolean>(false);

	const handleContent = () => {
		if (showLogin) {
			return showRegister ? (
				<div className="px-4 pt-4">
					<RegisterForm setShowRegister={setShowRegister} />
				</div>
			) : (
				<div className="px-4 pt-4">
					<LoginForm setShowRegister={setShowRegister} />
				</div>
			);
		}
		return NavItems.map((item, index) => (
			<motion.li
				key={item.title}
				className="border-b border-gray-300"
				onHoverStart={() => setHoverIndex(index)}
				onHoverEnd={() => setHoverIndex(null)}
				initial={{ color: "#333" }}
				animate={{
					color: hoverIndex === index ? "#FF6347" : "#333",
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
			{drawerOpen && (
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
										: setdrawerOpen(false)
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
										? setdrawerOpen(false)
										: setShowLogin(true)
								}
							>
								<div className="w-5 h-5">
									<UserIcon />
								</div>
								<span className="pl-4">Login</span>
							</button>
						</div>
						{handleContent()}
					</ul>
					<button
						type="button"
						onClick={() => setdrawerOpen(false)}
						className="absolute bottom-0 w-full p-4 text-white uppercase text-sm"
						style={{
							backgroundColor: "#FF6347",
						}}
					>
						Close
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MobileItems;
