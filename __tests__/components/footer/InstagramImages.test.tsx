import InstagramImages from "@/components/footer/InstagramImages";
import { fireEvent, render, screen } from "@testing-library/react";

const mockHandleNext = jest.fn();
const mockHandlePrevious = jest.fn();

// Fully tested
describe("InstagramImages", () => {
	it("renders the correct number of images based on firstImage and imageCount", () => {
		render(
			<InstagramImages
				firstImage={0}
				imageCount={4}
				handleNext={mockHandleNext}
				handlePrevious={mockHandlePrevious}
			/>,
		);

		const imageElements = screen.getAllByAltText("Instagram post");
		expect(imageElements.length).toBe(4);
	});

	it('calls handleNext when the "Next" button is clicked', () => {
		render(
			<InstagramImages
				firstImage={0}
				imageCount={4}
				handleNext={mockHandleNext}
				handlePrevious={mockHandlePrevious}
			/>,
		);

		const nextButton = screen.getByLabelText("Next Instagram image");
		fireEvent.click(nextButton);
		expect(mockHandleNext).toHaveBeenCalled();
	});

	it('calls handlePrevious when the "Previous" button is clicked', () => {
		render(
			<InstagramImages
				firstImage={1}
				imageCount={4}
				handleNext={mockHandleNext}
				handlePrevious={mockHandlePrevious}
			/>,
		);

		const previousButton = screen.getByLabelText(
			"Previous Instagram image",
		);
		fireEvent.click(previousButton);
		expect(mockHandlePrevious).toHaveBeenCalled();
	});

	it('does not render the "Previous" button when firstImage is 0', () => {
		render(
			<InstagramImages
				firstImage={0}
				imageCount={4}
				handleNext={mockHandleNext}
				handlePrevious={mockHandlePrevious}
			/>,
		);

		expect(screen.queryByLabelText("Previous Instagram image")).toBeNull();
	});

	it('does not render the "Next" button when there are no more images to show', () => {
		render(
			<InstagramImages
				firstImage={5}
				imageCount={4}
				handleNext={mockHandleNext}
				handlePrevious={mockHandlePrevious}
			/>,
		);

		expect(screen.queryByLabelText("Next Instagram image")).toBeNull();
	});
});
