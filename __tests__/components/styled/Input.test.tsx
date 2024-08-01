import { fireEvent, render } from "@testing-library/react";
import {
	StyledTextInput,
	StyledNumberInput,
	StyledSelectInput,
	StyledSubmitButton,
} from "@/components/styled/Inputs";

describe("StyledTextInput", () => {
	it("should render the input", () => {
		const { getByRole } = render(
			<StyledTextInput
				label="Email"
				id="email"
				handleChange={() => {}}
				value=""
				type="email"
				placeholder="placeholder"
			/>,
		);

		const input = getByRole("textbox");
		expect(input).toBeInTheDocument();
	});

	it("should render the label", () => {
		const { getByText } = render(
			<StyledTextInput
				label="Email"
				id="email"
				handleChange={() => {}}
				value=""
				type="email"
				placeholder="placeholder"
			/>,
		);

		const label = getByText("Email");
		expect(label).toBeInTheDocument();
	});

	it("should render the placeholder", () => {
		const { getByPlaceholderText } = render(
			<StyledTextInput
				label="Email"
				id="email"
				handleChange={() => {}}
				value=""
				type="email"
				placeholder="placeholder"
			/>,
		);

		const input = getByPlaceholderText("placeholder");
		expect(input).toBeInTheDocument();
	});

	it("should render the value", () => {
		const { getByDisplayValue } = render(
			<StyledTextInput
				label="Email"
				id="email"
				handleChange={() => {}}
				value="value"
				type="email"
				placeholder="placeholder"
			/>,
		);

		const input = getByDisplayValue("value");
		expect(input).toBeInTheDocument();
	});

	it("should trigger handleChange", () => {
		const handleChange = jest.fn();
		const { getByRole } = render(
			<StyledTextInput
				label="Email"
				id="email"
				handleChange={handleChange}
				value=""
				type="email"
				placeholder="placeholder"
			/>,
		);

		const input = getByRole("textbox");
		fireEvent.change(input, { target: { value: "test@example.com" } });
		expect(handleChange).toHaveBeenCalled();
	});
});

describe("StyledNumberInput", () => {
	it("should render the input", () => {
		const { getByRole } = render(
			<StyledNumberInput
				label="Quantity"
				id="quantity"
				handleChange={() => {}}
				value={0}
				placeholder="placeholder"
			/>,
		);

		const input = getByRole("spinbutton");
		expect(input).toBeInTheDocument();
	});

	it("should render the label", () => {
		const { getByText } = render(
			<StyledNumberInput
				label="Quantity"
				id="quantity"
				handleChange={() => {}}
				value={0}
				placeholder="placeholder"
			/>,
		);

		const label = getByText("Quantity");
		expect(label).toBeInTheDocument();
	});

	it("should render the placeholder", () => {
		const { getByPlaceholderText } = render(
			<StyledNumberInput
				label="Quantity"
				id="quantity"
				handleChange={() => {}}
				value={0}
				placeholder="placeholder"
			/>,
		);

		const input = getByPlaceholderText("placeholder");
		expect(input).toBeInTheDocument();
	});

	it("should render the value", () => {
		const { getByDisplayValue } = render(
			<StyledNumberInput
				label="Quantity"
				id="quantity"
				handleChange={() => {}}
				value={5}
				placeholder="placeholder"
			/>,
		);

		const input = getByDisplayValue("5");
		expect(input).toBeInTheDocument();
	});

	it("should trigger handleChange", () => {
		const handleChange = jest.fn();
		const { getByRole } = render(
			<StyledNumberInput
				label="Quantity"
				id="quantity"
				handleChange={handleChange}
				value={0}
				placeholder="placeholder"
			/>,
		);

		const input = getByRole("spinbutton");
		fireEvent.change(input, { target: { value: 10 } });
		expect(handleChange).toHaveBeenCalled();
	});
});

describe("StyledSelectInput", () => {
	it("should render the select", () => {
		const { getByRole } = render(
			<StyledSelectInput
				label="Category"
				id="category"
				handleChange={() => {}}
				value=""
				options={[
					{ label: "Option 1", value: "option1" },
					{ label: "Option 2", value: "option2" },
				]}
			/>,
		);

		const select = getByRole("combobox");
		expect(select).toBeInTheDocument();
	});

	it("should render the label", () => {
		const { getByText } = render(
			<StyledSelectInput
				label="Category"
				id="category"
				handleChange={() => {}}
				value=""
				options={[
					{ label: "Option 1", value: "option1" },
					{ label: "Option 2", value: "option2" },
				]}
			/>,
		);

		const label = getByText("Category");
		expect(label).toBeInTheDocument();
	});

	it("should render the options", () => {
		const { getByText } = render(
			<StyledSelectInput
				label="Category"
				id="category"
				handleChange={() => {}}
				value=""
				options={[
					{ label: "Option 1", value: "option1" },
					{ label: "Option 2", value: "option2" },
				]}
			/>,
		);

		const option1 = getByText("Option 1");
		const option2 = getByText("Option 2");
		expect(option1).toBeInTheDocument();
		expect(option2).toBeInTheDocument();
	});

	it("should trigger handleChange", () => {
		const handleChange = jest.fn();
		const { getByRole } = render(
			<StyledSelectInput
				label="Category"
				id="category"
				handleChange={handleChange}
				value=""
				options={[
					{ label: "Option 1", value: "option1" },
					{ label: "Option 2", value: "option2" },
				]}
			/>,
		);

		const select = getByRole("combobox");
		fireEvent.change(select, { target: { value: "option2" } });
		expect(handleChange).toHaveBeenCalled();
	});
});

describe("StyledSubmitButton", () => {
	it("should render the button", () => {
		const { getByRole } = render(
			<StyledSubmitButton onSubmit={() => {}}>Submit</StyledSubmitButton>,
		);

		const button = getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("should render the text", () => {
		const { getByText } = render(
			<StyledSubmitButton onSubmit={() => {}}>Submit</StyledSubmitButton>,
		);

		const text = getByText("Submit");
		expect(text).toBeInTheDocument();
	});

	it("should trigger onSubmit", () => {
		const onSubmit = jest.fn();
		const { getByRole } = render(
			<StyledSubmitButton onSubmit={onSubmit}>Submit</StyledSubmitButton>,
		);

		const button = getByRole("button");
		fireEvent.click(button);
		expect(onSubmit).toHaveBeenCalled();
	});
});
