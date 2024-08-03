import ContactForm from "@/components/common/ContactForm";
import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

// mock useGoogleReCaptcha
jest.mock("react-google-recaptcha-v3", () => ({
	useGoogleReCaptcha: jest.fn(),
}));

describe("ContactForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders without crashing", () => {
		(useGoogleReCaptcha as jest.Mock).mockReturnValue({
			executeRecaptcha: null,
		});

		render(<ContactForm />);

		const form = screen.getByTestId("contact-form");

		expect(form).toBeInTheDocument();

		const fieldIds = [
			"contact-form-name",
			"contact-form-email",
			"contact-form-message",
			"contact-form-subject",
		];

		fieldIds.forEach((id) => {
			expect(screen.getByTestId(id)).toBeInTheDocument();
		});

		const submitButton = screen.getByTestId("contact-form-submit");

		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toHaveTextContent("Send Message");
		expect(submitButton).toBeDisabled();
	});

	it("shows an error if recaptcha is not loaded", async () => {
		(useGoogleReCaptcha as jest.Mock).mockReturnValue({
			executeRecaptcha: null,
		});

		render(<ContactForm width="w-full" />);

		// fill out form
		const nameInput = screen.getByTestId("contact-form-name");
		const emailInput = screen.getByTestId("contact-form-email");
		const messageInput = screen.getByTestId("contact-form-message");

		await act(async () => {
			fireEvent.change(nameInput, { target: { value: "John Doe" } });
			fireEvent.change(emailInput, {
				target: { value: "john@example.com" },
			});
			fireEvent.change(messageInput, {
				target: { value: "Hello, World!" },
			});
		});

		expect(nameInput).toHaveValue("John Doe");
		expect(emailInput).toHaveValue("john@example.com");
		expect(messageInput).toHaveValue("Hello, World!");

		// submit form
		const submitButton = screen.getByTestId("contact-form-submit");

		expect(submitButton).toBeEnabled();

		await act(async () => {
			fireEvent.click(submitButton);
		});

		// check for error message
		await waitFor(() => {
			const errorMessage = screen.getByTestId("contact-form-error");
			expect(errorMessage).toBeInTheDocument();
			expect(errorMessage).toHaveTextContent(
				"Something went wrong. Please try again later.",
			);
		});
	});

	it("shows an error if executeRecaptcha fails", async () => {
		(useGoogleReCaptcha as jest.Mock).mockReturnValue({
			executeRecaptcha: jest.fn().mockRejectedValue(new Error("Failed")),
		});

		render(<ContactForm width="w-full" />);

		// fill out form
		const nameInput = screen.getByTestId("contact-form-name");
		const emailInput = screen.getByTestId("contact-form-email");
		const messageInput = screen.getByTestId("contact-form-message");

		await act(async () => {
			fireEvent.change(nameInput, { target: { value: "John Doe" } });
			fireEvent.change(emailInput, {
				target: { value: "john@example.com" },
			});
			fireEvent.change(messageInput, {
				target: { value: "Hello, World!" },
			});
		});

		expect(nameInput).toHaveValue("John Doe");
		expect(emailInput).toHaveValue("john@example.com");
		expect(messageInput).toHaveValue("Hello, World!");

		// submit form
		const submitButton = screen.getByTestId("contact-form-submit");

		expect(submitButton).toBeEnabled();

		await act(async () => {
			fireEvent.click(submitButton);
		});

		// check for error message
		await waitFor(() => {
			const errorMessage = screen.getByTestId("contact-form-error");
			expect(errorMessage).toBeInTheDocument();
			expect(errorMessage).toHaveTextContent(
				"Something went wrong. Please try again later.",
			);
		});
	});

	it("shows an error if fetching fails", async () => {
		const mockExecuteRecaptcha = jest.fn().mockResolvedValue("token");
		(useGoogleReCaptcha as jest.Mock).mockReturnValue({
			executeRecaptcha: mockExecuteRecaptcha,
		});

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
			}),
		) as jest.Mock;

		render(<ContactForm width="w-full" />);

		// fill out form
		const nameInput = screen.getByTestId("contact-form-name");
		const emailInput = screen.getByTestId("contact-form-email");
		const messageInput = screen.getByTestId("contact-form-message");

		await act(async () => {
			fireEvent.change(nameInput, { target: { value: "John Doe" } });
			fireEvent.change(emailInput, {
				target: { value: "john@example.com" },
			});
			fireEvent.change(messageInput, {
				target: { value: "Hello, World!" },
			});
		});

		expect(nameInput).toHaveValue("John Doe");
		expect(emailInput).toHaveValue("john@example.com");
		expect(messageInput).toHaveValue("Hello, World!");

		// submit form
		const submitButton = screen.getByTestId("contact-form-submit");

		expect(submitButton).toBeEnabled();

		await act(async () => {
			fireEvent.click(submitButton);
		});

		// check for error message
		await waitFor(() => {
			const errorMessage = screen.getByTestId("contact-form-error");
			expect(errorMessage).toBeInTheDocument();
			expect(errorMessage).toHaveTextContent(
				"Something went wrong. Please try again later.",
			);
		});
	});

	it("shows loading while submitting the form", async () => {
		const mockExecuteRecaptcha = jest.fn().mockResolvedValue("fake-token");

		(useGoogleReCaptcha as jest.Mock).mockReturnValue({
			executeRecaptcha: mockExecuteRecaptcha,
		});

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({}), // Add more methods if needed
			}),
		) as jest.Mock;

		render(<ContactForm width="w-full" />);

		fireEvent.change(screen.getByTestId("contact-form-name"), {
			target: { value: "Test User" },
		});
		fireEvent.change(screen.getByTestId("contact-form-email"), {
			target: { value: "test@example.com" },
		});
		fireEvent.change(screen.getByTestId("contact-form-message"), {
			target: { value: "Test message" },
		});

		fireEvent.click(screen.getByTestId("contact-form-submit"));

		await waitFor(() => {
			expect(
				screen.getByTestId("contact-form-loading"),
			).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				"/api/contact",
				expect.objectContaining({
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: "Test User",
						to: "test@example.com",
						message: "Test message",
						subject: "",
						"g-recaptcha-response": "fake-token",
					}),
				}),
			);
		});
	});

	it("shows success message after successful submission", async () => {
		const mockExecuteRecaptcha = jest.fn().mockResolvedValue("fake-token");

		(useGoogleReCaptcha as jest.Mock).mockReturnValue({
			executeRecaptcha: mockExecuteRecaptcha,
		});

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
			}),
		) as jest.Mock;

		render(<ContactForm width="w-full" />);

		fireEvent.change(screen.getByTestId("contact-form-name"), {
			target: { value: "Test User" },
		});
		fireEvent.change(screen.getByTestId("contact-form-email"), {
			target: { value: "test@example.com" },
		});
		fireEvent.change(screen.getByTestId("contact-form-message"), {
			target: { value: "Test message" },
		});

		fireEvent.click(screen.getByTestId("contact-form-submit"));

		await waitFor(() => {
			expect(
				screen.queryByTestId("contact-form-loading"),
			).not.toBeInTheDocument();
			expect(
				screen.getByTestId("contact-form-success"),
			).toBeInTheDocument();
			expect(
				screen.getByText("Message sent successfully. Thank you!"),
			).toBeInTheDocument();
		});
	});
});
