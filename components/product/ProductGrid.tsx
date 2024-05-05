"use client";

import React, { useEffect, useState } from "react";
// Next
import { useSearchParams } from "next/navigation";
// Types and constants
import { sortOptions } from "@/lib/config/constants";
import { Product } from "@/lib/models/product";
import { SortOption } from "@/lib/config/types";
// Functions
import {
	fetchProductsMaxPrice,
	fetchProductsPaginated,
} from "@/lib/functions/product-fetcher";
import useFilterChange from "@/lib/hooks/url-params";
import scrollToAboveElement from "@/lib/functions/scroll";
// Components
import ProductPreview from "./ProductPreview";
import StyledLoading from "../styled/Loading";
import SortButton from "../styled/SortButton";
import ClearFiltersButton from "../styled/ClearFiltersButton";
// Icons
import ChevronRightIcon from "../icon/ChevronRight";
import ChevronLeftIcon from "../icon/ChevronLeft";
import ChevronLeftDoubleIcon from "../icon/ChevronLeftDouble";
import ChevronRightDoubleIcon from "../icon/ChevronRightDouble";

const ProductGrid = (): JSX.Element => {
	const searchParams = useSearchParams();

	const [loading, setLoading] = useState<boolean>(true);
	const [urlParamsHandled, setUrlParamsHandled] = useState<boolean>(false);
	const handleFilterChange = useFilterChange();

	const [maxPrice, setMaxPrice] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedCategory, setSelectedCategory] = useState<number | null>(
		null,
	);
	const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
	const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
	const [selectedPriceRange, setSelectedPriceRange] = useState<
		[number, number] | null
	>(null);
	const [totalPages, setTotalPages] = useState(0);
	const [pageProducts, setPageProducts] = useState<Product[]>([]);
	const [selectedSort, setSelectedSort] = useState<SortOption>(
		sortOptions[0],
	);

	useEffect(() => {
		fetchProductsMaxPrice(setMaxPrice);
	}, []);

	useEffect(() => {
		if (maxPrice > 0 && urlParamsHandled) {
			fetchProductsPaginated(
				setPageProducts,
				setTotalPages,
				currentPage,
				selectedCategory,
				selectedBrand,
				selectedSizes.length > 0 ? selectedSizes : null,
				selectedPriceRange,
				selectedSort,
				setLoading,
				16,
			);
		}
	}, [
		currentPage,
		selectedCategory,
		selectedBrand,
		selectedSizes,
		selectedPriceRange,
		selectedSort,
		maxPrice,
		urlParamsHandled,
	]);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedSort]);

	useEffect((): void => {
		if (maxPrice === 0) return;

		setCurrentPage(Number(searchParams.get("page")) || 1);
		setSelectedCategory(Number(searchParams.get("category")) || null);
		setSelectedBrand(Number(searchParams.get("brand")) || null);

		const sizes = searchParams.get("size");
		if (sizes) {
			setSelectedSizes(sizes.split(" ").map(Number));
		} else {
			setSelectedSizes([]);
		}

		const price = searchParams.get("price");
		if (price) {
			const splittedPrice = price.split("-");
			if (splittedPrice.length !== 2) {
				setSelectedPriceRange(null);
				return;
			}
			const min = Number(splittedPrice[0]);
			const max = Number(splittedPrice[1]);
			if (Number.isNaN(min) || Number.isNaN(max)) {
				console.log(min, max);
				setSelectedPriceRange(null);
			} else if (min > max || min === max) {
				setSelectedPriceRange(null);
			} else if (max > maxPrice) {
				setSelectedPriceRange([min, maxPrice]);
			} else {
				setSelectedPriceRange([min, max]);
			}
		} else {
			setSelectedPriceRange(null);
		}

		setUrlParamsHandled(true);
	}, [searchParams, maxPrice]);

	useEffect((): void => {
		if (totalPages > 0 && currentPage <= totalPages) {
			handleFilterChange({
				page: String(currentPage),
				category: selectedCategory ? String(selectedCategory) : null,
				brand: selectedBrand ? String(selectedBrand) : null,
				size:
					selectedSizes
						.filter((size) => !Number.isNaN(size))
						.join(" ") || null,
				price: selectedPriceRange ? selectedPriceRange.join("-") : null,
			});
		} else if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(totalPages);
		}
	}, [
		currentPage,
		totalPages,
		selectedCategory,
		selectedBrand,
		selectedSizes,
		selectedPriceRange,
	]);

	useEffect(() => {
		if (!loading) scrollToAboveElement("product-overview");
	}, [currentPage, loading]);

	const handleClearAllFilters = (): void => {
		handleFilterChange({
			page: "1",
			category: null,
			brand: null,
			size: null,
			price: null,
		});
	};

	const showClearAllFilters = (): boolean => {
		return (
			selectedCategory !== null ||
			selectedBrand !== null ||
			selectedSizes.length > 0 ||
			selectedPriceRange !== null
		);
	};

	if (loading) {
		return (
			<div className="my-6 px-10" id="product-overview">
				{showClearAllFilters() && (
					<ClearFiltersButton
						handleClearFilter={handleClearAllFilters}
						text="Clear all filters"
					/>
				)}
				<div className="flex items-center justify-center h-screen">
					<StyledLoading />
				</div>
			</div>
		);
	}

	if (totalPages === 0 && !loading) {
		return (
			<div className="my-6" id="product-overview">
				<div className="flex px-10">
					<ClearFiltersButton
						handleClearFilter={handleClearAllFilters}
						text="Clear all filters"
					/>
				</div>
				<div
					className="flex flex-col items-center justify-center py-10 lg:pt-32"
					id="product-overview"
				>
					<h1 className="text-xl uppercase tracking-widest">
						No products found
					</h1>
					<p className="text-gray-400 pt-6">
						Try different filter settings.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className="flex justify-center items-center text-center my-6"
			id="product-overview"
		>
			<div className="container mx-auto">
				<div className="flex w-full px-16 items-center">
					<div style={{ flex: showClearAllFilters() ? "none" : "1" }}>
						{showClearAllFilters() && (
							<ClearFiltersButton
								handleClearFilter={handleClearAllFilters}
								text="Clear all filters"
							/>
						)}
					</div>
					<div className="flex-grow">
						<SortButton
							sortOptions={sortOptions}
							selectedOption={selectedSort}
							setSelectedOption={setSelectedSort}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 mx-4">
					{pageProducts.map((product: Product) => (
						<ProductPreview
							// TODO: remove with live data
							key={product.id + Math.random() * 46656}
							product={product}
						/>
					))}
				</div>

				{totalPages > 1 && (
					<div className="flex justify-center mt-10">
						<button
							type="button"
							aria-label="First page"
							disabled={currentPage === 1}
							className={`mx-1 w-8 h-8 sm:w-14 sm:h-14 border flex items-center justify-center ${
								currentPage === 1
									? "text-gray-400 border-gray-200"
									: "text-black border-gray-300 hover:bg-secondary hover:text-white hover:border-secondary"
							}`}
							onClick={() => {
								setCurrentPage(1);
							}}
						>
							<ChevronLeftDoubleIcon size="1.6em" />
						</button>
						<button
							type="button"
							aria-label="Previous page"
							disabled={currentPage === 1}
							className={`mx-1 w-8 h-8 sm:w-14 sm:h-14 border flex items-center justify-center ${
								currentPage === 1
									? "text-gray-400 border-gray-200"
									: "text-black border-gray-300 hover:bg-secondary hover:text-white hover:border-secondary"
							}`}
							onClick={() => {
								setCurrentPage((prev) =>
									Math.min(prev - 1, totalPages),
								);
							}}
						>
							<ChevronLeftIcon size="2em" />
						</button>

						{totalPages > 2 && (
							<button
								type="button"
								aria-label={`Go to page ${totalPages - 2}`}
								className={`mx-1 w-8 h-8 sm:w-14 sm:h-14 border flex items-center justify-center hover:bg-secondary hover:text-white ${
									currentPage === totalPages ? "" : "hidden"
								}`}
								onClick={() => {
									setCurrentPage(totalPages - 2);
								}}
							>
								{totalPages - 2}
							</button>
						)}

						{Array.from(
							{ length: 3 },
							(_, i) => currentPage - 1 + i,
						)
							.filter((page) => page >= 1 && page <= totalPages)
							.map((page) => (
								<button
									key={page}
									type="button"
									aria-label={`Go to page ${page}`}
									className={`mx-1 w-8 h-8 sm:w-14 sm:h-14 border flex items-center justify-center hover:bg-secondary hover:text-white ${
										currentPage === page
											? "bg-secondary text-white border-secondary"
											: "border-gray-300"
									}`}
									onClick={() => {
										setCurrentPage(page);
									}}
								>
									{page}
								</button>
							))}
						{totalPages > 2 && (
							<button
								type="button"
								aria-label="Go to page 3"
								className={`mx-1 w-8 h-8 sm:w-14 sm:h-14 border flex items-center justify-center hover:bg-secondary hover:text-white ${
									currentPage === 1 ? "" : "hidden"
								}`}
								onClick={() => {
									setCurrentPage(3);
								}}
							>
								3
							</button>
						)}
						<button
							type="button"
							aria-label="Next page"
							disabled={currentPage === totalPages}
							className={`mx-1 w-8 h-8 sm:w-14 sm:h-14 border flex items-center justify-center ${
								currentPage === totalPages
									? "text-gray-400 border-gray-200"
									: "text-black border-gray-300 hover:bg-secondary hover:text-white hover:border-secondary"
							}`}
							onClick={() => {
								setCurrentPage((prev) =>
									Math.min(prev + 1, totalPages),
								);
							}}
						>
							<ChevronRightIcon size="2em" />
						</button>
						<button
							type="button"
							aria-label="Last page"
							disabled={currentPage === totalPages}
							className={`mx-3 sm:mx-1 w-8 h-8 sm:w-14 sm:h-14 border flex items-center justify-center ${
								currentPage === totalPages
									? "text-gray-400 border-gray-200"
									: "text-black border-gray-300 hover:bg-secondary hover:text-white hover:border-secondary"
							}`}
							onClick={() => {
								setCurrentPage(totalPages);
							}}
						>
							<ChevronRightDoubleIcon size="1.6em" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductGrid;
