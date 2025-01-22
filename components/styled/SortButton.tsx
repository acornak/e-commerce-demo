import React, { FC, useRef, useState } from "react";
// Hooks
import useOutsideAlerter from "@/lib/hooks/outside-click";
// Types and constants
import { SortOption } from "@/lib/config/types";
import { motion, AnimatePresence } from "framer-motion";
import ChevronDownIcon from "../icon/ChevronDown";

type SortButtonProps = {
	sortOptions: SortOption[];
	selectedOption: SortOption;
	setSelectedOption: (option: SortOption) => void;
};

const SortButton: FC<SortButtonProps> = ({
	sortOptions,
	selectedOption,
	setSelectedOption,
}): JSX.Element => {
	const buttonRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggleDropdown = () => setIsOpen(!isOpen);

	useOutsideAlerter(buttonRef, () => {
		if (isOpen) setIsOpen(false);
	});

	const handleSelectOption = (option: SortOption) => {
		setSelectedOption(option);
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<div className="flex justify-end items-end">
				<button
					type="button"
					onClick={toggleDropdown}
					className="bg-white text-gray-500 py-1 mx-4 text-sm flex items-center border-b border-gray-500"
				>
					<span className="mr-2" data-testid="selected-option">
						{selectedOption.label}
					</span>
					<ChevronDownIcon size="1em" />
				</button>

				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, scale: 0.85 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.85 }}
							transition={{ duration: 0.2 }}
							className="absolute top-7 right-4 mt-2 py-1 w-40 bg-white border border-gray-300 rounded shadow-lg z-50"
							ref={buttonRef}
							data-testid="sort-options"
						>
							{sortOptions.map((option) => (
								<motion.button
									key={option.value}
									onClick={() => handleSelectOption(option)}
									className={`text-left px-4 py-2 hover:text-secondary w-full text-sm ${
										selectedOption.value === option.value
											? "font-bold text-secondary"
											: ""
									}`}
									data-testid={`sort-option-${option.value}`}
								>
									{option.label}
								</motion.button>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default SortButton;
