import {
	StyledHeroHeading,
	StyledSectionHeading,
} from "@/components/styled/Heading";
import { render, screen } from "@testing-library/react";

describe("StyledSectionHeading", () => {
	it("should render the title correctly", () => {
		render(<StyledSectionHeading title="Test Title" />);

		const titleElement = screen.getByText("Test Title");
		expect(titleElement).toBeInTheDocument();
	});

	it("should apply the default className when none is provided", () => {
		render(<StyledSectionHeading title="Test Title" />);

		const titleElement = screen.getByText("Test Title");
		expect(titleElement).toHaveClass("py-6");
	});

	it("should apply the provided className when one is provided", () => {
		render(
			<StyledSectionHeading title="Test Title" className="test-class" />,
		);

		const titleElement = screen.getByText("Test Title");
		expect(titleElement).toHaveClass("test-class");
	});
});

describe("StyledSectionHeading", () => {
	it("should render the title correctly", () => {
		render(<StyledHeroHeading title="Test Title" />);

		const titleElement = screen.getByText("Test Title");
		expect(titleElement).toBeInTheDocument();
	});

	it("should apply the default className when none is provided", () => {
		render(<StyledHeroHeading title="Test Title" />);

		const titleElement = screen.getByText("Test Title");
		expect(titleElement).toHaveClass("pb-4");
	});

	it("should apply the provided className when one is provided", () => {
		render(<StyledHeroHeading title="Test Title" className="test-class" />);

		const titleElement = screen.getByText("Test Title");
		expect(titleElement).toHaveClass("test-class");
	});
});
