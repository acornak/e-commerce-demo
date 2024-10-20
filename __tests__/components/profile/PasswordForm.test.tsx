import React from "react";
// Testing
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
// Components
import PasswordForm from "@/components/profile/PasswordForm";
import userEvent from "@testing-library/user-event";

jest.mock("@/lib/models/user", () => ({
	updateUser: jest.fn(),
}));

jest.mock("@/components/styled/Inputs", () => ({
	StyledTextInput: ({ label, id, handleChange, value, type }: any) => (
		<div>
			<label htmlFor={id}>{label}</label>
			<input id={id} onChange={handleChange} value={value} type={type} />
		</div>
	),
	StyledSubmitButton: ({ onSubmit, children }: any) => (
		<button onClick={onSubmit} type="button">
			{children}
		</button>
	),
}));

describe("PasswordForm Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders form fields with initial empty values", () => {
		render(<PasswordForm />);
		expect(screen.getByLabelText("Password")).toHaveValue("");
		expect(screen.getByLabelText("Confirm Password")).toHaveValue("");
		expect(screen.getByText("Save Changes")).toBeInTheDocument();
	});

	it("updates password state on input change", () => {
		render(<PasswordForm />);
		const passwordInput = screen.getByLabelText("Password");
		fireEvent.change(passwordInput, { target: { value: "Password123" } });
		expect(passwordInput).toHaveValue("Password123");
	});

	it("updates confirm password state on input change", () => {
		render(<PasswordForm />);
		const confirmPasswordInput = screen.getByLabelText("Confirm Password");
		fireEvent.change(confirmPasswordInput, {
			target: { value: "Password123" },
		});
		expect(confirmPasswordInput).toHaveValue("Password123");
	});

	it("displays error when password is empty", async () => {
		render(<PasswordForm />);
		const passwordInput = screen.getByLabelText("Password");

		await userEvent.type(passwordInput, "Password123");
		await userEvent.clear(passwordInput);

		await waitFor(() => {
			expect(
				screen.getByText("Please enter your password"),
			).toBeInTheDocument();
		});
	});

	it("hides error when password is not empty", async () => {
		render(<PasswordForm />);
		const passwordInput = screen.getByLabelText("Password");

		await userEvent.type(passwordInput, "Password123");
		await userEvent.clear(passwordInput);

		await waitFor(() => {
			expect(
				screen.getByText("Please enter your password"),
			).toBeInTheDocument();
		});

		await userEvent.type(passwordInput, "Password123");

		await waitFor(() => {
			expect(
				screen.queryByText("Please enter your password"),
			).not.toBeInTheDocument();
		});
	});

	it("displays error when confirm password is empty", async () => {
		render(<PasswordForm />);
		const confirmPasswordInput = screen.getByLabelText("Confirm Password");

		await userEvent.type(confirmPasswordInput, "Password123");
		await userEvent.clear(confirmPasswordInput);

		await waitFor(() => {
			expect(
				screen.getByText("Please confirm your password"),
			).toBeInTheDocument();
		});
	});

	it("displays error when passwords do not match", async () => {
		render(<PasswordForm />);
		const passwordInput = screen.getByLabelText("Password");
		const confirmPasswordInput = screen.getByLabelText("Confirm Password");

		await userEvent.type(passwordInput, "Password123");
		await userEvent.type(confirmPasswordInput, "Password456");

		await waitFor(() => {
			expect(
				screen.getByText("Passwords do not match"),
			).toBeInTheDocument();
		});
	});

	it("hides error when passwords match", async () => {
		render(<PasswordForm />);
		const passwordInput = screen.getByLabelText("Password");
		const confirmPasswordInput = screen.getByLabelText("Confirm Password");

		await userEvent.type(passwordInput, "Password123");
		await userEvent.type(confirmPasswordInput, "Password456");

		await waitFor(() => {
			expect(
				screen.getByText("Passwords do not match"),
			).toBeInTheDocument();
		});

		await userEvent.clear(confirmPasswordInput);
		await userEvent.type(confirmPasswordInput, "Password123");

		await waitFor(() => {
			expect(
				screen.queryByText("Passwords do not match"),
			).not.toBeInTheDocument();
		});
	});

	it("submit button is present and clickable", () => {
		render(<PasswordForm />);
		const submitButton = screen.getByText("Save Changes");
		expect(submitButton).toBeInTheDocument();
		fireEvent.click(submitButton);
		// TODO: Implement onSubmit
		// In the current implementation, onSubmit does nothing.
		// You might want to update the component to accept a prop for onSubmit and test it here.
	});
});
