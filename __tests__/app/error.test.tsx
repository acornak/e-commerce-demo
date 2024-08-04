import ErrorPage from "@/app/error";
import { fireEvent, render, screen } from "@testing-library/react";

// Fully tested
describe("Error Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should display the error message and try again button", () => {
		const error: Error = new Error("Test error") as Error;
		const resetMock = jest.fn();

		render(<ErrorPage error={error} reset={resetMock} />);

		expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /try again/i }),
		).toBeInTheDocument();
	});

	it("should call reset function when try again button is clicked", () => {
		const error = new Error("Test error");
		const resetMock = jest.fn();

		render(<ErrorPage error={error} reset={resetMock} />);

		const tryAgainButton = screen.getByRole("button", {
			name: /try again/i,
		});
		fireEvent.click(tryAgainButton);

		expect(resetMock).toHaveBeenCalledTimes(1);
	});

	it("should log the error using console.error", () => {
		const error = new Error("Test error");
		const resetMock = jest.fn();
		const consoleErrorMock = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		render(<ErrorPage error={error} reset={resetMock} />);

		expect(consoleErrorMock).toHaveBeenCalledWith(error);

		consoleErrorMock.mockRestore();
	});
});
