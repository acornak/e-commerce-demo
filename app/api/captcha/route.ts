/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from "next/server";

/**
 * Validate reCAPTCHA response
 * @param {NextRequest} req - Request object
 * @returns {NextResponse} - Response with status
 * @throws {Error} - Throws error if reCAPTCHA response is invalid
 * @example
 * POST /api/captcha
 * {
 * 	"g-recaptcha-response": "valid-token"
 * }
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
	const body: {
		"g-recaptcha-response": string;
	} = await req.json();

	if (!body["g-recaptcha-response"]) {
		return NextResponse.json({}, { status: 401 });
	}

	const response = await fetch(
		"https://www.google.com/recaptcha/api/siteverify",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body["g-recaptcha-response"]}`,
		},
	);

	const data = await response.json();

	if (!data.success) {
		return NextResponse.json({}, { status: 401 });
	}

	return NextResponse.json({});
}
