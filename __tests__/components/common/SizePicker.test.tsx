import SizePicker from "@/components/common/SizePicker";
import { colors } from "@/lib/config/constants";
import { Product, Size } from "@/lib/config/types";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockSizes: Size[] = [
	{ id: 1, name: "Small" },
	{ id: 2, name: "Medium" },
	{ id: 3, name: "Large" },
];

jest.mock("@/lib/functions/size-fetcher", () => ({
	fetchAllSizes: jest.fn((callback) => callback(mockSizes)),
}));

describe("SizePicker", () => {
	const mockProduct: Product = {
		id: 1,
		name: "Test Product",
		slug: "test-product",
		price: 100,
		brandId: 1,
		perex: "Test perex",
		sizeIds: [1, 2],
		categories: [1],
		tags: ["test"],
	};

	it("renders sizes correctly", () => {
		render(
			<SizePicker
				product={mockProduct}
				selectedSize={null}
				setSelectedSize={jest.fn()}
			/>,
		);

		mockSizes.forEach((size) => {
			expect(screen.getByText(size.name)).toBeInTheDocument();
		});
	});

	it("applies correct styles based on selection", async () => {
		const setSelectedSize = jest.fn();

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
