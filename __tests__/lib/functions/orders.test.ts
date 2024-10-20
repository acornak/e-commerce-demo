import generateOrderId from "@/lib/functions/orders";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid");

describe("generateOrderId", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("should generate a unique order ID with the correct format", () => {
		const mockDate = new Date(2024, 6, 31); // Note: Month is 0-based, so 6 represents July
		jest.setSystemTime(mockDate);

		(uuidv4 as jest.Mock).mockReturnValue(
			"12345678-1234-1234-1234-123456789012",
		);

		const orderId = generateOrderId();

		expect(orderId).toBe("31-07-2024/123456");
		expect(uuidv4).toHaveBeenCalled();
	});
});
