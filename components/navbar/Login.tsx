import React, { FC, useEffect, useState } from "react";
// Next
import Image from "next/image";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Fonts
import { dancing } from "@/app/fonts";
// Types and constants
import colors from "@/lib/config/constants";
// Images
import googleIcon from "@/public/misc/google.svg";
// Icons
import CloseIcon from "../icons/Close";

type GoogleButtonProps = {
	text: string;
};

const GoogleButton: FC<GoogleButtonProps> = ({ text }) => (
	<motion.button
		initial={{
			scale: 1,
			color: "#5F6368",
			backgroundColor: "#FFFFFF",
		}}
		whileHover={{
			scale: 1.05,
		}}
		whileTap={{
			scale: 1.05,
			backgroundColor: "#EEEEEE",
		}}
		transition={{ duration: 0.2 }}
		type="submit"
		className="p-4 uppercase text-sm font-semibold flex items-center justify-center gap-2 border border-gray-300"
	>
		<Image src={googleIcon.src} alt="Google" width={20} height={20} />{" "}
		{text}
	</motion.button>
);

type FormProps = {
	setShowRegister: (show: boolean) => void;
};

const LoginForm: FC<FormProps> = ({ setShowRegister }) => (
	<form className="flex flex-col space-y-6 mb-6">
		<input
			type="text"
			placeholder="Email address"
			className="md:text-xs border border-gray-300 p-4"
		/>
		<input
			type="password"
			placeholder="Password"
			className="md:text-xs border border-gray-300 p-4"
		/>
		<p className="inline text-start text-xs">
			<motion.button
				initial={{ color: colors.black }}
				whileHover={{ color: colors.secondary }}
				whileTap={{ color: colors.secondary }}
				className="inline text-start text-xs"
				onClick={(e) => e.stopPropagation()}
			>
				Forgot your password?
			</motion.button>
		</p>
		<motion.button
			initial={{
				scale: 1,
				color: colors.white,
				backgroundColor: colors.black,
			}}
			whileHover={{
				scale: 1.05,
				backgroundColor: colors.secondary,
				color: colors.black,
			}}
			whileTap={{
				scale: 1.05,
				backgroundColor: colors.secondary,
				color: colors.black,
			}}
			transition={{ duration: 0.2 }}
			type="submit"
			className="p-4 uppercase text-sm font-semibold"
		>
			Log in
		</motion.button>
		<GoogleButton text="Log in with Google" />
		<motion.div
			className="bg-gray-300 text-center cursor-pointer"
			onClick={() => setShowRegister(true)}
			initial={{
				color: "#6b7280",
			}}
			whileHover={{
				scale: 1.05,
				color: colors.secondary,
			}}
			whileTap={{ scale: 1.05, color: colors.secondary }}
			transition={{ duration: 0.2 }}
		>
			<p className="text-xs p-4">
				Don&apos;t have an account?{" "}
				<span className="inline">Register now!</span>
			</p>
		</motion.div>
	</form>
);

const RegisterForm: FC<FormProps> = ({ setShowRegister }) => (
	<form className="flex flex-col space-y-6 mb-6">
		<input
			type="text"
			placeholder="Email address"
			className="text-xs border border-gray-300 p-4"
		/>
		<input
			type="password"
			placeholder="Password"
			className="text-xs border border-gray-300 p-4"
		/>
		<p className="inline text-start text-xs">
			<motion.button
				initial={{ color: colors.black }}
				whileHover={{ color: colors.secondary }}
				whileTap={{ color: colors.secondary }}
				className="inline text-start text-xs"
				onClick={() => {}}
			/>
		</p>
		<motion.button
			initial={{
				scale: 1,
				color: colors.white,
				backgroundColor: colors.black,
			}}
			whileHover={{
				scale: 1.05,
				backgroundColor: colors.secondary,
				color: colors.black,
			}}
			whileTap={{
				scale: 1.05,
				backgroundColor: colors.secondary,
				color: colors.black,
			}}
			transition={{ duration: 0.2 }}
			type="submit"
			className="p-4 uppercase text-sm font-semibold"
		>
			Register
		</motion.button>
		<GoogleButton text="Register with Google" />
		<motion.div
			className="bg-gray-300 text-center cursor-pointer"
			onClick={() => setShowRegister(true)}
			initial={{
				color: "#6b7280",
			}}
			whileHover={{
				scale: 1.05,
				color: colors.secondary,
			}}
			whileTap={{ scale: 1.05, color: colors.secondary }}
			transition={{ duration: 0.2 }}
		>
			<p className="text-xs p-4 text-center">
				<span className="inline">Back to login</span>
			</p>
		</motion.div>
	</form>
);

type LoginModalProps = {
	loginModalOpen: boolean;
	setLoginModalOpen: (open: boolean) => void;
};

const LoginModal: FC<LoginModalProps> = ({
	loginModalOpen,
	setLoginModalOpen,
}) => {
	const [showRegister, setShowRegister] = useState<boolean>(false);

	useEffect(() => {
		setShowRegister(false);
	}, [loginModalOpen]);

	return (
		<AnimatePresence>
			{loginModalOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-50 flex items-center justify-center"
					onClick={() => setLoginModalOpen(false)}
				>
					<motion.div
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className="relative bg-white px-20 py-6 text-center"
						onClick={(e) => e.stopPropagation()}
					>
						<motion.button
							initial={{ rotate: 0, color: colors.white }}
							whileHover={{
								rotate: 180,
								color: colors.secondary,
							}}
							whileTap={{
								rotate: 180,
								color: colors.secondary,
							}}
							transition={{ duration: 0.2 }}
							className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 -mt-8"
							onClick={() => setLoginModalOpen(false)}
						>
							<CloseIcon />
						</motion.button>
						<h2
							className={`${dancing.className} text-6xl select-none pb-4 mx-12`}
						>
							Glassify
						</h2>
						<hr className="pb-4" />
						<p className="pb-4 text-xl">
							{showRegister
								? "Create your free account"
								: "Great to have you back!"}
						</p>
						{showRegister ? (
							<RegisterForm setShowRegister={setShowRegister} />
						) : (
							<LoginForm setShowRegister={setShowRegister} />
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LoginModal;
export { LoginForm, RegisterForm };
