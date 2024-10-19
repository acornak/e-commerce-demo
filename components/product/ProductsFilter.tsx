"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import { useSearchParams } from "next/navigation";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Range selector
import { Range, getTrackBackground } from "react-range";
// Functions
import { fetchAllCategories } from "@/lib/functions/category-fetcher";
import { fetchAllBrands } from "@/lib/functions/brand-fetcher";
import useFilterChange from "@/lib/hooks/url-params";
// Types and constants
import { Size, Brand, Category } from "@/lib/config/types";
import { colors } from "@/lib/config/constants";
// Icons
import { fetchAllSizes } from "@/lib/functions/size-fetcher";
import { fetchProductsMaxPrice } from "@/lib/functions/product-fetcher";
import ChevronRightIcon from "../icon/ChevronRight";
import ClearFiltersButton from "../styled/ClearFiltersButton";

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
			data-testid="filter-heading"
		>
			<h1
				className={`tracking-widest uppercase border-l-4 px-4 py-2 ${
					hovered ? "border-secondary" : "border-black"
				}`}
				data-testid="filter-heading-title"
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

	const handleFilterChange = useFilterChange();

	const [selectedCategory, setSelectedCategory] = useState<number | null>(
		null,
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
									: colors.black,
						}}
						data-testid={`category-filter-${category.id}`}
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
							data-testid={`category-filter-button-${category.id}`}
						>
							{category.name}
						</button>
					</div>
				))}
		</>
	);
};

const PriceFilter = ({ maxPrice }: { maxPrice: number }): JSX.Element => {
	const handleFilterChange = useFilterChange();
	const searchParams = useSearchParams();

	const [min, setMin] = useState<number>(0);
	const [max, setMax] = useState<number>(maxPrice);
	const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);

	useEffect(() => {
		const price = searchParams.get("price");
		if (price) {
			if (price.split("-").map(Number).length !== 2) {
				setPriceRange([0, maxPrice]);
				setMin(0);
				setMax(maxPrice);
				handleFilterChange({ page: "1", price: null }, true);
			} else {
				const [paramsMin, paramsMax] = price.split("-").map(Number);
				setPriceRange([paramsMin, paramsMax]);
			}
		}
	}, [searchParams, maxPrice]);

	useEffect(() => {
		if (min !== 0 || max !== maxPrice) {
			// istanbul ignore next
			handleFilterChange(
				{
					page: "1",
					price: `${min}-${max}`,
				},
				true,
			);
		}
	}, [min, max]);

	const handleClearFilter = () => {
		setPriceRange([0, maxPrice]);
		setMin(0);
		setMax(maxPrice);
		handleFilterChange({ page: "1", price: null }, true);
	};

	return (
		<div className="px-6">
			{maxPrice && (
				<>
					<div className="relative items-center justify-center py-10 px-2 flex h-full=">
						<Range
							step={1}
							min={0}
							max={maxPrice}
							values={priceRange}
							onChange={(values) => setPriceRange(values)}
							onFinalChange={(values) => {
								setMin(values[0]);
								setMax(values[1]);
							}}
							renderTrack={({ props, children }) => {
								return (
									<div
										// eslint-disable-next-line react/jsx-props-no-spreading
										{...props}
										data-testid="price-range"
										style={{
											...props.style,
											width: "100%",
											border: `1px solid ${colors.gray400}`,
											background: getTrackBackground({
												values: priceRange,
												colors: [
													"#FFFFFF",
													colors.secondary,
													"#FFFFFF",
												],
												min: 0,
												max: maxPrice,
											}),
										}}
										className="rounded-full h-2 w-full"
									>
										{children}
									</div>
								);
							}}
							renderThumb={({ props, index }) => {
								const { key, ...restProps } = props;
								return (
									<div
										key={key}
										// eslint-disable-next-line react/jsx-props-no-spreading
										{...restProps}
										style={{
											...props.style,
											height: "24px",
											width: "24px",
											backgroundColor: "#fff",
											border: `2px solid ${colors.gray500}`,
											borderRadius: "50%",
										}}
									>
										<div
											style={{
												position: "absolute",
												top: "-28px",
												color: "#000",
												fontSize: "12px",
												left: `calc(${
													priceRange[index] / maxPrice
												}%)`,
											}}
										>
											${priceRange[index]}
										</div>
									</div>
								);
							}}
						/>
					</div>

					<ClearFiltersButton handleClearFilter={handleClearFilter} />
				</>
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
		} else {
			setSelectedSizes([]);
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

	const handleClearFilter = () => {
		setSelectedSizes([]);
		handleFilterChange({ page: "1", size: null }, true);
	};

	return (
		<div className="px-6">
			<div className="grid grid-cols-6 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
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
				<ClearFiltersButton handleClearFilter={handleClearFilter} />
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
								: colors.black,
					}}
					data-testid={`brand-filter-title-${brand.id}`}
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
						data-testid={`brand-filter-${brand.id}`}
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
	const initialCategory = searchParams.get("category") || null;
	const initialPrice = searchParams.get("price") || null;
	const initialSizes = searchParams.get("size") || null;
	const initialBrand = searchParams.get("brand") || null;

	const [categories, setCategories] = useState<Category[]>([]);
	const [brands, setBrands] = useState<Brand[]>([]);
	const [sizes, setSizes] = useState<Size[]>([]);
	const [maxPrice, setMaxPrice] = useState<number>(0);

	useEffect(() => {
		fetchAllCategories(setCategories);
		fetchAllBrands(setBrands);
		fetchAllSizes()
			.then((res) => setSizes(res))
			.catch((error) => {
				console.error(`Fetching sizes failed: ${error}`);
			});
		fetchProductsMaxPrice(setMaxPrice);
	}, []);

	const filters = [
		{
			title: "Categories",
			component: <CategoryFilter categories={categories} />,
			initial: initialCategory,
		},
		{
			title: "Price",
			component: <PriceFilter maxPrice={maxPrice} />,
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
	}, []);

	const handleOpenedFilters = (index: number) => {
		setOpenedFilters((prev) =>
			prev.includes(index)
				? prev.filter((i) => i !== index)
				: [...prev, index],
		);
	};

	if (!brands || !sizes || !categories || maxPrice === 0) return <></>;

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
