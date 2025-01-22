import React from "react";
import Collection from "@/components/homepage/Collection";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock("next/link", () => {
	return ({ children }: { children: React.ReactNode }) => children;
});

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

jest.mock("@/components/styled/Heading", () => ({
	__esModule: true,
	StyledSectionHeading: () => <div data-testid="mock-section-heading" />,
}));

const resizeWindow = (width: number) => {
	window.innerWidth = width;
	window.dispatchEvent(new Event("resize"));
};

// Fully tested
describe("Collection", () => {
	it("renders without crashing", () => {
		render(<Collection />);
		expect(screen.getByTestId("homepage-collection")).toBeInTheDocument();
		expect(screen.getByTestId("mock-section-heading")).toBeInTheDocument();
	});

	it("should render correct number of items based on screen size", async () => {
		render(<Collection />);

		await act(async () => {
			resizeWindow(320);
		});

		await waitFor(() => {
			const images320 = screen.getAllByRole("img").filter((img) => {
				const style = window.getComputedStyle(img);
				return (
					style.display !== "none" && style.visibility !== "hidden"
				);
			});
			expect(images320.length).toBe(2);
		});

		await act(async () => {
			resizeWindow(640);
		});

		await waitFor(() => {
			const images320 = screen.getAllByRole("img").filter((img) => {
				const style = window.getComputedStyle(img);
				return (
					style.display !== "none" && style.visibility !== "hidden"
				);
			});
			expect(images320.length).toBe(3);
		});

		await act(async () => {
			resizeWindow(768);
		});

		await waitFor(() => {
			const images320 = screen.getAllByRole("img").filter((img) => {
				const style = window.getComputedStyle(img);
				return (
					style.display !== "none" && style.visibility !== "hidden"
				);
			});
			expect(images320.length).toBe(4);
		});

		await act(async () => {
			resizeWindow(1024);
		});

		await waitFor(() => {
			const images320 = screen.getAllByRole("img").filter((img) => {
				const style = window.getComputedStyle(img);
				return (
					style.display !== "none" && style.visibility !== "hidden"
				);
			});
			expect(images320.length).toBe(6);
		});
	});

	it("should cycle to the next set of items on next button click", async () => {
		render(<Collection />);

		await act(async () => {
			resizeWindow(320);
		});

		await waitFor(() => {
			expect(screen.getByText("Aviator")).toBeInTheDocument();
			expect(screen.getByText("Cat Eye")).toBeInTheDocument();
		});

		const nextButton = screen.getByTestId("collection-next-button");
		expect(nextButton).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(nextButton);
		});

		await waitFor(() => {
			expect(screen.queryByText("Aviator")).not.toBeInTheDocument();
			expect(screen.getByText("Cat Eye")).toBeInTheDocument();
			expect(screen.getByText("Rectangle")).toBeInTheDocument();
		});
	});

	it("should cycle to the previous set of items on previous button click", async () => {
		render(<Collection />);

		await act(async () => {
			resizeWindow(320);
		});

		await waitFor(() => {
			expect(screen.getByText("Aviator")).toBeInTheDocument();
			expect(screen.getByText("Cat Eye")).toBeInTheDocument();
		});

		const nextButton = screen.getByTestId("collection-next-button");
		expect(nextButton).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(nextButton);
		});

		await waitFor(() => {
			expect(screen.queryByText("Aviator")).not.toBeInTheDocument();
			expect(screen.getByText("Cat Eye")).toBeInTheDocument();
			expect(screen.getByText("Rectangle")).toBeInTheDocument();
		});

		const prevButton = screen.getByTestId("collection-previous-button");
		expect(prevButton).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(prevButton);
		});

		await waitFor(() => {
			expect(screen.getByText("Aviator")).toBeInTheDocument();
			expect(screen.getByText("Cat Eye")).toBeInTheDocument();
			expect(screen.queryByText("Rectangle")).not.toBeInTheDocument();
		});
	});

	it("should disable previous button when at the end", async () => {
		render(<Collection />);

		await act(async () => {
			resizeWindow(320);
		});

		await waitFor(() => {
			expect(screen.getByText("Aviator")).toBeInTheDocument();
			expect(screen.getByText("Cat Eye")).toBeInTheDocument();
		});

		expect(
			screen.queryByTestId("collection-previous-button"),
		).not.toBeInTheDocument();
	});

	it("should disable next button when at the end", async () => {
		render(<Collection />);

		await act(async () => {
			resizeWindow(320);
		});

		const nextButton = screen.getByTestId("collection-next-button");

		for (let i = 0; i < 4; i += 1) {
			act(() => {
				fireEvent.click(nextButton);
			});
		}

		await waitFor(() => {
			expect(
				screen.queryByTestId("collection-next-button"),
			).not.toBeInTheDocument();
		});
	});
});
