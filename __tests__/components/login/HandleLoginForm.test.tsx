import HandleLoginForm from "@/components/login/HandleLoginForm";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/login/RegisterForm", () => ({
	__esModule: true,
	default: () => <div data-testid="register-form" />,
}));

jest.mock("@/components/login/LoginForm", () => ({
	__esModule: true,
	default: () => <div data-testid="login-form" />,
}));

describe("HandleLoginForm", () => {
	it("renders RegisterForm when showRegister is true", () => {
		render(<HandleLoginForm showRegister setShowRegister={jest.fn()} />);

		expect(screen.getByTestId("register-form")).toBeInTheDocument();
		expect(screen.queryByTestId("login-form")).not.toBeInTheDocument();
	});

	it("renders LoginForm when showRegister is false", () => {
		render(
			<HandleLoginForm
				showRegister={false}
				setShowRegister={jest.fn()}
			/>,
		);

		expect(screen.getByTestId("login-form")).toBeInTheDocument();
		expect(screen.queryByTestId("register-form")).not.toBeInTheDocument();
	});
});
