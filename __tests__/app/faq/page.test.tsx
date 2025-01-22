import FAQPage from "@/app/faq/page";
import { render, screen, waitFor } from "@testing-library/react";
import { faqQuestions } from "@/lib/config/constants";
import { act } from "react-dom/test-utils";

jest.mock("@/components/hero/StyledHero", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-hero" />,
}));

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

jest.mock("@/components/common/Newsletter", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-newsletter" />,
}));

// Fully tested
describe("FAQ Page", () => {
	it("renders the FAQ page", () => {
		render(<FAQPage />);

		expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
		expect(screen.getByTestId("faq-questions")).toBeInTheDocument();
		expect(screen.getByTestId("faq-questions").children.length).toBe(
			faqQuestions.length,
		);
		expect(screen.getByTestId("mock-newsletter")).toBeInTheDocument();
		expect(screen.getByTestId("mock-styled-heading")).toBeInTheDocument();
	});

	it("handles the FAQ accordion", async () => {
		render(<FAQPage />);

		const question = screen.getByText(faqQuestions[0].question);

		expect(question).toBeInTheDocument();

		await act(async () => {
			question.click();
		});

		await waitFor(() => {
			const answer = screen.getByTestId("faq-answer-0");
			expect(answer).toBeInTheDocument();
		});
	});
});
