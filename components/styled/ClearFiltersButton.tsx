import React, { FC } from "react";
// Animations
import { motion } from "framer-motion";
// Types and constants
import { colors } from "@/lib/config/constants";

type ClearFiltersButtonProps = {
	handleClearFilter: () => void;
	text?: string;
};

const ClearFiltersButton: FC<ClearFiltersButtonProps> = ({
	handleClearFilter,
	text = "Clear filter",
}): JSX.Element => (
	<motion.button
		whileHover={{
			backgroundColor: colors.secondary,
			color: colors.white,
			border: `1px solid ${colors.secondary}`,
		}}
		type="button"
		className="border border-gray-500 text-sm px-2 py-1 text-gray-500"
		onClick={handleClearFilter}
	>
		{text}
	</motion.button>
);

export default ClearFiltersButton;
