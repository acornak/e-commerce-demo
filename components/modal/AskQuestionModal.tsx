import React, { FC, useRef } from "react";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";
// Store
import { useModalsStore } from "@/lib/stores/modals-store";
// Icons
import useOutsideAlerter from "@/lib/hooks/outside-click";
import CloseIcon from "../icon/Close";
import ContactForm from "../common/ContactForm";

const AskQuestionModal: FC = () => {
	const modalRef = useRef<HTMLDivElement>(null);
	const askQuestionModalOpen = useModalsStore(
		(state) => state.askQuestionModalOpen,
	);
	const setAskQuestionModalOpen = useModalsStore(
		(state) => state.setAskQuestionModalOpen,
	);

	useOutsideAlerter(modalRef, () => {
		if (askQuestionModalOpen) setAskQuestionModalOpen(false);
	});

	return (
		<AnimatePresence>
			{askQuestionModalOpen && (
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
						className="relative bg-white px-4 md:px-20 py-6 w-[95%] md:w-2/3 lg:w-1/2"
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
							onClick={() => setAskQuestionModalOpen(false)}
						>
							<CloseIcon />
						</motion.button>
						<h2 className="font-bold py-2 uppercase tracking-widest text-lg text-center">
							Ask A Question
						</h2>
						<ContactForm />
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default AskQuestionModal;
