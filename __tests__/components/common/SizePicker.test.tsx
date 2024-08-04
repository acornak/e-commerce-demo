import mockProducts from "@/__mocks__/products/products.mock";
import SizePicker from "@/components/common/SizePicker";
import { colors } from "@/lib/config/constants";
import { Product, Size } from "@/lib/config/types";
import { fetchAllSizes } from "@/lib/functions/size-fetcher";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockSizes: Size[] = [
	{ id: 1, name: "Small" },
	{ id: 2, name: "Medium" },
	{ id: 3, name: "Large" },
];

jest.mock("@/lib/functions/size-fetcher", () => ({
	fetchAllSizes: jest.fn(),
}));

// Fully tested
describe("SizePicker", () => {
	const mockProduct: Product = mockProducts[0];

	it("renders sizes correctly", async () => {
		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockResolvedValue(mockSizes);

		render(
			<SizePicker
				product={mockProduct}
				selectedSize={null}
				setSelectedSize={jest.fn()}
			/>,
		);

		await waitFor(() => {
			mockSizes.forEach((size) => {
				expect(screen.getByText(size.name)).toBeInTheDocument();
			});
		});
	});

	it("logs error when fetching sizes fails", async () => {
		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockRejectedValue(new Error("Fetching sizes failed"));

		const consoleErrorMock = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		render(
			<SizePicker
				product={mockProduct}
				selectedSize={null}
				setSelectedSize={jest.fn()}
			/>,
		);

		await waitFor(() => {
			expect(consoleErrorMock).toHaveBeenCalledWith(
				"Fetching sizes failed: Error: Fetching sizes failed",
			);
		});

		consoleErrorMock.mockRestore();
	});

	it("applies correct styles based on selection", async () => {
		const setSelectedSize = jest.fn();
		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockResolvedValue(mockSizes);

		render(
			<SizePicker
				product={mockProduct}
				selectedSize={mockSizes[1]} // Medium selected
				setSelectedSize={setSelectedSize}
			/>,
		);

		await waitFor(() => {
			const mediumButton = screen.getByTestId("size-picker-2");
			const smallButton = screen.getByTestId("size-picker-1");

			// Verify selected style
			expect(mediumButton).toHaveStyle(
				`border: 1px solid ${colors.secondary}`,
			);
			expect(mediumButton).toHaveStyle(`color: ${colors.white}`);

			// Verify unselected style
			expect(smallButton).toHaveStyle(
				`border: 1px solid ${colors.black}`,
			);
			expect(smallButton).toHaveStyle(
				`background-color: ${colors.white}`,
			);
			expect(smallButton).toHaveStyle(`color: ${colors.black}`);
		});
	});

	it("updates selected size on button click", async () => {
		const setSelectedSize = jest.fn();
		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockResolvedValue(mockSizes);

		render(
			<SizePicker
				product={mockProduct}
				selectedSize={null}
				setSelectedSize={setSelectedSize}
			/>,
		);

		await waitFor(() => {
			const mediumButton = screen.getByTestId("size-picker-2");
			fireEvent.click(mediumButton);

			expect(setSelectedSize).toHaveBeenCalledWith(mockSizes[1]);
		});
	});

	it("disables buttons for sizes not available in product", async () => {
		mockProduct.sizeIds = [1, 2]; // Small and Medium available

		const mockFetchAllSizes = fetchAllSizes as jest.Mock;
		mockFetchAllSizes.mockResolvedValue(mockSizes);

		render(
			<SizePicker
				product={mockProduct}
				selectedSize={null}
				setSelectedSize={jest.fn()}
			/>,
		);

		await waitFor(() => {
			const largeButton = screen.getByTestId("size-picker-3");
			expect(largeButton).toBeDisabled();
		});
	});
});
