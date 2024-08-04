import { render, screen } from "@testing-library/react";
import ClearFiltersButton from "@/components/styled/ClearFiltersButton";

describe("ClearFiltersButton", () => {
	it("renders with default text", () => {
		render(<ClearFiltersButton handleClearFilter={() => {}} />);
		expect(screen.getByText("Clear filter")).toBeInTheDocument();
	});

	it("renders with custom text", () => {
		render(
			<ClearFiltersButton
				handleClearFilter={() => {}}
				text="Clear all filters"
			/>,
		);
		expect(screen.getByText("Clear all filters")).toBeInTheDocument();
	});

	it("calls handleClearFilter on click", () => {
		const handleClearFilter = jest.fn();
		render(<ClearFiltersButton handleClearFilter={handleClearFilter} />);
		screen.getByText("Clear filter").click();
		expect(handleClearFilter).toHaveBeenCalled();
	});
});
