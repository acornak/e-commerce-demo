"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import { useSearchParams } from "next/navigation";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Functions
import { fetchAllCategories } from "@/lib/functions/category-fetcher";
import { fetchAllBrands } from "@/lib/functions/brand-fetcher";
import useFilterChange from "@/lib/hooks/url-params";
// Types and constants
import { Category } from "@/lib/models/category";
import { Brand } from "@/lib/models/brand";
import { colors } from "@/lib/config/constants";
// Icons
import { Size } from "@/lib/models/size";
import { fetchAllSizes } from "@/lib/functions/size-fetcher";
import ChevronRightIcon from "../icon/ChevronRight";

type HeadingWithHrProps = {
	title: string;
	onClick: () => void;
};

const HeadingWithHr: FC<HeadingWithHrProps> = ({
	title,
	onClick,
}): JSX.Element => {
	const [hovered, setHovered] = useState<boolean>(false);

	return (
		<button
			type="button"
			className="flex items-center flex-row w-full py-2 cursor-pointer hover:text-secondary background-white "
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={onClick}
		>
			<h1
				className={`tracking-widest uppercase border-l-4 px-4 py-2 ${
					hovered ? "border-secondary" : "border-black"
				}`}
			>
				{title}
			</h1>
			<hr
				className={`flex-grow border-t my-auto ${
					hovered ? "border-secondary" : "border-gray-300"
				}`}
			/>
		</button>
	);
};

const CategoryFilter = ({
	categories,
}: {
	categories: Category[];
}): JSX.Element => {
	const searchParams = useSearchParams();
	const initialCategory = Number(searchParams.get("category")) || null;

	const handleFilterChange = useFilterChange();

	const [selectedCategory, setSelectedCategory] = useState<number | null>(
		initialCategory,
	);
	const [isHovered, setIsHovered] = useState<number | null>();

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
			{selectedPriceRanges.length > 0 && (
				<motion.button
					whileHover={{
						backgroundColor: colors.secondary,
						border: `1px solid ${colors.secondary}`,
						color: colors.white,
					}}
					whileTap={{
						backgroundColor: colors.secondary,
						border: `1px solid ${colors.secondary}`,
						color: colors.white,
					}}
					type="button"
					onClick={() => setSelectedPriceRanges([])}
					className="text-sm mt-2 px-2 py-1 border border-black"
				>
					Clear filters
				</motion.button>
			)}
		</div>
	);
};

const SizeFilter = ({ sizes }: { sizes: Size[] }): JSX.Element => {
	const searchParams = useSearchParams();
	const handleFilterChange = useFilterChange();

	const [selectedSizes, setSelectedSizes] = useState<number[]>([]);

	useEffect(() => {
		const s = searchParams.get("size");
		if (s) {
			setSelectedSizes(s.split(" ").map(Number));
		}
	}, [searchParams]);

	const handleSizeClick = (size: number) => {
		const updatedSizes = selectedSizes.includes(size)
			? selectedSizes.filter((s) => s !== size)
			: [...selectedSizes, size];
		setSelectedSizes(updatedSizes);
		handleFilterChange(
			{
				page: "1",
				size:
					updatedSizes.length > 0
						? updatedSizes.sort().join(" ")
						: null,
			},
			true,
		);
	};

	const handleClearFilters = () => {
		setSelectedSizes([]);
		handleFilterChange({ page: "1", size: null }, true);
	};

	return (
		<div className="px-6">
			<div className="grid grid-cols-6 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{sizes.map((size) => (
					<motion.div
						key={size.id}
						whileHover={{
							backgroundColor: colors.secondary,
							color: colors.white,
						}}
						className="cursor-pointer p-2 text-sm tracking-widest text-center"
						onClick={() => handleSizeClick(size.id)}
						style={{
							border: selectedSizes.includes(size.id)
								? "1px solid #FF6347"
								: "1px solid black",
							backgroundColor: selectedSizes.includes(size.id)
								? colors.secondary
								: colors.white,
							color: selectedSizes.includes(size.id)
								? colors.white
								: colors.black,
						}}
					>
						<div className="h-full flex items-center justify-center">
							{size.name}
						</div>
					</motion.div>
				))}
			</div>
			{selectedSizes.length > 0 && (
				<motion.button
					whileHover={{
						backgroundColor: colors.secondary,
						border: `1px solid ${colors.secondary}`,
						color: colors.white,
					}}
					whileTap={{
						backgroundColor: colors.secondary,
						border: `1px solid ${colors.secondary}`,
						color: colors.white,
					}}
					type="button"
					onClick={handleClearFilters}
					className="text-sm mt-2 px-2 py-1 border border-black"
				>
					Clear filters
				</motion.button>
			)}
		</div>
	);
};

const BrandsFilter = ({ brands }: { brands: Brand[] }): JSX.Element => {
	const [isHovered, setIsHovered] = useState<number | null>(null);
	const searchParams = useSearchParams();
	const initialBrand = Number(searchParams.get("brand")) || null;
	const [selectedBrand, setSelectedBrand] = useState<number | null>(
		initialBrand,
	);

	const handleFilterChange = useFilterChange();

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

const ProductsFilter = (): JSX.Element => {
	const searchParams = useSearchParams();
	const initialCategory = Number(searchParams.get("category")) || null;
	const initialPrice = searchParams.get("price") || null;
	const initialSizes = searchParams.get("size") || null;
	const initialBrand = Number(searchParams.get("brand")) || null;

	const [categories, setCategories] = useState<Category[]>([]);
	const [brands, setBrands] = useState<Brand[]>([]);
	const [sizes, setSizes] = useState<Size[]>([]);

	useEffect(() => {
		fetchAllCategories(setCategories);
		fetchAllBrands(setBrands);
		fetchAllSizes(setSizes);
	}, []);

	const filters = [
		{
			title: "Categories",
			component: <CategoryFilter categories={categories} />,
			initial: initialCategory,
		},
		{
			title: "Price",
			component: <PriceFilter />,
			initial: initialPrice,
		},
		{
			title: "Size",
			component: <SizeFilter sizes={sizes} />,
			initial: initialSizes,
		},
		{
			title: "Brand",
			component: <BrandsFilter brands={brands} />,
			initial: initialBrand,
		},
	];

	const [openedFilters, setOpenedFilters] = useState<number[]>([]);

	useEffect(() => {
		const initialFilters = filters
			.map((filter, index) => (filter.initial ? index : null))
			.filter((index) => index !== null) as number[];
		setOpenedFilters(initialFilters);
	}, [filters]);

	const handleOpenedFilters = (index: number) => {
		setOpenedFilters((prev) =>
			prev.includes(index)
				? prev.filter((i) => i !== index)
				: [...prev, index],
		);
	};

	if (!brands || !sizes || !categories) return <></>;

	return (
		<div className="pl-6 pr-4 flex flex-col justify-start mt-10 py-6">
			{filters.map((filter, index) => (
				<div key={filter.title}>
					<HeadingWithHr
						title={filter.title}
						onClick={() => handleOpenedFilters(index)}
					/>

					<AnimatePresence>
						{openedFilters.includes(index) && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.5 }}
								className="overflow-hidden"
							>
								{filter.component}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			))}
		</div>
	);
};

export default ProductsFilter;
