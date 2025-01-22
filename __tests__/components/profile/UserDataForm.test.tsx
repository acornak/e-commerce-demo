import React from "react";
// Testing
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
// Components
import UserDataForm from "@/components/profile/UserDataForm";
// Types and constants
import { updateUser } from "@/lib/models/user";

jest.mock("@/lib/models/user", () => ({
	updateUser: jest.fn(),
}));

// Mock the styled components
jest.mock("@/components/styled/Inputs", () => ({
	StyledTextInput: ({
		label,
		id,
		handleChange,
		value,
		placeholder,
		disabled,
		type,
	}: any) => (
		<div>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				onChange={handleChange}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				type={type}
			/>
		</div>
	),
	StyledSubmitButton: ({ onSubmit, children }: any) => (
		<button onClick={onSubmit} type="button">
			{children}
		</button>
	),
}));

describe("UserDataForm Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders with initial userData and email", () => {
		const userData = {
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "(123) 456-7890",
		};
		const email = "john.doe@example.com";

		render(<UserDataForm userData={userData} email={email} />);

		expect(screen.getByLabelText("First Name")).toHaveValue("John");
		expect(screen.getByLabelText("Last Name")).toHaveValue("Doe");
		expect(screen.getByLabelText("Email")).toHaveValue(
			"john.doe@example.com",
		);
		expect(screen.getByLabelText("Phone Number")).toHaveValue(
			"(123) 456-7890",
		);
	});

	it("updates firstName when input changes", () => {
		const userData = {
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "(123) 456-7890",
		};
		const email = "john.doe@example.com";

		render(<UserDataForm userData={userData} email={email} />);

		const firstNameInput = screen.getByLabelText("First Name");
		fireEvent.change(firstNameInput, { target: { value: "Jane" } });

		expect(firstNameInput).toHaveValue("Jane");
	});

	it("formats phone number correctly", () => {
		const userData = null;
		const email = "";

		render(<UserDataForm userData={userData} email={email} />);

		const phoneInput = screen.getByLabelText("Phone Number");
		fireEvent.change(phoneInput, { target: { value: "1234567890" } });

		expect(phoneInput).toHaveValue("(123) 456-7890");
	});

	it("formats phone number correctly - different format", () => {
		const userData = {
			firstName: "",
			lastName: "",
		};
		const email = "";

		render(<UserDataForm userData={userData} email={email} />);

		const phoneInput = screen.getByLabelText("Phone Number");
		const nameInput = screen.getByLabelText("First Name");
		const lastNameInput = screen.getByLabelText("Last Name");
		fireEvent.change(phoneInput, { target: { value: "123456789" } });

		expect(phoneInput).toHaveValue("123456789");
		expect(nameInput).toHaveValue("");
		expect(lastNameInput).toHaveValue("");
	});

	it("calls updateUser with correct data on submit", async () => {
		const userData = {
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "(123) 456-7890",
		};
		const email = "john.doe@example.com";

		render(<UserDataForm userData={userData} email={email} />);

		const firstNameInput = screen.getByLabelText("First Name");
		const lastNameInput = screen.getByLabelText("Last Name");
		const phoneInput = screen.getByLabelText("Phone Number");
		const submitButton = screen.getByText("Save Changes");
		const emailInput = screen.getByLabelText("Email");

		fireEvent.change(firstNameInput, { target: { value: "Jane" } });
		fireEvent.change(lastNameInput, { target: { value: "Smith" } });
		fireEvent.change(phoneInput, { target: { value: "9876543210" } });
		fireEvent.change(emailInput, { target: { value: "me@example.com" } });

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(updateUser).toHaveBeenCalledWith({
				firstName: "Jane",
				lastName: "Smith",
				phoneNumber: "(987) 654-3210",
			});
		});
	});

	it("disables inputs and button when loading", async () => {
		let resolvePromise: any;
		(updateUser as jest.Mock).mockImplementation(
			() =>
				new Promise((resolve) => {
					resolvePromise = resolve;
				}),
		);

		const userData = {
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "(123) 456-7890",
		};
		const email = "john.doe@example.com";

		render(<UserDataForm userData={userData} email={email} />);

		const submitButton = screen.getByText("Save Changes");
		fireEvent.click(submitButton);

		// Inputs should be disabled
		expect(screen.getByLabelText("First Name")).toBeDisabled();
		expect(screen.getByLabelText("Last Name")).toBeDisabled();
		expect(screen.getByLabelText("Phone Number")).toBeDisabled();

		// Resolve the promise to end loading state
		resolvePromise();

		await waitFor(() => {
			expect(screen.getByLabelText("First Name")).not.toBeDisabled();
		});
	});

	it("displays error message when updateUser fails", async () => {
		const errorMessage = "Update failed";
		(updateUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

		const userData = {
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "(123) 456-7890",
		};
		const email = "john.doe@example.com";

		render(<UserDataForm userData={userData} email={email} />);

		const submitButton = screen.getByText("Save Changes");
		fireEvent.click(submitButton);

		const notification = await screen.findByTestId("notification");
		expect(notification).toHaveTextContent(errorMessage);
	});
});
