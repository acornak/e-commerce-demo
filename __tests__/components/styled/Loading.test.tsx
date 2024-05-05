import StyledLoading from "@/components/styled/Loading";
import { render, screen } from "@testing-library/react";

describe("StyledLoading", () => {
	it("should render the loading correctly with default class", () => {
		render(<StyledLoading />);

		const loadingElement = screen.getByTestId("StyledLoading");
		expect(loadingElement).toBeInTheDocument();

		expect(loadingElement).toHaveClass("h-48 w-48");
	});

	it("should render the loading custom classname correctly", () => {
		render(<StyledLoading className="test-class" />);

		const loadingElement = screen.getByTestId("StyledLoading");
		expect(loadingElement).toBeInTheDocument();

		expect(loadingElement).toHaveClass("test-class");
	});

	it("should render the loading custom styles correctly", () => {
		render(
			<StyledLoading
				style={{
					width: "50%",
				}}
			/>,
		);

		const loadingElement = screen.getByTestId("StyledLoading");
		expect(loadingElement).toBeInTheDocument();

		expect(loadingElement).toHaveStyle({ width: "50%" });
	});
});
