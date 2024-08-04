import { ordersColl } from "@/lib/config/constants";
import { auth } from "@/lib/config/firebase";
import { Order } from "@/lib/config/types";
import { createOrder, getOrders } from "@/lib/models/orders";
import { addDoc, getDocs, query, where } from "firebase/firestore";

jest.mock("firebase/firestore");
jest.mock("@/lib/config/firebase", () => ({
	auth: {
		currentUser: {
			email: "test@example.com",
		},
	},
}));
jest.mock("@/lib/config/constants", () => ({
	ordersColl: jest.fn(),
}));

describe("Order Functions", () => {
	describe("getOrders", () => {
		beforeEach(() => {
			(auth as any).currentUser = { email: "test@example.com" };
		});

		it("should return orders for the current user", async () => {
			const mockTimestamp = (date: Date | undefined) => ({
				toDate: () => date,
			});

			const mockOrders: Order[] = [
				{
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
				},
				{
					id: "2",
					email: "someone@example.com",
					items: [
						{
							productId: 2,
							sizeId: 2,
							price: 200,
							quantity: 2,
						},
					],
					status: "processing",
					paid: true,
					address: {
						street: "5678 Elm St",
						city: "Shelbyville",
						state: "IN",
						zipCode: "46176",
						country: "USA",
					},
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			];

			(getDocs as jest.Mock).mockResolvedValueOnce({
				docs: mockOrders.map((order) => ({
					data: () => ({
						...order,
						createdAt: mockTimestamp(order.createdAt),
						updatedAt: mockTimestamp(order.updatedAt),
					}),
				})),
			});

			const orders = await getOrders();
			expect(orders).toEqual(mockOrders);
			expect(getDocs).toHaveBeenCalledWith(
				query(ordersColl, where("email", "==", "test@example.com")),
			);
		});

		it("should throw an error if no user is logged in", async () => {
			(auth as any).currentUser = null;

			await expect(getOrders()).rejects.toThrow("No user logged in");
		});

		it("should throw an error if fetching orders fails", async () => {
			const mockError = new Error("Fetching failed");
			(getDocs as jest.Mock).mockRejectedValueOnce(mockError);

			await expect(getOrders()).rejects.toThrow(mockError.message);
		});
	});

	describe("createOrder", () => {
		it("should create a new order", async () => {
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

			await createOrder(mockOrder);

			expect(addDoc).toHaveBeenCalledWith(ordersColl, mockOrder);
		});

		it("should throw an error if order creation fails", async () => {
			const mockError = new Error("Creation failed");
			(addDoc as jest.Mock).mockRejectedValueOnce(mockError);

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

			await expect(createOrder(mockOrder)).rejects.toThrow(
				mockError.message,
			);
		});
	});
});
