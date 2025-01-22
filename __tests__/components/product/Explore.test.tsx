import React from "react";
// Testing
import { render, screen, waitFor } from "@testing-library/react";
// Components
import Explore from "@/components/product/Explore";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "framer-motion";

MotionGlobalConfig.skipAnimations = true;

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

describe("Explore", () => {
	it("should render the explore page", () => {
		render(<Explore />);

		expect(screen.getByText("Explore new arrivals")).toBeInTheDocument();
	});

	it("should handle the hover effects", async () => {
		const user = userEvent.setup();

		render(<Explore />);

		const image = screen.getByTestId("explore-image-0");
		const image1 = screen.getByTestId("explore-image-1");

		await user.hover(image);

		await waitFor(() => {
			expect(image).not.toHaveStyle("transform: none;");
			expect(image1).toHaveStyle("transform: none;");
		});

		await user.unhover(image);
		await waitFor(() => {
			expect(image).toHaveStyle("transform: none;");
			expect(image1).toHaveStyle("transform: none;");
		});

		await user.hover(image1);
		await waitFor(() => {
			expect(image).toHaveStyle("transform: none;");
			expect(image1).not.toHaveStyle("transform: none;");
		});

		await user.unhover(image1);

		await waitFor(() => {
			expect(image).toHaveStyle("transform: none;");
			expect(image1).toHaveStyle("transform: none;");
		});
	});
});
