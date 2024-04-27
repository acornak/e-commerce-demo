import nodemailer from "nodemailer";
// Templates
import {
	generateNotificationTemplate,
	generateConfirmationTemplate,
} from "./templates";

export const revalidate = 0;

async function sendMail(
	to: string,
	subject: string,
	html: string,
	from: string,
) {
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

async function verifyRecaptcha(token: string) {
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

export async function POST(req: Request): Promise<Response> {
	const body: {
		to: string;
		message: string;
		name: string;
		subject: string;
		"g-recaptcha-response": string;
	} = await req.json();

	if (body.subject) {
		return new Response(JSON.stringify({ message: "No bots allowed" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}

	let message: string = "Email sent";
	let status: number = 200;

	try {
		// Verity reCAPTCHA
		await verifyRecaptcha(body["g-recaptcha-response"]);

		// Send mail to user
		await sendMail(
			body.to,
			"Cylinder Pece | Ďakujeme za vašu správu",
			generateConfirmationTemplate(body.name, body.message),
			process.env.EMAIL_USERNAME!,
		);

		// Send mail to me
		await sendMail(
			process.env.EMAIL_USERNAME!,
			"Žiadosť o cenovú ponuku",
			generateNotificationTemplate(body.name, body.to, body.message, ""),
			body.to,
		);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error(error);
		message = error.message;
		status = 500;
	}

	return new Response(JSON.stringify({ message }), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}
