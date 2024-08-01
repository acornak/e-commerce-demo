import { getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getUser, updateUser } from "@/lib/models/user";
import { User } from "@/lib/config/types";
import { auth } from "@/lib/config/firebase";
import { User as FirebaseUser } from "firebase/auth";

jest.mock("firebase/firestore", () => ({
	doc: jest.fn(),
	getDoc: jest.fn(),
	setDoc: jest.fn(),
	updateDoc: jest.fn(),
	collection: jest.fn(),
}));

jest.mock("@/lib/config/firebase", () => ({
	auth: {
		currentUser: {
			email: "test@example.com",
		},
	},
	db: {},
}));

describe("getUser", () => {
	beforeEach(() => {
		(auth as any).currentUser = {
			email: "test@example.com",
		} as FirebaseUser;
	});

	it("should return user data if user exists", async () => {
		const mockUser = { firstName: "Test", lastName: "User" } as User;
		(getDoc as jest.Mock).mockResolvedValueOnce({
			exists: () => true,
			data: () => mockUser,
		});

		const user = await getUser();
		expect(user).toEqual(mockUser);
	});

	it("should return null if user does not exist", async () => {
		(getDoc as jest.Mock).mockResolvedValueOnce({
			exists: () => false,
		});

		const user = await getUser();
		expect(user).toBeNull();
	});

	it("should throw an error if no user is logged in", async () => {
		(auth as any).currentUser = null;

		await expect(getUser()).rejects.toThrow("No user logged in");
	});

	it("should throw the last error if getDoc fails", async () => {
		const mockError = new Error("Something went wrong");
		(getDoc as jest.Mock).mockRejectedValueOnce(mockError);

		await expect(getUser()).rejects.toThrow(mockError);
	});
});

describe("updateUser", () => {
	beforeEach(() => {
		(auth as any).currentUser = {
			email: "test@example.com",
		} as FirebaseUser;
	});

	it("should set user data if user does not exist", async () => {
		const mockUser: User = {
			firstName: "Test",
			lastName: "User",
			updatedAt: expect.any(Date),
		};
		(getDoc as jest.Mock).mockResolvedValueOnce({
			exists: () => false,
		});

		await updateUser(mockUser);
		expect(setDoc).toHaveBeenCalledWith(
			undefined,
			expect.objectContaining(mockUser),
		);
	});

	it("should update user data if user exists", async () => {
		const mockUser: User = {
			firstName: "Test",
			lastName: "User",
			updatedAt: expect.any(Date),
		};
		(getDoc as jest.Mock).mockResolvedValueOnce({
			exists: () => true,
		});

		// TODO
		await updateUser(mockUser);
		expect(updateDoc).toHaveBeenCalledWith(
			undefined,
			expect.objectContaining(mockUser),
		);
	});

	it("should throw an error if no user is logged in", async () => {
		(auth as any).currentUser = null;

		await expect(
			updateUser({ firstName: "Test", lastName: "User" }),
		).rejects.toThrow("No user logged in");
	});

	it("should throw the last error if getDoc fails", async () => {
		const mockError = new Error("Something went wrong");
		(getDoc as jest.Mock).mockRejectedValueOnce(mockError);

		await expect(
			updateUser({ firstName: "Test", lastName: "User" }),
		).rejects.toThrow(mockError);
	});
});
