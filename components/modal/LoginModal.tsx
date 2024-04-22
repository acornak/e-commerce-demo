import React, { FC, useEffect, useState } from "react";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Fonts
import { dancing } from "@/app/fonts";
// Types and constants
import colors from "@/lib/config/constants";
import { ModalProps } from "@/lib/config/types";
// Components
import HandleLoginForm from "../common/LoginForm";
// Icons
import CloseIcon from "../icon/Close";

const LoginModal: FC<ModalProps> = ({ modalOpen, setModalOpen }) => {
	const [showRegister, setShowRegister] = useState<boolean>(false);

	useEffect(() => {
		setShowRegister(false);
	}, [modalOpen]);

	return (
		<AnimatePresence>
			{modalOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-50 flex items-center justify-center"
					onClick={() => setModalOpen(false)}
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
							onClick={() => setModalOpen(false)}
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
