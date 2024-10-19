/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
// Next
import { useSearchParams } from "next/navigation";
// Testing
import {
	render,
	screen,
	waitFor,
	fireEvent,
	act,
} from "@testing-library/react";
// Functions
import {
	fetchProductsMaxPrice,
	fetchProductsPaginated,
} from "@/lib/functions/product-fetcher";
import useFilterChange from "@/lib/hooks/url-params";
// Components
import ProductGrid from "@/components/product/ProductGrid";
// Types and constants
import { sortOptions as sortOptionConstant } from "@/lib/config/constants";
// Mocks
import mockProducts from "@/__mocks__/products/products.mock";

jest.mock("@/components/product/ProductPreview", () => ({
	__esModule: true,
	default: ({ product }: any) => (
		<div data-testid="product-preview">{product.name}</div>
	),
}));

jest.mock("@/components/styled/Loading", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-spinner" />,
}));

jest.mock("@/components/styled/SortButton", () => ({
	__esModule: true,
	default: ({ sortOptions, selectedOption, setSelectedOption }: any) => (
		<select
			data-testid="sort-button"
			value={selectedOption.value}
			onChange={(e) =>
				setSelectedOption(
					sortOptions.find(
						(opt: any) => opt.value === e.target.value,
					),
				)
			}
		>
			{sortOptions.map((option: any) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	),
}));

jest.mock("@/components/styled/ClearFiltersButton", () => ({
	__esModule: true,
	default: ({ handleClearFilter, text }: any) => (
		<button
			data-testid="clear-filters-button"
			onClick={handleClearFilter}
			type="button"
		>
			{text}
		</button>
	),
}));

jest.mock("next/navigation", () => ({
	useSearchParams: jest.fn(),
}));

jest.mock("@/lib/functions/product-fetcher", () => ({
	fetchProductsMaxPrice: jest.fn(),
	fetchProductsPaginated: jest.fn(),
}));

jest.mock("@/lib/hooks/url-params", () => jest.fn());
jest.mock("@/lib/functions/scroll", () => jest.fn());

describe("ProductGrid Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("displays loading spinner while fetching data", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(() => {});

		render(<ProductGrid />);

		expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
	});

	it("displays empty state when no products are found", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice: Function) => {
				setMaxPrice(1000);
			},
		);
		(fetchProductsPaginated as jest.Mock).mockImplementation(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				_currentPage: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				setPageProducts([]);
				setTotalPages(0);
				setLoading(false);
			},
		);
		render(<ProductGrid />);

		await waitFor(() => {
			expect(screen.getByText("No products found")).toBeInTheDocument();
		});
	});

	it("displays products when data is available", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice: Function) => {
				setMaxPrice(1000);
			},
		);
		(fetchProductsPaginated as jest.Mock).mockImplementation(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				_currentPage: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				setPageProducts(mockProducts.slice(0, 2));
				setTotalPages(1);
				setLoading(false);
			},
		);
		(useFilterChange as jest.Mock).mockReturnValue(() => {});

		render(<ProductGrid />);

		await waitFor(() => {
			expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
			expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
		});
	});

	it("handles pagination controls correctly", async () => {
		const mockProductsPage1 = mockProducts.slice(0, 2);
		const mockProductsPage2 = mockProducts.slice(2, 4);

		let mockCurrentPage = 1;

		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice: Function) => {
				setMaxPrice(1000);
			},
		);
		(fetchProductsPaginated as jest.Mock).mockImplementation(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				page: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				mockCurrentPage = page;
				if (page === 1) {
					setPageProducts(mockProductsPage1);
				} else if (page === 2) {
					setPageProducts(mockProductsPage2);
				}
				setTotalPages(2);
				setLoading(false);
			},
		);
		(useFilterChange as jest.Mock).mockReturnValue(() => {});

		render(<ProductGrid />);

		await waitFor(() => {
			expect(
				screen.getByText(mockProductsPage1[0].name),
			).toBeInTheDocument();
		});

		fireEvent.click(screen.getByLabelText("Next page"));

		await waitFor(() => {
			expect(
				screen.getByText(mockProductsPage2[0].name),
			).toBeInTheDocument();
			expect(
				screen.queryByText(mockProductsPage1[0].name),
			).not.toBeInTheDocument();
		});

		fireEvent.click(screen.getByLabelText("Previous page"));

		await waitFor(() => {
			expect(
				screen.getByText(mockProductsPage1[0].name),
			).toBeInTheDocument();
			expect(
				screen.queryByText(mockProductsPage2[0].name),
			).not.toBeInTheDocument();
		});
	});

	it("handles clearing filters", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("category=1&brand=2&size=3+4&price=100-500"),
		);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice: Function) => {
				setMaxPrice(1000);
			},
		);
		(fetchProductsPaginated as jest.Mock).mockImplementation(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				_page: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				setPageProducts([]);
				setTotalPages(0);
				setLoading(false);
			},
		);
		const handleFilterChangeMock = jest.fn();
		(useFilterChange as jest.Mock).mockReturnValue(handleFilterChangeMock);

		render(<ProductGrid />);

		await waitFor(() => {
			expect(screen.getByText("No products found")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByTestId("clear-filters-button"));

		expect(handleFilterChangeMock).toHaveBeenCalledWith({
			page: "1",
			category: null,
			brand: null,
			size: null,
			price: null,
		});
	});

	it("handles URL parameters correctly", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams(
				"page=2&category=1&brand=2&size=3+4&price=100-500",
			),
		);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice: Function) => {
				setMaxPrice(1000);
			},
		);
		const fetchProductsPaginatedMock = jest.fn(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				_page: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				setPageProducts([]);
				setTotalPages(5);
				setLoading(false);
			},
		);
		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		render(<ProductGrid />);

		await waitFor(() => {
			expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				2, // currentPage from URL
				1, // selectedCategory from URL
				2, // selectedBrand from URL
				[3, 4], // selectedSizes from URL
				[100, 500], // selectedPriceRange from URL
				expect.any(Object),
				expect.any(Function),
				16,
			);
		});
	});

	it("handles incorrect price range parameter", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams(
				"page=2&category=1&brand=2&size=3+4&price=100-500-600",
			),
		);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		const fetchProductsPaginatedMock = jest.fn(/* implementation */);
		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		await act(async () => {
			render(<ProductGrid />);
		});

		await waitFor(() => {
			expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				2,
				1,
				2,
				[3, 4],
				null,
				expect.any(Object),
				expect.any(Function),
				16,
			);
		});
	});

	it("handles incorrect price range parameter", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams(
				"page=2&category=1&brand=2&size=3+4&price=100-asdf",
			),
		);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		const fetchProductsPaginatedMock = jest.fn(/* implementation */);
		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		await act(async () => {
			render(<ProductGrid />);
		});

		await waitFor(() => {
			expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				2,
				1,
				2,
				[3, 4],
				null,
				expect.any(Object),
				expect.any(Function),
				16,
			);
		});
	});

	it("handles incorrect price range parameter", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams(
				"page=2&category=1&brand=2&size=3+4&price=100-90",
			),
		);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		const fetchProductsPaginatedMock = jest.fn(/* implementation */);
		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		await act(async () => {
			render(<ProductGrid />);
		});

		await waitFor(() => {
			expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				2,
				1,
				2,
				[3, 4],
				null,
				expect.any(Object),
				expect.any(Function),
				16,
			);
		});
	});

	it("handles incorrect price range parameter", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams(
				"page=2&category=1&brand=2&size=3+4&price=100-1001",
			),
		);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		const fetchProductsPaginatedMock = jest.fn(/* implementation */);
		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		await act(async () => {
			render(<ProductGrid />);
		});

		await waitFor(() => {
			expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				2,
				1,
				2,
				[3, 4],
				[100, 1000],
				expect.any(Object),
				expect.any(Function),
				16,
			);
		});
	});

	it("handles current page > total pages", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams(
				"page=2&category=1&brand=2&size=3+4&price=100-500",
			),
		);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice: Function) => {
				setMaxPrice(1000);
			},
		);
		const fetchProductsPaginatedMock = jest.fn(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				_page: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				setPageProducts([]);
				setTotalPages(1);
				setLoading(false);
			},
		);
		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		render(<ProductGrid />);

		await waitFor(() => {
			expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				1, // currentPage from URL
				1, // selectedCategory from URL
				2, // selectedBrand from URL
				[3, 4], // selectedSizes from URL
				[100, 500], // selectedPriceRange from URL
				expect.any(Object),
				expect.any(Function),
				16,
			);
		});
	});
});

describe("ProductGrid Component - clicking events", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("handles clicking first page button", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("page=2"),
		);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice: Function) => {
				setMaxPrice(1000);
			},
		);

		let currentPage = 2;

		const fetchProductsPaginatedMock = jest.fn(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				page: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				currentPage = page;
				setPageProducts([]);
				setTotalPages(5);
				setLoading(false);
			},
		);

		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		render(<ProductGrid />);

		await waitFor(() => {
			expect(currentPage).toBe(2);
		});

		fireEvent.click(screen.getByLabelText("First page"));

		await waitFor(() => {
			expect(currentPage).toBe(1);
		});

		expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function),
			1,
			null,
			null,
			null,
			null,
			expect.any(Object),
			expect.any(Function),
			16,
		);
	});

	it("handles clicking last page button", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("page=2"),
		);

		let currentPage = 2;

		const fetchProductsPaginatedMock = jest.fn(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				page: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				currentPage = page;
				setPageProducts([]);
				setTotalPages(5);
				setLoading(false);
			},
		);

		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		render(<ProductGrid />);

		await waitFor(() => {
			expect(currentPage).toBe(2);
		});

		fireEvent.click(screen.getByLabelText("Last page"));

		await waitFor(() => {
			expect(currentPage).toBe(5);
		});

		expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function),
			5,
			null,
			null,
			null,
			null,
			expect.any(Object),
			expect.any(Function),
			16,
		);
	});

	it("handles clicking next page button", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));

		let currentPage = 1;

		const fetchProductsPaginatedMock = jest.fn(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				page: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				currentPage = page;
				setPageProducts([]);
				setTotalPages(5);
				setLoading(false);
			},
		);

		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		render(<ProductGrid />);

		await waitFor(() => {
			expect(currentPage).toBe(1);
		});

		fireEvent.click(screen.getByTestId("next-page-button"));

		await waitFor(() => {
			expect(currentPage).toBe(2);
		});

		expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function),
			2,
			null,
			null,
			null,
			null,
			expect.any(Object),
			expect.any(Function),
			16,
		);
	});

	it("handles clicking previous page button", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("page=2"),
		);

		let currentPage = 2;

		const fetchProductsPaginatedMock = jest.fn(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				page: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				currentPage = page;
				setPageProducts([]);
				setTotalPages(5);
				setLoading(false);
			},
		);

		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		render(<ProductGrid />);

		await waitFor(() => {
			expect(currentPage).toBe(2);
		});

		fireEvent.click(screen.getByTestId("previous-page-button"));

		await waitFor(() => {
			expect(currentPage).toBe(1);
		});

		expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function),
			1,
			null,
			null,
			null,
			null,
			expect.any(Object),
			expect.any(Function),
			16,
		);
	});

	it("handles clicking 2nd page button", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));

		let currentPage = 1;

		const fetchProductsPaginatedMock = jest.fn(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				page: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				currentPage = page;
				setPageProducts([]);
				setTotalPages(5);
				setLoading(false);
			},
		);

		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		render(<ProductGrid />);

		await waitFor(() => {
			expect(currentPage).toBe(1);
		});

		fireEvent.click(screen.getByTestId("page-2-button"));

		await waitFor(() => {
			expect(currentPage).toBe(2);
		});

		expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function),
			2,
			null,
			null,
			null,
			null,
			expect.any(Object),
			expect.any(Function),
			16,
		);
	});

	it("handles clicking 3rd page button", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));

		let currentPage = 1;

		const fetchProductsPaginatedMock = jest.fn(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				page: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				currentPage = page;
				setPageProducts([]);
				setTotalPages(5);
				setLoading(false);
			},
		);

		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		render(<ProductGrid />);

		await waitFor(() => {
			expect(currentPage).toBe(1);
		});

		fireEvent.click(screen.getByTestId("page-3-button"));

		await waitFor(() => {
			expect(currentPage).toBe(3);
		});

		expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function),
			3,
			null,
			null,
			null,
			null,
			expect.any(Object),
			expect.any(Function),
			16,
		);
	});

	it("handles clicking totalPages - 2 page button", async () => {
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("page=2"),
		);

		let currentPage = 2;

		const fetchProductsPaginatedMock = jest.fn(
			(
				setPageProducts: Function,
				setTotalPages: Function,
				page: number,
				_selectedCategory: number | null,
				_selectedBrand: number | null,
				_selectedSizes: number[] | null,
				_selectedPriceRange: [number, number] | null,
				_selectedSort: any,
				setLoading: Function,
				_limit: number,
			) => {
				currentPage = page;
				setPageProducts([]);
				setTotalPages(5);
				setLoading(false);
			},
		);

		(fetchProductsPaginated as jest.Mock).mockImplementation(
			fetchProductsPaginatedMock,
		);

		render(<ProductGrid />);

		await waitFor(() => {
			expect(currentPage).toBe(2);
		});

		fireEvent.click(screen.getByTestId("page-total-2-button"));

		await waitFor(() => {
			expect(currentPage).toBe(3);
		});

		expect(fetchProductsPaginatedMock).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function),
			3,
			null,
			null,
			null,
			null,
			expect.any(Object),
			expect.any(Function),
			16,
		);
	});
});
