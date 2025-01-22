import nodemailer from "nodemailer";
// Templates
import { NextRequest, NextResponse } from "next/server";
import {
	generateNotificationTemplate,
	generateConfirmationTemplate,
} from "./templates";

export const revalidate = 0;

/**
 * Send mail
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - Email content
 * @param {string} from - Sender email address
 * @returns {Promise<void>} - Promise
 * @throws {Error} - Throws error if mail sending fails
 */
async function sendMail(
	to: string,
	subject: string,
	html: string,
	from: string,
): Promise<void> {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			type: "login",
			user: process.env.EMAIL_USERNAME!,
			pass: process.env.EMAIL_PASSWORD!,
		},
	});

	const mailData = {
		from,
		to,
		subject,
		html,
	};

	try {
		await transporter.sendMail(mailData);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(error);
	}
}

/**
 * Verify reCAPTCHA token
 * @param {string} token - reCAPTCHA token
 * @returns {Promise<void>} - Promise
 * @throws {Error} - Throws error if reCAPTCHA verification fails
 */
async function verifyRecaptcha(token: string): Promise<void> {
	const response = await fetch(
		"https://www.google.com/recaptcha/api/siteverify",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
		},
	);

	const data = await response.json();

	if (!data.success) {
		throw new Error("Failed reCAPTCHA verification");
	}
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	const body: {
		to: string;
		message: string;
		name: string;
		subject: string;
		"g-recaptcha-response": string;
	} = await req.json();

	if (body.subject) {
		return NextResponse.json(
			{ message: "No bots allowed" },
			{ status: 500 },
		);
	}

	if (!body.to || !body.message || !body.name) {
		return NextResponse.json(
			{ message: "Please provide all required fields" },
			{ status: 400 },
		);
	}

	let message: string = "Email sent";
	let status: number = 200;

	try {
		// Verity reCAPTCHA
		await verifyRecaptcha(body["g-recaptcha-response"]);

		// Send mail to user
		await sendMail(
			body.to,
			"Glassify | Thank you for your request",
			generateConfirmationTemplate(body.name, body.message),
			process.env.EMAIL_USERNAME!,
		);

		// Send mail to me
		await sendMail(
			process.env.EMAIL_USERNAME!,
			"Glassify | New message",
			generateNotificationTemplate(body.name, body.to, body.message, ""),
			body.to,
		);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error(error);
		message = error.message;
		status = 500;
	}

	// return new NextResponse(JSON.stringify({ message }), {
	// 	status,
	// 	headers: { "Content-Type": "application/json" },
	// });
	return NextResponse.json({ message }, { status });
}
