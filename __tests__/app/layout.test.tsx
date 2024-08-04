import React from "react";
import RootLayout from "@/app/layout";
import { render, screen } from "@testing-library/react";

jest.mock("@vercel/analytics/react", () => ({
	Analytics: jest.fn(() => <div>Analytics Mock</div>),
}));

jest.mock("@/components/wrapper/LayoutWrapper", () => ({
	__esModule: true,
	default: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}));

// Fully tested
describe("Layout", () => {
	it("renders the layout", () => {
		render(
			<RootLayout>
				<div data-testid="layout">Layout</div>
			</RootLayout>,
		);

		expect(screen.getByTestId("layout")).toBeInTheDocument();
	});
});
