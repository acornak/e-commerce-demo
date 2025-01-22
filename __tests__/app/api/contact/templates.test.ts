import {
	generateNotificationTemplate,
	generateConfirmationTemplate,
} from "@/app/api/contact/templates";

const name = "John Doe";
const email = "john@example.com";
const message = "Hello, world!";
const telephone = "123456";

describe("Generate notification email", () => {
	it("should generate a notification email", async () => {
		const template = generateNotificationTemplate(
			name,
			email,
			message,
			telephone,
		);

		expect(template).toContain(name);
		expect(template).toContain(email);
		expect(template).toContain(message);
		expect(template).toContain(telephone);
	});
});

describe("Generate confirmation email", () => {
	it("should generate a confirmation email", async () => {
		const template = generateConfirmationTemplate(
			name,

			message,
		);

		expect(template).toContain(name);
		expect(template).toContain(message);
	});
});
