import FAQPage from "@/app/faq/page";
import { render, screen, waitFor } from "@testing-library/react";
import { faqQuestions } from "@/lib/config/constants";
import { act } from "react-dom/test-utils";

jest.mock("@/components/hero/StyledHero", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-hero" />,
}));

describe("FAQ Page", () => {
	it("renders the FAQ page", () => {
		render(<FAQPage />);

		expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
		expect(screen.getByTestId("faq-questions")).toBeInTheDocument();
		expect(screen.getByTestId("faq-questions").children.length).toBe(
			faqQuestions.length,
		);
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
