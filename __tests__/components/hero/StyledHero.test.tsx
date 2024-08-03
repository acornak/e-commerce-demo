import { StaticImageData } from "next/image";
import StyledHero from "@/components/hero/StyledHero";
import { render, screen } from "@testing-library/react";

jest.mock("next/image", () => ({
	__esModule: true,
	// eslint-disable-next-line react/jsx-props-no-spreading
	default: (props: any) => <img {...props} />,
}));

jest.mock("@/components/icon/ChevronRight", () => ({
	__esModule: true,
	default: () => <svg data-testid="chevron-right" />,
}));

describe("StyledHero", () => {
	const mockImage = { src: "mock-image-url" } as StaticImageData;

	it("renders correctly with given props", () => {
		render(
			<StyledHero
				image={mockImage}
				link="test-link"
				title="Test Title"
				h="h-[50vh]"
				product
			/>,
		);

		// Check if the StyledHero component is rendered
		expect(screen.getByTestId("styled-hero")).toBeInTheDocument();
	});

	it("renders the image with correct src and alt attributes", () => {
		render(
			<StyledHero
				image={mockImage}
				link="test-link"
				title="Test Title"
			/>,
		);

		const image = screen.getByAltText("Test Title hero image");
		expect(image).toHaveAttribute("src", "mock-image-url");
	});

	it("displays the title correctly", () => {
		render(
			<StyledHero
				image={mockImage}
				link="test-link"
				title="Test Title"
			/>,
		);

		const title = screen.queryAllByText("Test Title");

		expect(title.length).toBe(2);
	});

	it("renders correct links when product is true", () => {
		render(
			<StyledHero
				image={mockImage}
				link="test-link"
				title="Test Title"
				product
			/>,
		);

		// Check for Home link
		const home = screen.queryAllByText("Home");
		expect(home.length).toBe(1);

		// Check for Products link
		const products = screen.queryAllByText("Products");
		expect(products.length).toBe(1);

		// Check for title link
		const title = screen.queryAllByText("Test Title");
		expect(title.length).toBe(2);

		// Check for ChevronRightIcon
		const chevronRight = screen.queryAllByTestId("chevron-right");
		expect(chevronRight.length).toBe(2);
	});

	it("renders correct links when product is false", () => {
		render(
			<StyledHero
				image={mockImage}
				link="test-link"
				title="Test Title"
				product={false}
			/>,
		);

		// Check for Home link
		const home = screen.queryAllByText("Home");
		expect(home.length).toBe(1);

		// Check for title link
		const title = screen.queryAllByText("Test Title");
		expect(title.length).toBe(2);

		// Check for ChevronRightIcon
		const chevronRight = screen.queryAllByTestId("chevron-right");
		expect(chevronRight.length).toBe(1);

		// Check for Products link
		const products = screen.queryAllByText("Products");
		expect(products.length).toBe(0);
	});
});
