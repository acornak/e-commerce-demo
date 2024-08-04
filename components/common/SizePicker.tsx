"use client";

import React, { FC, useEffect, useState } from "react";
// Animations
import { motion } from "framer-motion";
// Functions
import { fetchAllSizes } from "@/lib/functions/size-fetcher";
// Types and constants
import { colors } from "@/lib/config/constants";
import { Product, Size } from "@/lib/config/types";

type SizePickerProps = {
	product: Product;
	selectedSize: Size | null;
	setSelectedSize: (size: Size) => void;
};

const SizePicker: FC<SizePickerProps> = ({
	product,
	selectedSize,
	setSelectedSize,
}): JSX.Element => {
	const [sizes, setSizes] = useState<Size[]>([]);

	useEffect(() => {
		fetchAllSizes()
			.then((res) => setSizes(res))
			.catch((error) => {
				console.error(`Fetching sizes failed: ${error}`);
			});
	}, []);

	const border = (size: Size): string => {
		if (!product.sizeIds.includes(size.id)) {
			return `1px solid ${colors.gray300}`;
		}
		if (selectedSize === size) {
			return `1px solid ${colors.secondary}`;
		}
		return `1px solid ${colors.black}`;
	};

	const backgroundColor = (size: Size): string => {
		if (product.sizeIds.includes(size.id)) {
			return selectedSize === size ? colors.secondary : colors.white;
		}
		return colors.white;
	};

	const backgroundColorHover = (size: Size): string => {
		if (product.sizeIds.includes(size.id)) {
			return colors.secondary;
		}
		return colors.white;
	};

	const textColor = (size: Size): string => {
		if (product.sizeIds.includes(size.id)) {
			return selectedSize === size ? colors.white : colors.black;
		}
		return colors.gray300;
	};

	const textColorHover = (size: Size): string => {
		if (product.sizeIds.includes(size.id)) {
			return colors.white;
		}
		return colors.gray300;
	};

	return (
		<div className="grid grid-cols-6 gap-4 py-2">
			{sizes.map((size) => (
				<motion.button
					type="button"
					key={size.id}
					whileHover={{
						backgroundColor: backgroundColorHover(size),
						color: textColorHover(size),
					}}
					className="p-2 text-sm tracking-widest text-center"
					onClick={() => setSelectedSize(size)}
					style={{
						border: border(size),
						backgroundColor: backgroundColor(size),
						color: textColor(size),
					}}
					disabled={!product.sizeIds.includes(size.id)}
					data-testid={`size-picker-${size.id}`}
				>
					<div className="h-full flex items-center justify-center">
						{size.name}
					</div>
				</motion.button>
			))}
		</div>
	);
};

export default SizePicker;
