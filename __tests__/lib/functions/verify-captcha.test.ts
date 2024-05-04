import verifyCaptcha from "@/lib/functions/verify-captcha";

describe("verifyCaptcha function", () => {
	let mockSetVerified: jest.Mock<void, [boolean]>;

	const mockToken = "token";

	beforeEach(() => {
		mockSetVerified = jest.fn();
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
			}),
		) as jest.Mock;

		await verifyCaptcha(mockToken, mockSetVerified);

		expect(global.fetch).toHaveBeenCalledWith("/api/captcha", {
			body: '{"g-recaptcha-response":"token"}',
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});
		expect(mockSetVerified).toHaveBeenCalledWith(true);
	});

	it("should verify captcha and set false using setVerified", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({}),
				status: 400,
			}),
		) as jest.Mock;

		await verifyCaptcha(mockToken, mockSetVerified);

		expect(global.fetch).toHaveBeenCalledWith("/api/captcha", {
			body: '{"g-recaptcha-response":"token"}',
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});
		expect(mockSetVerified).toHaveBeenCalledWith(false);
	});

	it("should log error if verifying captcha fails", async () => {
		global.fetch = jest.fn().mockRejectedValue("Fetch failed");

		await verifyCaptcha(mockToken, mockSetVerified);

		expect(console.error).toHaveBeenCalledWith(
			"Verifying captcha failed:",
			"Fetch failed",
		);
	});
});
