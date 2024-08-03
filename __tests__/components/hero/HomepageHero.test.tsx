import HomepageHero from "@/components/hero/HomepageHero";
import { render, screen } from "@testing-library/react";

// Mock dependencies
jest.mock("next/image", () => ({
	__esModule: true,
	// eslint-disable-next-line react/jsx-props-no-spreading
	default: (props: any) => <img {...props} />,
}));

jest.mock("@/components/icon/ChevronRight", () => ({
	__esModule: true,
	default: () => <svg data-testid="chevron-right" />,
}));

jest.mock("@/components/icon/ChevronLeft", () => ({
	__esModule: true,
	default: () => <svg data-testid="chevron-left" />,
}));

describe("HomepageHero", () => {
	it("renders correctly and displays the first hero", () => {
		render(<HomepageHero />);

		// Check if the HomepageHero component is rendered
		expect(screen.getByTestId("homepage-hero")).toBeInTheDocument();
	});

	// TODO: test the carousel
});
