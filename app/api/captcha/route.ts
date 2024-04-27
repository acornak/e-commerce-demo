/* eslint-disable import/prefer-default-export */
export async function POST(req: Request): Promise<Response> {
	const body: {
		"g-recaptcha-response": string;
	} = await req.json();

	if (!body["g-recaptcha-response"]) {
		return Response.json({ status: 401 });
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
		return Response.json({ status: 401 });
	}

	return Response.json({ status: 200 });
}
