"use client";

import React from "react";
// Animations
import { motion } from "framer-motion";
// Store
import { useModalsStore } from "@/lib/stores/modals-store";
import { useAuthStore } from "@/lib/stores/auth-store";
// Types and Constants
import { colors } from "@/lib/config/constants";

const LoginPrompt = (): JSX.Element | null => {
	const setLoginModalOpen = useModalsStore(
		(state) => state.setLoginModalOpen,
	);
	const user = useAuthStore((state) => state.user);
	const initialLoading = useAuthStore((state) => state.initialLoading);

	if (initialLoading) return null;
	if (user) return null;

	return (
		<h2 className="my-4 pb-6">
			For better experience, please{" "}
			<motion.p
				whileHover={{ color: colors.secondary }}
				whileTap={{ color: colors.secondary }}
				className="inline font-bold cursor-pointer"
				onClick={() => setLoginModalOpen(true)}
			>
				login
			</motion.p>{" "}
			first.
		</h2>
	);
};

export default LoginPrompt;
