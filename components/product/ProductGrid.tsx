"use client";

import React, { useEffect, useState } from "react";
// Next
import { useSearchParams } from "next/navigation";
// Types and constants
import { Product } from "@/lib/models/product";
// Functions
import { fetchProductsPaginated } from "@/lib/functions/product-fetcher";
import useFilterChange, { scrollToAboveElement } from "@/lib/hooks/url-params";
// Components
import ProductPreview from "./ProductPreview";
import StyledLoading from "../styled/Loading";
// Icons
import ChevronRightIcon from "../icon/ChevronRight";
import ChevronLeftIcon from "../icon/ChevronLeft";
import ChevronLeftDoubleIcon from "../icon/ChevronLeftDouble";
import ChevronRightDoubleIcon from "../icon/ChevronRightDouble";

const ProductGrid = (): JSX.Element => {
	const searchParams = useSearchParams();
	const initialPage = Number(searchParams.get("page")) || 1;
	const initialCategory = Number(searchParams.get("category")) || null;
	const initialBrand = Number(searchParams.get("brand")) || null;

	const [loading, setLoading] = useState<boolean>(true);
	const handleFilterChange = useFilterChange();

	const [currentPage, setCurrentPage] = useState(initialPage);
	const [selectedCategory, setSelectedCategory] = useState<number | null>(
		initialCategory,
	);
	const [selectedBrand, setSelectedBrand] = useState<number | null>(
		initialBrand,
	);
	const [totalPages, setTotalPages] = useState(0);
	const [pageProducts, setPageProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetchProductsPaginated(
			setPageProducts,
			setTotalPages,
			currentPage,
			selectedCategory,
			selectedBrand,
			setLoading,
			16,
		);
	}, [currentPage, selectedCategory, selectedBrand]);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategory, selectedBrand]);

	useEffect((): void => {
		if (totalPages > 0 && currentPage <= totalPages) {
			handleFilterChange("page", String(currentPage));
		} else if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	useEffect((): void => {
		setSelectedCategory(Number(searchParams.get("category")) || null);
		setSelectedBrand(Number(searchParams.get("brand")) || null);
	}, [searchParams]);

	useEffect(() => {
		if (!loading) scrollToAboveElement();
	}, [currentPage, loading]);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<StyledLoading />
			</div>
		);
	}

	if (totalPages === 0 && !loading) {
		return (
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
		);
	}

	return (
		<div
			className="flex justify-center items-center text-center my-6"
			id="product-overview"
		>
			<div className="container mx-auto">
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
