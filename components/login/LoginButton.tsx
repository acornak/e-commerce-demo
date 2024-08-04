"use client";

import React, { FC } from "react";
// Animations
import { motion } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";
import { ButtonProps } from "@/lib/config/types";

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
		data-testid="login-button"
	>
		{children}
	</motion.button>
);

export default LoginButton;
