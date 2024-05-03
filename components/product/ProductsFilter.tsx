"use client";

import React, { useEffect, useState } from "react";
// Next
import Link from "next/link";
// Animations
import { motion } from "framer-motion";
// Functions
import { fetchAllCategories } from "@/lib/functions/category-fetcher";
// Types and constants
import { Category } from "@/lib/models/category";
import { colors } from "@/lib/config/constants";
import ChevronRightIcon from "../icon/ChevronRight";

const HeadingWithHr = ({ title }: { title: string }): JSX.Element => (
	<div className="flex items-center flex-row w-full py-2">
		<h1 className="tracking-widest uppercase border-l-4 border-black px-4 py-2">
			{title}
		</h1>
		<hr className="flex-grow border-t border-gray-300 my-auto" />
	</div>
);

const CategoryFilter = ({ category }: { category: Category }): JSX.Element => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<div
			key={category.id}
			className="flex items-center text-sm py-1 tracking-wider"
			style={{
				color: isHovered ? colors.secondary : "initial",
			}}
		>
			<motion.div
				initial={{ opacity: 0, x: -10 }}
				animate={
					isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
				}
				transition={{ duration: 0.2 }}
			>
				<ChevronRightIcon size="1.5em" />
			</motion.div>
			<Link
				href={`/products/categories/${category.slug}`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{category.name}
			</Link>
		</div>
	);
};

const PriceFilter = (): JSX.Element => {
	// TODO
	const priceRanges = [
		{ min: 0, max: 100 },
		{ min: 100, max: 200 },
		{ min: 200, max: 300 },
		{ min: 300, max: 400 },
		{ min: 400, max: 500 },
	];

	const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>(
		[],
	);

	return (
		<div className="px-6">
			{priceRanges.map((priceRange) => (
				<div key={priceRange.min} className="flex flex-row py-1">
					<input
						type="checkbox"
						className="custom-checkbox cursor-pointer p-2 pr-[0.55rem]"
						checked={selectedPriceRanges.includes(priceRange.min)}
						onChange={(e) => {
							const isChecked = e.target.checked;
							setSelectedPriceRanges(
								isChecked
									? [...selectedPriceRanges, priceRange.min]
									: selectedPriceRanges.filter(
											(price) => price !== priceRange.min,
										),
							);
						}}
					/>

					<motion.label
						className="text-sm tracking-widest px-3 cursor-pointer"
						whileHover={{
							color: colors.secondary,
						}}
						onClick={() => {
							const isChecked = selectedPriceRanges.includes(
								priceRange.min,
							);
							setSelectedPriceRanges(
								isChecked
									? selectedPriceRanges.filter(
											(price) => price !== priceRange.min,
										)
									: [...selectedPriceRanges, priceRange.min],
							);
						}}
					>{`$${priceRange.min.toFixed(
						2,
					)} - $${priceRange.max.toFixed(2)}`}</motion.label>
				</div>
			))}
		</div>
	);
};

const SizeFilter = (): JSX.Element => {
	const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
	const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

	const handleSizeClick = (size: string) => {
		if (selectedSizes.includes(size)) {
			setSelectedSizes(selectedSizes.filter((s) => s !== size));
		} else {
			setSelectedSizes([...selectedSizes, size]);
		}
	};

	return (
		<div className="px-6">
			<div className="grid grid-cols-4 gap-4">
				{sizes.map((size) => (
					<motion.div
						key={size}
						initial={{
							backgroundColor: selectedSizes.includes(size)
								? colors.secondary
								: colors.white,
							color: selectedSizes.includes(size)
								? colors.white
								: colors.black,
						}}
						whileHover={{
							backgroundColor: colors.secondary,
							color: colors.white,
						}}
						className="cursor-pointer p-2 text-sm tracking-widest text-center"
						onClick={() => handleSizeClick(size)}
						style={{
							border: selectedSizes.includes(size)
								? "1px solid #FF6347"
								: "1px solid black",
						}}
					>
						<div className="h-full flex items-center justify-center">
							{size}
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

const BrandsFilter = ({ brand }: { brand: string }): JSX.Element => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<div
			key={brand}
			className="flex items-center text-sm py-1 tracking-wider"
			style={{
				color: isHovered ? colors.secondary : "initial",
			}}
		>
			<motion.div
				initial={{ opacity: 0, x: -10 }}
				animate={
					isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
				}
				transition={{ duration: 0.2 }}
			>
				<ChevronRightIcon size="1.5em" />
			</motion.div>
			<p
				className="cursor-pointer"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{brand}
			</p>
		</div>
	);
};

const ProductsFilter = (): JSX.Element => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [brands, setBrands] = useState<string[]>([]);

	useEffect(() => {
		fetchAllCategories(setCategories);
	}, []);

	// TODO
	useEffect(() => {
		setBrands([
			"Nike",
			"Adidas",
			"Reebok",
			"Puma",
			"Under Armour",
			"New Balance",
		]);
	}, []);

	return (
		<div className="pl-6 pr-4 flex flex-col justify-start mt-10">
			<HeadingWithHr title="Categories" />
			{categories.map((category) => (
				<CategoryFilter category={category} key={category.id} />
			))}

			<HeadingWithHr title="Price" />
			<PriceFilter />

			<HeadingWithHr title="Size" />
			<SizeFilter />

			{/* <HeadingWithHr title="Colors" />

			<HeadingWithHr title="Tags" /> */}

			<HeadingWithHr title="Brand" />
			{brands.map((brand) => (
				<BrandsFilter brand={brand} key={brand} />
			))}
		</div>
	);
};

export default ProductsFilter;
