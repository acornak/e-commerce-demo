"use client";

import React, { FC, useState } from "react";
// Animations
import { motion } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";
// Store
import { useAuthStore } from "@/lib/stores/auth-store";
// Types and constants
import { FormProps } from "@/lib/config/types";
// Components
import StyledLoading from "../styled/Loading";
import LoginButton from "./LoginButton";
import GoogleButton from "./GoogleButton";
import ToggleButton from "./ToggleButton";

const LoginForm: FC<FormProps> = ({ setShowRegister }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const loading = useAuthStore((state) => state.loading);
	const loginError = useAuthStore((state) => state.error);
	const signInWithEmail = useAuthStore((state) => state.signInWithEmail);
	const resetPassword = useAuthStore((state) => state.resetPassword);

	if (loading) {
		return (
			<div
				className="p-10 items-center justify-center flex"
				data-testid="login-loading"
			>
				<StyledLoading />
			</div>
		);
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setPassword(value);
		if (!value) {
			setPasswordError("Please enter your password");
		} else {
			setPasswordError("");
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setEmail(value);

		if (!value) {
			setEmailError("Please enter an email address");
		} else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
			setEmailError("Please enter a valid email address");
		} else {
			setEmailError("");
		}
	};

	const handleLogin = () => {
		if (!emailError && !passwordError) {
			signInWithEmail(email, password);
		}
	};

	const handleResetPassword = () => {
		if (!emailError) {
			resetPassword(email);
		}
	};

	return (
		<div className="flex flex-col space-y-6 mb-6" data-testid="login-form">
			{/* TODO: reset password */}
			<input
				type="email"
				placeholder="Email address"
				className="md:text-xs border border-gray-300 p-4"
				value={email}
				onChange={handleEmailChange}
				required
				data-testid="login-email-input"
			/>
			{emailError && <p className="text-red-500 text-xs">{emailError}</p>}
			<input
				type={showPassword ? "text" : "password"}
				placeholder="Password"
				value={password}
				className="md:text-xs border border-gray-300 p-4"
				onChange={handlePasswordChange}
				// required // TODO?
				data-testid="login-password-input"
			/>
			{passwordError && (
				<p className="text-red-500 text-xs">{passwordError}</p>
			)}
			<p className="inline text-start text-xs">
				<motion.button
					type="button"
					initial={{ color: colors.black }}
					whileHover={{ color: colors.secondary }}
					whileTap={{ color: colors.secondary }}
					className="inline text-start text-xs"
					onClick={() => {
						setShowPassword(!showPassword);
					}}
					data-testid="login-show-password-button"
				>
					{showPassword ? "Hide" : "Show"} password
				</motion.button>
			</p>
			<motion.button
				initial={{ color: colors.black }}
				whileHover={{ color: colors.secondary }}
				whileTap={{ color: colors.secondary }}
				className="inline text-start text-xs"
				onClick={handleResetPassword}
				data-testid="reset-password-button"
			>
				Forgot your password?
			</motion.button>
			{loginError && (
				<p className="text-red-500 text-xs" data-testid="login-error">
					{loginError}
				</p>
			)}
			<LoginButton onClick={handleLogin}>Login</LoginButton>
			<GoogleButton text="Log in with Google" />
			<ToggleButton onClick={() => setShowRegister(true)}>
				<p className="text-xs p-4">
					Don&apos;t have an account?{" "}
					<span className="inline">Register now!</span>
				</p>
			</ToggleButton>
		</div>
	);
};

export default LoginForm;
