import React from "react";
// Testing
import { render, screen } from "@testing-library/react";
// Components
import PdfIcon from "@/components/icon/Pdf";

describe("PdfIcon", () => {
	it("renders an icon", () => {
		render(<PdfIcon />);

		const icon = screen.getByTestId("Pdficon");

		expect(icon).toBeInTheDocument();
	});
});
