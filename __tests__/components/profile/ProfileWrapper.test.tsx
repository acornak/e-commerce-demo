import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import ProfileWrapper from "@/components/profile/ProfileWrapper";

describe("ProfileWrapper Component", () => {
	it("renders with default width and displays heading and children", () => {
		render(
			<ProfileWrapper heading="Test Heading">
				<div>Test Children</div>
			</ProfileWrapper>,
		);

		expect(screen.getByText("Test Heading")).toBeInTheDocument();

		expect(screen.getByText("Test Children")).toBeInTheDocument();

		const containerDiv = screen.getByTestId("profile-wrapper");
		expect(containerDiv).toHaveClass("w-full md:w-2/3");
	});

	it("renders with custom width", () => {
		render(
			<ProfileWrapper heading="Custom Width Heading" width="w-1/2">
				<div>Test Children</div>
			</ProfileWrapper>,
		);

		const containerDiv = screen.getByTestId("profile-wrapper");
		expect(containerDiv).toHaveClass("w-1/2");
	});

	it("applies correct classNames and structure", () => {
		render(
			<ProfileWrapper heading="Class Names Test">
				<div>Test Children</div>
			</ProfileWrapper>,
		);

		const containerDiv = screen.getByTestId("profile-wrapper");
		expect(containerDiv).toHaveClass(
			"flex",
			"flex-col",
			"items-center",
			"justify-center",
		);

		const headingElement = screen.getByText("Class Names Test");
		expect(headingElement).toHaveClass(
			"text-xl",
			"tracking-wider",
			"border-b",
			"border-secondary",
			"mb-4",
		);

		const innerDiv = screen.getByText("Test Children").parentElement;
		expect(innerDiv).toHaveClass("w-full", "px-10");
	});
});
