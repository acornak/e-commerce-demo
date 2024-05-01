import React, { FC } from "react";
// Next
import Image from "next/image";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";
// Store
import { useModalsStore } from "@/lib/stores/modals-store";
// Icons
import CloseIcon from "../icon/Close";

const ProductImageModal: FC = () => {
	const productImageModalUrl = useModalsStore(
		(state) => state.productImageModalUrl,
	);
	const productImageModalOpen = useModalsStore(
		(state) => state.productImageModalOpen,
	);
	const setProductImageModalOpen = useModalsStore(
		(state) => state.setProductImageModalOpen,
	);

	return (
		<AnimatePresence>
			{productImageModalOpen && productImageModalUrl && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-50 flex items-center justify-center"
					onClick={() => setProductImageModalOpen(false)}
				>
					<motion.div
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className="relative bg-white px-4 w-[90%] h-[90%] md:px-20 py-6 flex items-center justify-center"
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
							onClick={() => setProductImageModalOpen(false)}
						>
							<CloseIcon />
						</motion.button>
						<Image
							src={productImageModalUrl}
							alt="Product image"
							layout="fill"
							objectFit="contain"
						/>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ProductImageModal;
