import React, { FC } from "react";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Icons
import { useModalsStore } from "@/lib/stores/modals-store";
import MagnifierIcon from "../icon/Magnifier";

const SearchBar: FC = () => {
	const searchBarOpen = useModalsStore((state) => state.searchBarOpen);

	return (
		<AnimatePresence>
			{searchBarOpen && (
				<motion.div
					initial="closed"
					animate="open"
					exit="closed"
					variants={{
						open: { height: "350px", opacity: 1, y: 0 },
						closed: { height: 0, opacity: 0, y: "-100%" },
					}}
					transition={{
						type: "tween",
						ease: "easeInOut",
						duration: 0.3,
					}}
					className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl"
				>
					<motion.h2
						initial={{ opacity: 0, y: "-100%" }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.3 }}
						className="text-2xl md:text-4xl font-semibold text-center py-20 p-4"
					>
						Start typing and hit Enter
					</motion.h2>
					<motion.div
						initial={{ opacity: 0, y: "-100%" }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.3 }}
						className="mx-10 md:mx-20 lg:mx-48 flex items-center border-b"
					>
						<input
							type="search"
							className="w-full p-2 bg-white"
							placeholder="Search for products..."
						/>
						<button type="button" aria-label="Search for products">
							<MagnifierIcon />
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default SearchBar;
