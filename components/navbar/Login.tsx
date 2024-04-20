import React, { FC, useEffect, useState } from "react";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Fonts
import { dancing } from "@/app/fonts";
// Icons
import CloseIcon from "../icons/Close";

type FormProps = {
	setShowRegister: (show: boolean) => void;
};

const LoginForm: FC<FormProps> = ({ setShowRegister }) => (
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
				initial={{ color: "#000000" }}
				whileHover={{ color: "#FF6347" }}
				className="inline text-start text-xs"
				onClick={(e) => e.stopPropagation()}
			>
				Forgot your password?
			</motion.button>
		</p>
		<motion.button
			initial={{
				scale: 1,
				color: "#FFFFFF",
				backgroundColor: "#000000",
			}}
			whileHover={{
				scale: 1.05,
				backgroundColor: "#FF6347",
				color: "#000000",
			}}
			transition={{ duration: 0.2 }}
			type="submit"
			className="p-4 uppercase text-sm font-semibold"
		>
			Log in
		</motion.button>
		<div className="bg-gray-300 text-center">
			<p className="text-xs p-4 text-gray-500">
				Don`&apos;t have an account?
				<span className="inline">
					{"   "}
					<motion.span
						initial={{
							color: "#6b7280",
						}}
						whileHover={{
							color: "#FF6347",
						}}
						transition={{ duration: 0.2 }}
						className="cursor-pointer"
						onClick={() => setShowRegister(true)}
					>
						Register now!
					</motion.span>
				</span>
			</p>
		</div>
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
				initial={{ color: "#000000" }}
				whileHover={{ color: "#FF6347" }}
				className="inline text-start text-xs"
				onClick={() => {}}
			/>
		</p>
		<motion.button
			initial={{
				scale: 1,
				color: "#FFFFFF",
				backgroundColor: "#000000",
			}}
			whileHover={{
				scale: 1.05,
				backgroundColor: "#FF6347",
				color: "#000000",
			}}
			transition={{ duration: 0.2 }}
			type="submit"
			className="p-4 uppercase text-sm font-semibold"
		>
			Register
		</motion.button>
		<div className="bg-gray-300">
			<p className="text-xs p-4 text-gray-500 text-center">
				<span className="inline">
					<motion.span
						initial={{
							color: "#6b7280",
						}}
						whileHover={{
							color: "#FF6347",
						}}
						transition={{ duration: 0.2 }}
						className="cursor-pointer"
						onClick={() => setShowRegister(false)}
					>
						Back to login
					</motion.span>
				</span>
			</p>
		</div>
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
							initial={{ rotate: 0, color: "#FFFFFF" }}
							whileHover={{ rotate: 180, color: "#FF6347" }}
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
