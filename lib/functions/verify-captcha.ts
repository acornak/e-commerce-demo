/**
 * Verifies the captcha token with the server.
 * @param token - Captcha token
 * @returns Promise<boolean>
 */
const verifyCaptcha = async (token: string): Promise<boolean> => {
	try {
		const response = await fetch("/api/captcha", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ "g-recaptcha-response": token }),
		});

		if (response.ok) {
			return true;
		}
	} catch (error) {
		console.error(error);
	}

	return false;
};

export default verifyCaptcha;
