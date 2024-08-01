import { Order } from "@/lib/config/types";
import updateOrder from "@/lib/models/orders-admin";
import { getFirestore } from "firebase-admin/firestore";

jest.mock("firebase-admin/firestore", () => {
	return {
		getFirestore: jest.fn(),
		Timestamp: {
			now: jest.fn(() => new Date()),
		},
	};
});

describe("updateOrder", () => {
	let mockFirestore: any;
	let mockCollection: any;
	let mockWhere: any;
	let mockGet: any;
	let mockUpdate: any;

	beforeEach(() => {
		mockUpdate = jest.fn();
		mockGet = jest.fn();
		mockWhere = jest.fn(() => ({ get: mockGet }));
		mockCollection = jest.fn(() => ({ where: mockWhere }));
		mockFirestore = { collection: mockCollection };
		(getFirestore as jest.Mock).mockReturnValue(mockFirestore);
	});

	it("should update an order if it exists", async () => {
		const mockOrder: Order = {
			id: "1",
			email: "me@example.com",
			items: [
				{
					productId: 1,
					sizeId: 1,
					price: 100,
					quantity: 1,
				},
			],
			status: "pending",
			paid: false,
			address: {
				street: "1234 Main St",
				city: "Springfield",
				state: "IL",
				zipCode: "62701",
				country: "USA",
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const mockDoc = { ref: { update: mockUpdate } };
		mockGet.mockResolvedValueOnce({ empty: false, docs: [mockDoc] });

		await updateOrder(mockOrder);

		expect(mockCollection).toHaveBeenCalledWith("orders");
		expect(mockWhere).toHaveBeenCalledWith("id", "==", mockOrder.id);
		expect(mockGet).toHaveBeenCalled();
		expect(mockUpdate).toHaveBeenCalledWith({
			...mockOrder,
			updatedAt: expect.any(Date),
		});
	});

	it("should throw an error if no order is found with the given ID", async () => {
		const mockOrder: Order = {
			id: "1",
			email: "me@example.com",
			items: [
				{
					productId: 1,
					sizeId: 1,
					price: 100,
					quantity: 1,
				},
			],
			status: "pending",
			paid: false,
			address: {
				street: "1234 Main St",
				city: "Springfield",
				state: "IL",
				zipCode: "62701",
				country: "USA",
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		mockGet.mockResolvedValueOnce({ empty: true });

		await expect(updateOrder(mockOrder)).rejects.toThrow(
			"No order found with the given ID",
		);
	});

	it("should throw an error if the update fails", async () => {
		const mockOrder: Order = {
			id: "1",
			email: "me@example.com",
			items: [
				{
					productId: 1,
					sizeId: 1,
					price: 100,
					quantity: 1,
				},
			],
			status: "pending",
			paid: false,
			address: {
				street: "1234 Main St",
				city: "Springfield",
				state: "IL",
				zipCode: "62701",
				country: "USA",
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const mockError = new Error("Update failed");
		mockGet.mockResolvedValueOnce({
			empty: false,
			docs: [
				{ ref: { update: jest.fn().mockRejectedValueOnce(mockError) } },
			],
		});

		await expect(updateOrder(mockOrder)).rejects.toThrow(mockError.message);
	});
});
