import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SortButton from "@/components/styled/SortButton";
import { SortOption } from "@/lib/config/types";

const sortOptions: SortOption[] = [
	{ label: "Name", value: "name", sortFunc: jest.fn() },
	{ label: "Date", value: "date", sortFunc: jest.fn() },
];

const setSelectedOption = jest.fn();

describe("SortButton", () => {
	it("should render the selected option label", () => {
		render(
			<SortButton
				sortOptions={sortOptions}
				selectedOption={sortOptions[0]}
				setSelectedOption={setSelectedOption}
			/>,
		);

		expect(screen.getByText(sortOptions[0].label)).toBeInTheDocument();
	});

	it("should toggle the dropdown", async () => {
		render(
			<SortButton
				sortOptions={sortOptions}
				selectedOption={sortOptions[1]}
				setSelectedOption={setSelectedOption}
			/>,
		);

		// Open the dropdown
		const button = screen.getByRole("button");
		fireEvent.click(button);

		// Ensure the selected option is displayed
		const selectedOption = screen.getByTestId("selected-option");
		expect(selectedOption).toBeInTheDocument();
		expect(selectedOption).toHaveTextContent(sortOptions[1].label);

		// Ensure the dropdown is visible
		const dropdown = screen.getByTestId("sort-options");
		expect(dropdown).toBeInTheDocument();

		// Click outside of the dropdown
		fireEvent.mouseDown(document);

		// Wait for the dropdown to be hidden
		await waitFor(() => {
			expect(dropdown).not.toBeInTheDocument();
		});
	});

	it("should call setSelectedOption with the correct option when an option is clicked", async () => {
		render(
			<SortButton
				sortOptions={sortOptions}
				selectedOption={sortOptions[0]}
				setSelectedOption={setSelectedOption}
			/>,
		);

		// Click the button to open the dropdown
		const button = screen.getByRole("button");
		fireEvent.click(button);

		// Ensure the dropdown is visible
		const dropdown = screen.getByTestId("sort-options");
		expect(dropdown).toBeInTheDocument();

		// Click the option
		const option = screen.getByTestId(
			`sort-option-${sortOptions[1].value}`,
		);
		fireEvent.click(option);

		// Wait for the dropdown to be removed from the DOM
		await waitFor(() => {
			expect(dropdown).not.toBeInTheDocument();
		});

		// Check that setSelectedOption was called with the correct option
		expect(setSelectedOption).toHaveBeenCalledWith({
			value: "date",
			label: "Date",
			sortFunc: expect.any(Function),
		});
	});
});
