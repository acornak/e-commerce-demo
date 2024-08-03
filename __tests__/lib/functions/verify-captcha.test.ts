import verifyCaptcha from "@/lib/functions/verify-captcha";

describe("verifyCaptcha function", () => {
	const mockToken = "token";

	beforeEach(() => {
		console.error = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should verify captcha and set true using setVerified", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({}),
				status: 200,
				ok: true,
			}),
		) as jest.Mock;

		const res = await verifyCaptcha(mockToken);

		expect(global.fetch).toHaveBeenCalledWith("/api/captcha", {
			body: JSON.stringify({ "g-recaptcha-response": mockToken }),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});

		expect(res).toBeTruthy();
	});

	it("should verify captcha and set false using setVerified", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({}),
				status: 400,
			}),
		) as jest.Mock;

		const res = await verifyCaptcha(mockToken);

		expect(global.fetch).toHaveBeenCalledWith("/api/captcha", {
			body: '{"g-recaptcha-response":"token"}',
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});
		expect(res).toBeFalsy();
	});

	it("should log error if verifying captcha fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		const res = await verifyCaptcha(mockToken);

		expect(console.error).toHaveBeenCalledWith("Fetch failed");
		expect(res).toBeFalsy();
	});
});
