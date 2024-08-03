"use client";

import React, { FC, useState } from "react";
// Animations
import { motion } from "framer-motion";
// Store
import { useAuthStore } from "@/lib/stores/auth-store";
// Types and constants
import { colors } from "@/lib/config/constants";
import { FormProps } from "@/lib/config/types";
// Components
import LoginButton from "./LoginButton";
import ToggleButton from "./ToggleButton";

const RegisterForm: FC<FormProps> = ({ setShowRegister }) => {
	const signUpWithEmail = useAuthStore((state) => state.signUpWithEmail);
	const registerError = useAuthStore((state) => state.error);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<div
			className="flex flex-col space-y-6 mb-6"
			data-testid="register-form"
		>
			<input
				type="text"
				placeholder="Email address"
				className="md:text-xs border border-gray-300 p-4"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				data-testid="register-email-input"
			/>
			<input
				type={showPassword ? "text" : "password"}
				placeholder="Password"
				className="md:text-xs border border-gray-300 p-4"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				data-testid="register-password-input"
			/>
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
					data-testid="register-show-password-button"
				>
					{showPassword ? "Hide" : "Show"} password
				</motion.button>
				{registerError && (
					<p
						className="text-red-500 text-xs"
						data-testid="register-error"
					>
						{registerError}
					</p>
				)}
			</p>
			<LoginButton onClick={() => signUpWithEmail(email, password)}>
				Register
			</LoginButton>
			<ToggleButton onClick={() => setShowRegister(false)}>
				<p className="text-xs p-4 text-center">
					<span className="inline">Back to login</span>
				</p>
			</ToggleButton>
		</div>
	);
};

export default RegisterForm;
