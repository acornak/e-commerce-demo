import React from "react";
// Testing
import {
	render,
	fireEvent,
	waitFor,
	screen,
	act,
} from "@testing-library/react";
// Components
import AddressForm from "@/components/profile/AddressForm";
// Types and constants
import { updateUser } from "@/lib/models/user";

jest.mock("@/lib/models/user", () => ({
	updateUser: jest.fn(),
}));

jest.mock("@/components/styled/Inputs", () => ({
	StyledTextInput: ({
		label,
		id,
		handleChange,
		value,
		disabled,
		pattern,
	}: any) => (
		<div>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				onChange={handleChange}
				value={value}
				disabled={disabled}
				pattern={pattern}
			/>
		</div>
	),
	StyledSelectInput: ({
		label,
		id,
		handleChange,
		value,
		options,
		disabled,
	}: any) => (
		<div>
			<label htmlFor={id}>{label}</label>
			<select
				id={id}
				onChange={handleChange}
				value={value}
				disabled={disabled}
			>
				{options.map((option: any) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	),
	StyledSubmitButton: ({ onSubmit, children }: any) => (
		<button onClick={onSubmit} type="button">
			{children}
		</button>
	),
}));

describe("AddressForm Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders form fields with empty values when no address prop is provided", () => {
		render(<AddressForm />);
		expect(screen.getByLabelText("Street")).toHaveValue("");
		expect(screen.getByLabelText("City")).toHaveValue("");
		expect(screen.getByLabelText("State")).toHaveValue("");
		expect(screen.getByLabelText("Zip Code")).toHaveValue("");
		expect(screen.getByLabelText("Country")).toHaveValue("USA");
	});

	it("pre-populates form fields when address prop is provided", () => {
		const address = {
			street: "123 Main St",
			city: "Anytown",
			state: "CA",
			zipCode: "12345",
			country: "USA",
		};

		render(<AddressForm address={address} />);
		expect(screen.getByLabelText("Street")).toHaveValue("123 Main St");
		expect(screen.getByLabelText("City")).toHaveValue("Anytown");
		expect(screen.getByLabelText("State")).toHaveValue("CA");
		expect(screen.getByLabelText("Zip Code")).toHaveValue("12345");
		expect(screen.getByLabelText("Country")).toHaveValue("USA");
	});

	it("pre-populates form fields when address prop is provided - no state", () => {
		const address = {
			street: "123 Main St",
			city: "Anytown",
			zipCode: "12345",
			country: "USA",
		};

		render(<AddressForm address={address} />);
		expect(screen.getByLabelText("Street")).toHaveValue("123 Main St");
		expect(screen.getByLabelText("City")).toHaveValue("Anytown");
		expect(screen.getByLabelText("State")).toHaveValue("");
		expect(screen.getByLabelText("Zip Code")).toHaveValue("12345");
		expect(screen.getByLabelText("Country")).toHaveValue("USA");
	});

	it("updates state when input fields are changed", () => {
		render(<AddressForm />);
		fireEvent.change(screen.getByLabelText("Street"), {
			target: { value: "456 Elm St" },
		});
		fireEvent.change(screen.getByLabelText("City"), {
			target: { value: "Othertown" },
		});
		fireEvent.change(screen.getByLabelText("State"), {
			target: { value: "NY" },
		});
		fireEvent.change(screen.getByLabelText("Zip Code"), {
			target: { value: "67890" },
		});
		fireEvent.change(screen.getByLabelText("Country"), {
			target: { value: "CA" },
		});

		expect(screen.getByLabelText("Street")).toHaveValue("456 Elm St");
		expect(screen.getByLabelText("City")).toHaveValue("Othertown");
		expect(screen.getByLabelText("State")).toHaveValue("NY");
		expect(screen.getByLabelText("Zip Code")).toHaveValue("67890");
		expect(screen.getByLabelText("Country")).toHaveValue("CA");
	});

	it("calls updateUser with correct data when form is submitted", async () => {
		const address = {
			street: "123 Main St",
			city: "Anytown",
			state: "CA",
			zipCode: "12345",
			country: "USA",
		};

		render(<AddressForm address={address} />);

		fireEvent.change(screen.getByLabelText("Street"), {
			target: { value: "456 Elm St" },
		});
		fireEvent.click(screen.getByText("Save Changes"));

		await waitFor(() =>
			expect(updateUser).toHaveBeenCalledWith({
				address: {
					street: "456 Elm St",
					city: "Anytown",
					state: "CA",
					zipCode: "12345",
					country: "USA",
				},
			}),
		);
	});

	it("disables inputs when loading", async () => {
		let resolveUpdateUser: any;
		(updateUser as jest.Mock).mockImplementation(
			() =>
				new Promise((resolve) => {
					resolveUpdateUser = resolve;
				}),
		);

		render(<AddressForm />);

		fireEvent.click(screen.getByText("Save Changes"));

		expect(screen.getByLabelText("Street")).toBeDisabled();
		expect(screen.getByLabelText("City")).toBeDisabled();
		expect(screen.getByLabelText("State")).toBeDisabled();
		expect(screen.getByLabelText("Zip Code")).toBeDisabled();
		expect(screen.getByLabelText("Country")).toBeDisabled();

		act(() => {
			resolveUpdateUser();
		});

		await waitFor(() => {
			expect(screen.getByLabelText("Street")).not.toBeDisabled();
		});
	});

	it("displays error message when updateUser fails", async () => {
		const errorMessage = "Update failed";
		(updateUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

		render(<AddressForm />);

		fireEvent.click(screen.getByText("Save Changes"));

		await waitFor(() => {
			expect(screen.getByText(errorMessage)).toBeInTheDocument();
		});
	});
});
