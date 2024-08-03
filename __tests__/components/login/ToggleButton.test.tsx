import ToggleButton from "@/components/login/ToggleButton";
import { render, screen } from "@testing-library/react";

describe("ToggleButton", () => {
	it("renders without crashing", () => {
		render(<ToggleButton onClick={() => {}}>Test</ToggleButton>);
		expect(screen.getByTestId("login-toggle-button")).toBeInTheDocument();
	});

	it("renders children", () => {
		render(<ToggleButton onClick={() => {}}>Test</ToggleButton>);
		expect(screen.getByText("Test")).toBeInTheDocument();
	});

	it("executes onClick", () => {
		const onClick = jest.fn();
		render(<ToggleButton onClick={onClick}>Test</ToggleButton>);
		screen.getByTestId("login-toggle-button").click();
		expect(onClick).toHaveBeenCalled();
	});
});
