import React, { FC, useEffect, useRef, useState } from "react";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Fonts
import { dancing } from "@/app/fonts";
// Types and constants
import { colors } from "@/lib/config/constants";
// Store
import { useModalsStore } from "@/lib/stores/modals-store";
// Components
import useOutsideAlerter from "@/lib/hooks/outside-click";
import { useAuthStore } from "@/lib/stores/auth-store";
import HandleLoginForm from "../login/HandleLoginForm";
// Icons
import CloseIcon from "../icon/Close";

const LoginModal: FC = () => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [showRegister, setShowRegister] = useState<boolean>(false);
	const loginModalOpen = useModalsStore((state) => state.loginModalOpen);
	const setLoginModalOpen = useModalsStore(
		(state) => state.setLoginModalOpen,
	);
	const user = useAuthStore((state) => state.user);

	useOutsideAlerter(modalRef, () => {
		if (loginModalOpen) setLoginModalOpen(false);
	});

	useEffect(() => {
		setShowRegister(false);
	}, [loginModalOpen]);

	useEffect(() => {
		if (user) setLoginModalOpen(false);
	}, [user]);

	return (
		<AnimatePresence>
			{loginModalOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-50 flex items-center justify-center"
				>
					<motion.div
						ref={modalRef}
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className="relative bg-white px-20 py-6 text-center"
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
						<HandleLoginForm
							showRegister={showRegister}
							setShowRegister={setShowRegister}
						/>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LoginModal;
