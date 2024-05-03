"use client";

import React, { useEffect, useState } from "react";
// Next
import { useRouter, useSearchParams } from "next/navigation";
// Types and constants
import { Product } from "@/lib/models/product";
// Functions
import { fetchAllProductsPaginated } from "@/lib/functions/product-fetcher";
// Components
import ProductPreview from "./ProductPreview";
import StyledLoading from "../styled/Loading";
// Icons
import ChevronRightIcon from "../icon/ChevronRight";
import ChevronLeftIcon from "../icon/ChevronLeft";
import ChevronLeftDoubleIcon from "../icon/ChevronLeftDouble";
import ChevronRightDoubleIcon from "../icon/ChevronRightDouble";

const AllProducts = (): JSX.Element => {
	const searchParams = useSearchParams();
	const initialPage = Number(searchParams.get("page")) || 1;
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(0);
	const [pageProducts, setPageProducts] = useState<Product[]>([]);
	const router = useRouter();

	const scrollToAboveElement = () => {
		const element = document.getElementById("product-overview");
		if (element) {
			const offset = 150;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	useEffect(() => {
		fetchAllProductsPaginated(
			setPageProducts,
			setTotalPages,
			currentPage,
			16,
		);
	}, [currentPage]);

	useEffect((): void => {
		if (totalPages > 0 && currentPage <= totalPages) {
			router.push(`?page=${currentPage}`, { scroll: false });
			scrollToAboveElement();
		} else if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	if (!pageProducts.length) {
		return (
			<div className="flex items-center justify-center h-screen">
				<StyledLoading />
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

				{totalPages !== 0 && (
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
							onClick={() => setCurrentPage(1)}
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
							onClick={() =>
								setCurrentPage((prev) =>
									Math.min(prev - 1, totalPages),
								)
							}
						>
							<ChevronLeftIcon size="2em" />
						</button>

						<button
							type="button"
							aria-label={`Go to page ${totalPages - 2}`}
							className={`mx-1 w-8 h-8 sm:w-14 sm:h-14 border flex items-center justify-center ${
								currentPage === totalPages ? "" : "hidden"
							}`}
							onClick={() => setCurrentPage(totalPages - 2)}
						>
							{totalPages - 2}
						</button>

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
									className={`mx-1 w-8 h-8 sm:w-14 sm:h-14 border flex items-center justify-center ${
										currentPage === page
											? "bg-secondary text-white border-secondary"
											: "border-gray-300"
									}`}
									onClick={() => setCurrentPage(page)}
								>
									{page}
								</button>
							))}
						<button
							type="button"
							aria-label="Go to page 1"
							className={`mx-1 w-8 h-8 sm:w-14 sm:h-14 border flex items-center justify-center ${
								currentPage === 1 ? "" : "hidden"
							}`}
							onClick={() => setCurrentPage(3)}
						>
							3
						</button>
						<button
							type="button"
							aria-label="Next page"
							disabled={currentPage === totalPages}
							className={`mx-1 w-8 h-8 sm:w-14 sm:h-14 border flex items-center justify-center ${
								currentPage === totalPages
									? "text-gray-400 border-gray-200"
									: "text-black border-gray-300 hover:bg-secondary hover:text-white hover:border-secondary"
							}`}
							onClick={() =>
								setCurrentPage((prev) =>
									Math.min(prev + 1, totalPages),
								)
							}
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
							onClick={() => setCurrentPage(totalPages)}
						>
							<ChevronRightDoubleIcon size="1.6em" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AllProducts;
