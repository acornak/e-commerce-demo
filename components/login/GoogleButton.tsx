"use client";

import React, { FC } from "react";
// Next
import Image from "next/image";
// Animations
import { motion } from "framer-motion";
// Images
import googleIcon from "@/public/misc/google.svg";
import { useAuthStore } from "@/lib/stores/auth-store";

type GoogleButtonProps = {
	text: string;
};

const GoogleButton: FC<GoogleButtonProps> = ({ text }) => {
	const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);

	return (
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
			onClick={signInWithGoogle}
			data-testid="google-login-button"
		>
			<Image src={googleIcon.src} alt="Google" width={20} height={20} />{" "}
			{text}
		</motion.button>
	);
};

export default GoogleButton;
