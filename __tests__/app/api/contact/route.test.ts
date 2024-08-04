/**
 * @jest-environment node
 */
import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

jest.mock("nodemailer");
const mockedNodemailer = nodemailer as jest.Mocked<typeof nodemailer>;

describe("POST /api/contact", () => {
	const mockEmail = "john@example.com";
	const mockName = "John Doe";
	const mockMessage = "Hello, world!";

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return a 500 as bot protection", async () => {
		const request = {
			json: async () => ({
				email: mockEmail,
				name: mockName,
				message: mockMessage,
				subject: "Contact Form Submission",
			}),
		} as unknown as NextRequest;

		const response = await POST(request);

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({
			message: "No bots allowed",
		});
	});

	it("should return a 400 status if no email is provided", async () => {
		const request = {
			json: async () => ({
				name: mockName,
				message: mockMessage,
			}),
		} as unknown as NextRequest;

		const response = await POST(request);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			message: "Please provide all required fields",
		});
	});

	it("should return a 400 status if no name is provided", async () => {
		const request = {
			json: async () => ({
				email: mockEmail,
				message: mockMessage,
			}),
		} as unknown as NextRequest;

		const response = await POST(request);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			message: "Please provide all required fields",
		});
	});

	it("should return a 400 status if no message is provided", async () => {
		const request = {
			json: async () => ({
				email: mockEmail,
				name: mockName,
			}),
		} as unknown as NextRequest;

		const response = await POST(request);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			message: "Please provide all required fields",
		});
	});

	it("should return 500 if captcha verification fails", async () => {
		const request = {
			json: async () => ({
				to: mockEmail,
				message: mockMessage,
				name: mockName,
			}),
		} as unknown as NextRequest;

		global.fetch = jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue({ success: false }),
		} as unknown as Response);

		const response = await POST(request);

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({
			message: "Failed reCAPTCHA verification",
		});
	});

	it("should return 500 if sending email fails", async () => {
		const request = {
			json: async () => ({
				to: mockEmail,
				message: mockMessage,
				name: mockName,
				"g-recaptcha-response": "valid-token",
			}),
		} as unknown as NextRequest;

		mockedNodemailer.createTransport.mockReturnValue({
			sendMail: jest
				.fn()
				.mockRejectedValue(new Error("Failed to send email")),
		} as any);

		global.fetch = jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue({ success: true }),
		} as unknown as Response);

		const response = await POST(request);

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({
			message: "Error: Failed to send email",
		});
	});

	// TODO
	it("should return 200 if sending email is successful", async () => {
		const request = {
			json: async () => ({
				to: mockEmail,
				message: mockMessage,
				name: mockName,
				"g-recaptcha-response": "valid-token",
			}),
		} as unknown as NextRequest;

		mockedNodemailer.createTransport.mockReturnValue({
			sendMail: jest.fn().mockResolvedValue({}),
		} as any);

		global.fetch = jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue({ success: true }),
		} as unknown as Response);

		const response = await POST(request);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			message: "Email sent",
		});
	});
});
