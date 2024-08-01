/**
 * @jest-environment node
 */
import { POST } from "@/app/api/captcha/route";
import { NextRequest } from "next/server";

describe("POST /api/captcha", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return a 401 status if no recaptcha response is provided", async () => {
		const request = {
			json: jest.fn().mockResolvedValue({}),
		} as unknown as NextRequest;

		const response = await POST(request);

		expect(response.status).toBe(401);
	});

	it("should return a 401 status if the recaptcha response is invalid", async () => {
		const request = {
			json: jest
				.fn()
				.mockResolvedValue({ "g-recaptcha-response": "invalid-token" }),
		} as unknown as NextRequest;

		global.fetch = jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue({ success: false }),
		} as unknown as Response);

		const response = await POST(request);

		expect(response.status).toBe(401);
	});

	it("should return a 200 status if the recaptcha response is valid", async () => {
		const request = {
			json: jest
				.fn()
				.mockResolvedValue({ "g-recaptcha-response": "valid-token" }),
		} as unknown as NextRequest;

		global.fetch = jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue({ success: true }),
		} as unknown as Response);

		const response = await POST(request);

		expect(response.status).toBe(200);
	});
});
