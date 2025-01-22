import React from "react";
// Next
import { useSearchParams } from "next/navigation";
// Testing
import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Functions
import { fetchAllCategories } from "@/lib/functions/category-fetcher";
import { fetchAllBrands } from "@/lib/functions/brand-fetcher";
import { fetchAllSizes } from "@/lib/functions/size-fetcher";
import { fetchProductsMaxPrice } from "@/lib/functions/product-fetcher";
import useFilterChange from "@/lib/hooks/url-params";
// Components
import ProductsFilter from "@/components/product/ProductsFilter";
// Mocks
import mockCategories from "@/__mocks__/categories/categories.mock";
import mockBrands from "@/__mocks__/brands/brands.mock";
import mockSizes from "@/__mocks__/sizes/sizes.mock";
import { MotionGlobalConfig } from "framer-motion";

MotionGlobalConfig.skipAnimations = true;

jest.mock("@/lib/functions/category-fetcher", () => ({
	fetchAllCategories: jest.fn(),
}));

jest.mock("@/lib/functions/brand-fetcher", () => ({
	fetchAllBrands: jest.fn(),
}));

jest.mock("@/lib/functions/size-fetcher", () => ({
	fetchAllSizes: jest.fn(),
}));

jest.mock("@/lib/functions/product-fetcher", () => ({
	fetchProductsMaxPrice: jest.fn(),
}));

jest.mock("@/lib/hooks/url-params", () => jest.fn());

jest.mock("next/navigation", () => ({
	useSearchParams: jest.fn(),
}));

describe("ProductsFilter Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	beforeAll(() => {
		Object.defineProperty(window, "scrollTo", {
			value: jest.fn(),
			writable: true,
		});
	});

	it("should render the products filter", async () => {
		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(useFilterChange as jest.Mock).mockImplementation(() => jest.fn());

		render(<ProductsFilter />);

		await waitFor(() => {
			expect(fetchAllCategories).toHaveBeenCalledTimes(1);
			expect(fetchAllBrands).toHaveBeenCalledTimes(1);
			expect(fetchAllSizes).toHaveBeenCalledTimes(1);
			expect(fetchProductsMaxPrice).toHaveBeenCalledTimes(1);
		});
	});

	it("should console log error when fetching all sizes fails", async () => {
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();

		(fetchAllCategories as jest.Mock).mockImplementation(() => {});
		(fetchAllBrands as jest.Mock).mockImplementation(() => {});
		(fetchAllSizes as jest.Mock).mockRejectedValue(
			new Error("Failed to fetch"),
		);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(() => {});
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(useFilterChange as jest.Mock).mockImplementation(() => jest.fn());

		render(<ProductsFilter />);

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalled();
		});
	});

	it("test hover over filter heading", async () => {
		const user = userEvent.setup();

		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(useFilterChange as jest.Mock).mockImplementation(() => jest.fn());

		render(<ProductsFilter />);

		const filterHeading = screen.queryAllByTestId("filter-heading");
		const filterHeadingTitle = screen.queryAllByTestId(
			"filter-heading-title",
		);

		await user.hover(filterHeading[0]);

		await waitFor(() => {
			expect(filterHeadingTitle[0]).toHaveClass("border-secondary");
		});

		await user.unhover(filterHeading[0]);

		await waitFor(() => {
			expect(filterHeadingTitle[0]).toHaveClass("border-black");
		});
	});

	it("expands and collapses filter sections when headings are clicked", async () => {
		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(useFilterChange as jest.Mock).mockImplementation(() => jest.fn());

		render(<ProductsFilter />);

		fireEvent.click(screen.getByText("Categories"));

		await waitFor(() => {
			expect(
				screen.getByText(mockCategories[0].name),
			).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Categories"));

		await waitFor(() => {
			expect(
				screen.queryByText(mockCategories[0].name),
			).not.toBeInTheDocument();
		});
	});

	it("updates filters when a category is selected", async () => {
		const mockHandleFilterChange = jest.fn();

		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories);
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation(() => {});
		(fetchAllSizes as jest.Mock).mockResolvedValue([]);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(useFilterChange as jest.Mock).mockImplementation(
			() => mockHandleFilterChange,
		);

		render(<ProductsFilter />);

		fireEvent.click(screen.getByText("Categories"));

		await waitFor(() => {
			expect(
				screen.getByText(mockCategories[0].name),
			).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText(mockCategories[0].name));

		expect(mockHandleFilterChange).toHaveBeenCalledWith(
			{ page: "1", category: "1" },
			true,
		);
	});

	it("updates filters when a category is unselected", async () => {
		const mockHandleFilterChange = jest.fn();

		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories);
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation(() => {});
		(fetchAllSizes as jest.Mock).mockResolvedValue([]);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("category=1"),
		);
		(useFilterChange as jest.Mock).mockImplementation(
			() => mockHandleFilterChange,
		);

		render(<ProductsFilter />);

		await waitFor(() => {
			expect(
				screen.getByText(mockCategories[0].name),
			).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText(mockCategories[0].name));

		expect(mockHandleFilterChange).toHaveBeenCalledWith(
			{ page: "1", category: null },
			true,
		);
	});

	it("renders styles when hovering over category filter button", async () => {
		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories);
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation(() => {});
		(fetchAllSizes as jest.Mock).mockResolvedValue([]);
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("category=3"),
		);
		(useFilterChange as jest.Mock).mockImplementation(() => jest.fn());

		render(<ProductsFilter />);

		const categoryButton = screen.getByTestId("category-filter-button-1");
		const categoryFilter = screen.getByTestId("category-filter-1");

		await waitFor(() => {
			expect(categoryButton).toBeInTheDocument();
			expect(categoryFilter).toBeInTheDocument();
			expect(categoryFilter).not.toHaveStyle("color: rgb(255, 99, 71);");
		});

		fireEvent.mouseEnter(categoryButton);

		expect(categoryFilter).toHaveStyle("color: rgb(255, 99, 71);");

		fireEvent.mouseLeave(categoryButton);

		expect(categoryFilter).not.toHaveStyle("color: rgb(255, 99, 71);");
	});
});

describe("ProductsFilter Component - size filter", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	beforeAll(() => {
		Object.defineProperty(window, "scrollTo", {
			value: jest.fn(),
			writable: true,
		});
	});

	it("should render the products filter", async () => {
		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(useFilterChange as jest.Mock).mockImplementation(() => jest.fn());

		render(<ProductsFilter />);

		await waitFor(() => {
			expect(fetchAllSizes).toHaveBeenCalledTimes(1);
		});

		expect(screen.getByText("Size")).toBeInTheDocument();
	});

	it("updates filters when a size is selected", async () => {
		const mockHandleFilterChange = jest.fn();

		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(useFilterChange as jest.Mock).mockImplementation(
			() => mockHandleFilterChange,
		);

		render(<ProductsFilter />);

		fireEvent.click(screen.getByText("Size"));

		await waitFor(() => {
			expect(screen.getByText(mockSizes[0].name)).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText(mockSizes[0].name));

		expect(mockHandleFilterChange).toHaveBeenCalledWith(
			{ page: "1", size: "1" },
			true,
		);

		fireEvent.click(screen.getByText(mockSizes[1].name));

		expect(mockHandleFilterChange).toHaveBeenCalledWith(
			{ page: "1", size: "1 2" },
			true,
		);
	});

	it("handles unselect selected size", async () => {
		const mockHandleFilterChange = jest.fn();

		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("size=1+2"),
		);
		(useFilterChange as jest.Mock).mockImplementation(
			() => mockHandleFilterChange,
		);

		render(<ProductsFilter />);

		await waitFor(() => {
			expect(screen.getByText(mockSizes[0].name)).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText(mockSizes[0].name));

		expect(mockHandleFilterChange).toHaveBeenCalledWith(
			{ page: "1", size: "2" },
			true,
		);

		fireEvent.click(screen.getByText(mockSizes[1].name));

		expect(mockHandleFilterChange).toHaveBeenCalledWith(
			{ page: "1", size: null },
			true,
		);
	});

	it("handles clear size filters", async () => {
		const mockHandleFilterChange = jest.fn();

		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("size=1"),
		);
		(useFilterChange as jest.Mock).mockImplementation(
			() => mockHandleFilterChange,
		);

		render(<ProductsFilter />);

		await waitFor(() => {
			expect(screen.getByText(mockSizes[0].name)).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Clear filter"));

		expect(mockHandleFilterChange).toHaveBeenCalledWith(
			{ page: "1", size: null },
			true,
		);
	});
});

describe("ProductsFilter Component - brand filter", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	beforeAll(() => {
		Object.defineProperty(window, "scrollTo", {
			value: jest.fn(),
			writable: true,
		});
	});

	it("should render the products filter", async () => {
		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(useFilterChange as jest.Mock).mockImplementation(() => jest.fn());

		render(<ProductsFilter />);

		await waitFor(() => {
			expect(fetchAllBrands).toHaveBeenCalledTimes(1);
		});

		expect(screen.getByText("Brand")).toBeInTheDocument();
	});

	it("updates filters when a brand is selected", async () => {
		const mockHandleFilterChange = jest.fn();

		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(useFilterChange as jest.Mock).mockImplementation(
			() => mockHandleFilterChange,
		);

		render(<ProductsFilter />);

		fireEvent.click(screen.getByText("Brand"));

		await waitFor(() => {
			expect(screen.getByText(mockBrands[0].name)).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText(mockBrands[0].name));

		expect(mockHandleFilterChange).toHaveBeenCalledWith(
			{ page: "1", brand: "1" },
			true,
		);

		fireEvent.click(screen.getByText(mockBrands[0].name));

		expect(mockHandleFilterChange).toHaveBeenCalledWith(
			{ page: "1", brand: null },
			true,
		);
	});

	it("handles styles when hovering over brand filter button", async () => {
		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("brand=2"),
		);
		(useFilterChange as jest.Mock).mockImplementation(() => jest.fn());

		render(<ProductsFilter />);

		const brandFilter = screen.getByTestId("brand-filter-1");
		const brandButton = screen.getByTestId("brand-filter-title-1");

		await waitFor(() => {
			expect(brandFilter).toBeInTheDocument();
			expect(brandButton).toBeInTheDocument();
			expect(brandButton).not.toHaveStyle("color: rgb(255, 99, 71);");
		});

		fireEvent.mouseEnter(brandFilter);

		expect(brandButton).toHaveStyle("color: rgb(255, 99, 71);");

		fireEvent.mouseLeave(brandFilter);

		expect(brandButton).not.toHaveStyle("color: rgb(255, 99, 71);");
	});
});

describe("ProductsFilter Component - price filter", () => {
	const originalGetBoundingClientRect =
		Element.prototype.getBoundingClientRect;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	beforeAll(() => {
		Object.defineProperty(window, "scrollTo", {
			value: jest.fn(),
			writable: true,
		});

		Element.prototype.getBoundingClientRect = jest.fn(() => ({
			width: 1000,
			height: 100,
			top: 0,
			left: 0,
			bottom: 100,
			right: 1000,
			x: 0,
			y: 0,
			toJSON: () => {},
		}));
	});

	afterAll(() => {
		Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
	});

	it("should render the products filter", async () => {
		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
		(useFilterChange as jest.Mock).mockImplementation(() => jest.fn());

		render(<ProductsFilter />);

		await waitFor(() => {
			expect(fetchProductsMaxPrice).toHaveBeenCalledTimes(1);
		});

		expect(screen.getByText("Price")).toBeInTheDocument();
	});

	it("should handle clear price filter", async () => {
		const mockHandleFilterChange = jest.fn();

		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("price=100-200"),
		);
		(useFilterChange as jest.Mock).mockImplementation(
			() => mockHandleFilterChange,
		);

		render(<ProductsFilter />);

		await waitFor(() => {
			expect(screen.getByTestId("price-range")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Clear filter"));

		expect(mockHandleFilterChange).toHaveBeenCalledWith(
			{ page: "1", price: null },
			true,
		);
	});

	it("should handle invalid url price filter", async () => {
		const mockHandleFilterChange = jest.fn();

		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("price=100-1000-10"),
		);
		(useFilterChange as jest.Mock).mockImplementation(
			() => mockHandleFilterChange,
		);

		render(<ProductsFilter />);

		await waitFor(() => {
			expect(screen.getByTestId("price-range")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Clear filter"));

		expect(mockHandleFilterChange).toHaveBeenCalledWith(
			{ page: "1", price: null },
			true,
		);
	});

	it("should call handleFilterChange when the range is changed", async () => {
		const mockHandleFilterChange = jest.fn();

		(fetchAllCategories as jest.Mock).mockImplementation(
			(setCategories) => {
				setCategories(mockCategories.slice(0, 5));
			},
		);
		(fetchAllBrands as jest.Mock).mockImplementation((setBrands) => {
			setBrands(mockBrands.slice(0, 5));
		});
		(fetchAllSizes as jest.Mock).mockResolvedValue(mockSizes.slice(0, 5));
		(fetchProductsMaxPrice as jest.Mock).mockImplementation(
			(setMaxPrice) => {
				setMaxPrice(1000);
			},
		);
		(useSearchParams as jest.Mock).mockReturnValue(
			new URLSearchParams("price=100-1000"),
		);
		(useFilterChange as jest.Mock).mockImplementation(
			() => mockHandleFilterChange,
		);

		render(<ProductsFilter />);

		await waitFor(() => {
			expect(screen.getByTestId("price-range")).toBeInTheDocument();
		});

		const thumbs = screen.getAllByRole("slider");

		expect(thumbs.length).toBe(2);

		act(() => {
			fireEvent.mouseDown(thumbs[0], { clientX: 100, clientY: 0 });
		});

		act(() => {
			fireEvent.mouseMove(thumbs[0], { clientX: 150, clientY: 0 });
		});

		act(() => {
			fireEvent.mouseUp(thumbs[0], { clientX: 150, clientY: 0 });
		});

		await waitFor(() => {
			expect(mockHandleFilterChange).toHaveBeenCalledWith(
				{ page: "1", price: "150-1000" },
				true,
			);
		});
	});
});
