import HomepageHero from "@/components/hero/HomepageHero";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

// Mock dependencies
jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

jest.mock("@/components/icon/ChevronRight", () => ({
	__esModule: true,
	default: () => <svg data-testid="chevron-right" />,
}));

jest.mock("@/components/icon/ChevronLeft", () => ({
	__esModule: true,
	default: () => <svg data-testid="chevron-left" />,
}));

// Fully tested
describe("HomepageHero", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	it("renders correctly and displays the first hero", () => {
		render(<HomepageHero />);

		// Check if the HomepageHero component is rendered
		expect(screen.getByTestId("homepage-hero")).toBeInTheDocument();
	});

	it("should cycle to the next hero on next button click", () => {
		render(<HomepageHero />);
		const nextButton = screen.getByLabelText("Go to next slide");
		fireEvent.click(nextButton);
		act(() => {
			jest.advanceTimersByTime(200);
		});
		expect(screen.getByText("Glasses for Men")).toBeInTheDocument();
	});

	it("should cycle to the previous hero on previous button click", () => {
		render(<HomepageHero />);
		const prevButton = screen.getByLabelText("Go to previous slide");
		fireEvent.click(prevButton);
		act(() => {
			jest.advanceTimersByTime(200);
		});
		expect(screen.getByText("Glasses for Children")).toBeInTheDocument();
	});

	it("should auto-cycle through heroes", () => {
		render(<HomepageHero />);
		act(() => {
			jest.advanceTimersByTime(4000);
		});
		expect(screen.getByText("Glasses for Men")).toBeInTheDocument();
		act(() => {
			jest.advanceTimersByTime(4000);
		});
		expect(screen.getByText("Glasses for Children")).toBeInTheDocument();
	});

	it("should stop auto-cycle when the document is hidden", () => {
		render(<HomepageHero />);
		act(() => {
			jest.advanceTimersByTime(2000);
		});
		expect(screen.getByText("Glasses for Women")).toBeInTheDocument();
		act(() => {
			Object.defineProperty(document, "visibilityState", {
				value: "hidden",
				writable: true,
			});
			document.dispatchEvent(new Event("visibilitychange"));
			jest.advanceTimersByTime(4000);
		});
		expect(screen.getByText("Glasses for Women")).toBeInTheDocument();
	});

	it("should resume auto-cycle when the document is visible again", () => {
		render(<HomepageHero />);
		act(() => {
			Object.defineProperty(document, "visibilityState", {
				value: "hidden",
				writable: true,
			});
			document.dispatchEvent(new Event("visibilitychange"));
			jest.advanceTimersByTime(4000);
		});
		act(() => {
			Object.defineProperty(document, "visibilityState", {
				value: "visible",
				writable: true,
			});
			document.dispatchEvent(new Event("visibilitychange"));
			jest.advanceTimersByTime(4000);
		});
		expect(screen.getByText("Glasses for Men")).toBeInTheDocument();
	});
});
