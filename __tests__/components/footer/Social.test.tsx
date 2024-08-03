import Social from "@/components/footer/Social";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock("@/components/footer/InstagramImages", () => ({
	__esModule: true,
	default: ({
		firstImage,
		imageCount,
		handleNext,
		handlePrevious,
	}: {
		firstImage: number;
		imageCount: number;
		handleNext: () => void;
		handlePrevious: () => void;
	}) => (
		<div
			data-testid="mock-instagram-images"
			data-first-image={firstImage}
			data-image-count={imageCount}
		>
			<button
				type="button"
				onClick={handlePrevious}
				data-testid="handle-previous"
			>
				Previous
			</button>
			<button
				type="button"
				onClick={handleNext}
				data-testid="handle-next"
			>
				Next
			</button>
		</div>
	),
}));

describe("Social", () => {
	it("renders without crashing", () => {
		render(<Social />);

		const social = screen.getByTestId("social-footer");
		expect(social).toBeInTheDocument();
	});

	it("handles next and previous buttons correctly", async () => {
		render(<Social />);

		const previousButton = screen.queryAllByTestId("handle-previous");
		const nextButton = screen.queryAllByTestId("handle-next");

		// Simulate clicking the Next button
		await act(async () => {
			fireEvent.click(nextButton[0]);
		});

		await waitFor(() => {
			const images = screen.queryAllByTestId("mock-instagram-images");
			expect(images[0]).toHaveAttribute("data-first-image", "1");
		});

		// Simulate clicking the Previous
		await act(async () => {
			fireEvent.click(previousButton[0]);
		});

		await waitFor(() => {
			const images = screen.queryAllByTestId("mock-instagram-images");
			expect(images[0]).toHaveAttribute("data-first-image", "0");
		});
	});
});
