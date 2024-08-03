"use client";

import React, { FC } from "react";
// Animations
import { motion } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";
// Images
import { ButtonProps } from "@/lib/config/types";

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
		data-testid="login-toggle-button"
	>
		{children}
	</motion.div>
);

export default ToggleButton;
