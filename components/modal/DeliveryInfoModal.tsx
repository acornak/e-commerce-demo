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

const DeliveryInfoModal: FC = () => {
	const modalRef = useRef<HTMLDivElement>(null);
	const deliveryInfoModalOpen = useModalsStore(
		(state) => state.deliveryInfoModalOpen,
	);
	const setDeliveryInfoModalOpen = useModalsStore(
		(state) => state.setDeliveryInfoModalOpen,
	);

	useOutsideAlerter(modalRef, () => {
		if (deliveryInfoModalOpen) setDeliveryInfoModalOpen(false);
	});

	return (
		<AnimatePresence>
			{deliveryInfoModalOpen && (
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
						className="relative bg-white px-4 md:px-20 py-6 w-[95%] md:w-3/4"
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
							onClick={() => setDeliveryInfoModalOpen(false)}
						>
							<CloseIcon />
						</motion.button>
						<h2 className="font-bold py-2 uppercase tracking-widest text-lg">
							Delivery
						</h2>
						<p className="py-2 text-gray-600 text-sm leading-6 md:leading-8">
							All orders shipped with UPS Express.
							<br />
							Always free shipping for orders over US $250.
							<br />
							All orders are shipped with a UPS tracking number.
						</p>
						<h2 className="font-bold py-2 uppercase tracking-widest text-lg">
							Returns
						</h2>
						<p className="py-2 text-gray-600 text-sm leading-6 md:leading-8 text-justify">
							Items returned within 14 days of their original
							shipment date in same as new condition will be
							eligible for a full refund or store credit.
							<br className="hidden md:block" />
							Refunds will be charged back to the original form of
							payment used for purchase.
							<br className="hidden md:block" />
							Customer is responsible for shipping charges when
							making returns and shipping/handling fees of
							original purchase is non-refundable.
							<br className="hidden md:block" />
							All sale items are final purchases.
						</p>
						<h2 className="font-bold py-2 uppercase tracking-widest text-lg">
							Help
						</h2>
						<p className="py-2 text-gray-600 text-sm leading-6 md:leading-8">
							Give us a shout if you have any other questions
							and/or concerns.
							<br />
							Email:{" "}
							<a
								href="mailto:help@glassify.com"
								className="underline text-base font-medium"
							>
								help@glassify.com
							</a>
							<br />
							Phone:{" "}
							<a
								href="tel:+1 (23) 456 789"
								className="underline text-base font-medium"
							>
								+1 (23) 456 789
							</a>
						</p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default DeliveryInfoModal;
