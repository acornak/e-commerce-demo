import React, { FC, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NotificationProps = {
	message: string;
	type: "success" | "error";
	onClose: () => void;
	duration?: number;
};

const Notification: FC<NotificationProps> = ({
	message,
	type,
	onClose,
	duration = 3000,
}): JSX.Element => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	const backgroundColor = type === "success" ? "bg-green-500" : "bg-red-500";

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -50 }}
				className={`fixed top-4 right-4 ${backgroundColor} text-white px-6 py-3 rounded-md shadow-lg z-50`}
				data-testid="notification"
			>
				{message}
			</motion.div>
		</AnimatePresence>
	);
};

export default Notification;
