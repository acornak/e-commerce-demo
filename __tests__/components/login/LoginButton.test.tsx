import LoginButton from "@/components/login/LoginButton";
import { render, screen } from "@testing-library/react";

// Fully tested
describe("LoginButton", () => {
	it("renders without crashing", () => {
		render(<LoginButton onClick={() => {}}>Test</LoginButton>);
		expect(screen.getByTestId("login-button")).toBeInTheDocument();
	});

	it("renders children", () => {
		render(<LoginButton onClick={() => {}}>Test</LoginButton>);
		expect(screen.getByText("Test")).toBeInTheDocument();
	});

	it("executes onClick", () => {
		const onClick = jest.fn();
		render(<LoginButton onClick={onClick}>Test</LoginButton>);
		screen.getByTestId("login-button").click();
		expect(onClick).toHaveBeenCalled();
	});
});
