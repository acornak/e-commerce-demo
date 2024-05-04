const verifyCaptcha = async (
	token: string,
	setVerified: (verified: boolean) => void,
) => {
	await fetch("/api/captcha", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			"g-recaptcha-response": token,
		}),
	})
		.then((response) =>
			response.status === 200 ? setVerified(true) : setVerified(false),
		)
		.catch((error) => console.error("Verifying captcha failed:", error));
};

export default verifyCaptcha;
