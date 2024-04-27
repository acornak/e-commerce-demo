"use client";

import React, { FC, ReactNode } from "react";
// Next
import Image from "next/image";
// Animations
import { motion } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";
// Images
import googleIcon from "@/public/misc/google.svg";

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

type ButtonProps = {
	children: ReactNode;
	onClick?: () => void;
};

const LoginButton: FC<ButtonProps> = ({ children, onClick }) => (
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
		onClick={onClick}
	>
		{children}
	</motion.button>
);

const ToggleButton: FC<ButtonProps> = ({ children, onClick }) => (
	<motion.div
		className="bg-gray-300 text-center cursor-pointer"
		onClick={onClick}
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
		{children}
	</motion.div>
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
		<LoginButton>Login</LoginButton>
		<GoogleButton text="Log in with Google" />
		<ToggleButton onClick={() => setShowRegister(true)}>
			<p className="text-xs p-4">
				Don&apos;t have an account?{" "}
				<span className="inline">Register now!</span>
			</p>
		</ToggleButton>
	</form>
);

const RegisterForm: FC<FormProps> = ({ setShowRegister }) => (
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
				onClick={() => {}}
			/>
		</p>
		<LoginButton>Register</LoginButton>
		<GoogleButton text="Register with Google" />
		<ToggleButton onClick={() => setShowRegister(false)}>
			<p className="text-xs p-4 text-center">
				<span className="inline">Back to login</span>
			</p>
		</ToggleButton>
	</form>
);

type HandleLoginFormProps = {
	showRegister: boolean;
	setShowRegister: (show: boolean) => void;
};

const HandleLoginForm: FC<HandleLoginFormProps> = ({
	showRegister,
	setShowRegister,
}) => {
	if (showRegister) {
		return <RegisterForm setShowRegister={setShowRegister} />;
	}
	return <LoginForm setShowRegister={setShowRegister} />;
};

export default HandleLoginForm;
