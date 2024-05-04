"use client";

import React, { useEffect, useState } from "react";
// Next
import { useSearchParams } from "next/navigation";
// Animations
import { motion } from "framer-motion";
// Functions
import { fetchAllCategories } from "@/lib/functions/category-fetcher";
import { fetchAllBrands } from "@/lib/functions/brand-fetcher";
import useFilterChange from "@/lib/hooks/url-params";
// Types and constants
import { Category } from "@/lib/models/category";
import { Brand } from "@/lib/models/brand";
import { colors } from "@/lib/config/constants";
// Icons
import ChevronRightIcon from "../icon/ChevronRight";

const HeadingWithHr = ({ title }: { title: string }): JSX.Element => (
	<div className="flex items-center flex-row w-full py-2">
		<h1 className="tracking-widest uppercase border-l-4 border-black px-4 py-2">
			{title}
		</h1>
		<hr className="flex-grow border-t border-gray-300 my-auto" />
	</div>
);

const CategoryFilter = (): JSX.Element => {
	const searchParams = useSearchParams();
	const initialCategory = Number(searchParams.get("category")) || null;

	const handleFilterChange = useFilterChange();

	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<number | null>(
		initialCategory,
	);
	const [isHovered, setIsHovered] = useState<number | null>();

	useEffect(() => {
		fetchAllCategories(setCategories);
	}, []);

	useEffect(() => {
		setSelectedCategory(Number(searchParams.get("category")) || null);
	}, [searchParams]);

	const handleCategoryChange = (categoryId: number) => {
		if (selectedCategory === categoryId) {
			setSelectedCategory(null);
			handleFilterChange({ page: "1", category: null }, true);
		} else {
			setSelectedCategory(categoryId);
			handleFilterChange(
				{ page: "1", category: String(categoryId) },
				true,
			);
		}
	};

	return (
		<>
			{categories &&
				categories.map((category: Category) => (
					<div
						key={category.id}
						className="flex items-center text-sm py-1 tracking-wider"
						style={{
							color:
								isHovered === category.id ||
								selectedCategory === category.id
									? colors.secondary
									: "initial",
						}}
					>
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							animate={
								isHovered === category.id ||
								selectedCategory === category.id
									? { opacity: 1, x: 0 }
									: { opacity: 0, x: -10 }
							}
							transition={{ duration: 0.2 }}
						>
							<ChevronRightIcon size="1.5em" />
						</motion.div>
						<button
							type="button"
							className="cursor-pointer"
							onMouseEnter={() => setIsHovered(category.id)}
							onMouseLeave={() => setIsHovered(null)}
							onClick={() => handleCategoryChange(category.id)}
						>
							{category.name}
						</button>
					</div>
				))}
		</>
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
			<div className="grid grid-cols-6 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

const BrandsFilter = (): JSX.Element => {
	const [isHovered, setIsHovered] = useState<number | null>(null);
	const [brands, setBrands] = useState<Brand[]>([]);

	const searchParams = useSearchParams();
	const initialBrand = Number(searchParams.get("brand")) || null;

	const [selectedBrand, setSelectedBrand] = useState<number | null>(
		initialBrand,
	);

	const handleFilterChange = useFilterChange();

	useEffect(() => {
		fetchAllBrands(setBrands);
	}, []);

	useEffect(() => {
		setSelectedBrand(Number(searchParams.get("brand") || null));
	}, [searchParams]);

	const handleBrandChange = (brandId: number) => {
		if (selectedBrand === brandId) {
			setSelectedBrand(null);
			handleFilterChange({ page: "1", brand: null }, true);
		} else {
			setSelectedBrand(brandId);
			handleFilterChange({ page: "1", brand: brandId.toString() }, true);
		}
	};

	return (
		<>
			{brands.map((brand) => (
				<button
					type="button"
					key={brand.id}
					className="flex items-center text-sm py-1 tracking-wider"
					style={{
						color:
							isHovered === brand.id || selectedBrand === brand.id
								? colors.secondary
								: "initial",
					}}
					onClick={() => handleBrandChange(brand.id)}
				>
					<motion.div
						initial={{ opacity: 0, x: -10 }}
						animate={
							isHovered === brand.id || selectedBrand === brand.id
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: -10 }
						}
						transition={{ duration: 0.2 }}
					>
						<ChevronRightIcon size="1.5em" />
					</motion.div>
					<p
						className="cursor-pointer"
						onMouseEnter={() => setIsHovered(brand.id)}
						onMouseLeave={() => setIsHovered(null)}
					>
						{brand.name}
					</p>
				</button>
			))}
		</>
	);
};

const ProductsFilter = (): JSX.Element => (
	<div className="pl-6 pr-4 flex flex-col justify-start mt-10 py-6">
		<HeadingWithHr title="Categories" />
		<CategoryFilter />

		<HeadingWithHr title="Price" />
		<PriceFilter />

		<HeadingWithHr title="Size" />
		<SizeFilter />

		{/* <HeadingWithHr title="Colors" />

			<HeadingWithHr title="Tags" /> */}

		<HeadingWithHr title="Brand" />
		<BrandsFilter />
	</div>
);

export default ProductsFilter;
