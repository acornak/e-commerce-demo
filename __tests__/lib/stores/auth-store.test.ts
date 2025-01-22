import { renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { auth } from "@/lib/config/firebase";
import {
	User,
	browserLocalPersistence,
	setPersistence,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	sendPasswordResetEmail,
	signOut,
	signInWithPopup,
} from "firebase/auth";
import { act } from "react-dom/test-utils";
import { doc, getDoc, setDoc } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
	doc: jest.fn(),
	getDoc: jest.fn(),
	setDoc: jest.fn(),
	updateDoc: jest.fn(),
	collection: jest.fn(),
}));

jest.mock("firebase/auth", () => {
	const originalModule = jest.requireActual("firebase/auth");

	return {
		...originalModule,
		setPersistence: jest.fn(),
		browserLocalPersistence: {},
		signInWithEmailAndPassword: jest.fn(),
		onAuthStateChanged: jest.fn(),
		createUserWithEmailAndPassword: jest.fn(),
		signInWithPopup: jest.fn(),
		GoogleAuthProvider: jest.fn(),
		sendPasswordResetEmail: jest.fn(),
		signOut: jest.fn(),
	};
});

jest.mock("@/lib/config/firebase", () => ({
	auth: {},
	db: {},
}));

describe("signInWithEmail", () => {
	beforeEach(() => {
		useAuthStore.setState({
			user: null,
			loading: false,
			initialLoading: true,
			error: null,
		});
	});

	it("allows a user to sign in with email and password", async () => {
		const { result } = renderHook(() => useAuthStore());
		const email = "test@example.com";
		const password = "password123";
		const mockUser = { uid: "123", email } as User;

		(setPersistence as jest.Mock).mockResolvedValueOnce(
			browserLocalPersistence,
		);
		(signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
			user: mockUser,
		});

		act(() => {
			result.current.signInWithEmail(email, password);
		});

		await waitFor(() => expect(result.current.user).toEqual(mockUser));

		expect(setPersistence).toHaveBeenCalledWith(
			auth,
			browserLocalPersistence,
		);
		expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
			auth,
			email,
			password,
		);
		expect(result.current.error).toBeNull();
		expect(result.current.loading).toBeFalsy();
	});

	it("handles an error during sign in with email and password", async () => {
		const { result } = renderHook(() => useAuthStore());
		const email = "test@example.com";
		const password = "password123";
		const errorMessage = "Authentication failed";

		(setPersistence as jest.Mock).mockResolvedValue(
			browserLocalPersistence,
		);

		(signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
			new Error(errorMessage),
		);

		act(() => {
			result.current.signInWithEmail(email, password);
		});

		await waitFor(() => expect(result.current.error).toBe(errorMessage));

		expect(setPersistence).toHaveBeenCalledWith(
			auth,
			browserLocalPersistence,
		);
		expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
			auth,
			email,
			password,
		);
		expect(result.current.user).toBeNull();
		expect(result.current.error).toBe(errorMessage);
		expect(result.current.loading).toBeFalsy();
	});
});

describe("signUpWithEmail", () => {
	beforeEach(() => {
		useAuthStore.setState({
			user: null,
			loading: false,
			initialLoading: true,
			error: null,
		});
	});

	it("allows a user to sign up with email and password", async () => {
		const { result } = renderHook(() => useAuthStore());
		const email = "test@example.com";
		const password = "password123";
		const mockUser = { uid: "123", email } as User;

		(setPersistence as jest.Mock).mockResolvedValueOnce(
			browserLocalPersistence,
		);
		(createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
			user: mockUser,
		});

		act(() => {
			result.current.signUpWithEmail(email, password);
		});

		await waitFor(() => expect(result.current.user).toEqual(mockUser));

		expect(setPersistence).toHaveBeenCalledWith(
			auth,
			browserLocalPersistence,
		);
		expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
			auth,
			email,
			password,
		);
		expect(result.current.error).toBeNull();
		expect(result.current.loading).toBeFalsy();
	});

	it("handles an error during sign up with email and password", async () => {
		const { result } = renderHook(() => useAuthStore());
		const email = "test@example.com";
		const password = "password123";
		const errorMessage = "Authentication failed";

		(setPersistence as jest.Mock).mockResolvedValue(
			browserLocalPersistence,
		);

		(createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
			new Error(errorMessage),
		);

		act(() => {
			result.current.signUpWithEmail(email, password);
		});

		await waitFor(() => expect(result.current.error).toBe(errorMessage));

		expect(setPersistence).toHaveBeenCalledWith(
			auth,
			browserLocalPersistence,
		);
		expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
			auth,
			email,
			password,
		);
		expect(result.current.user).toBeNull();
		expect(result.current.error).toBe(errorMessage);
		expect(result.current.loading).toBeFalsy();
	});
});

describe("signInWithGoogle", () => {
	beforeEach(() => {
		useAuthStore.setState({
			user: null,
			userData: null,
			loading: false,
			initialLoading: true,
			error: null,
		});
		jest.clearAllMocks();
	});

	it("allows a user to sign up with Google", async () => {
		const { result } = renderHook(() => useAuthStore());
		const email = "test@example.com";
		const mockUser = {
			uid: "123",
			email,
			displayName: "Test User",
		} as User;

		(doc as jest.Mock).mockReturnValue({});
		(getDoc as jest.Mock).mockResolvedValue({
			exists: () => false,
		});
		(setDoc as jest.Mock).mockResolvedValue(undefined);

		(setPersistence as jest.Mock).mockResolvedValueOnce(
			browserLocalPersistence,
		);
		(signInWithPopup as jest.Mock).mockResolvedValueOnce({
			user: mockUser,
		});

		act(() => {
			result.current.signInWithGoogle();
		});

		await waitFor(() => expect(result.current.user).toEqual(mockUser));

		expect(GoogleAuthProvider).toHaveBeenCalled();
		expect(setPersistence).toHaveBeenCalledWith(
			auth,
			browserLocalPersistence,
		);
		expect(signInWithPopup).toHaveBeenCalledWith(auth, {});
		expect(doc).toHaveBeenCalled();
		expect(getDoc).toHaveBeenCalled();
		expect(setDoc).toHaveBeenCalled();
		expect(result.current.error).toBeNull();
		expect(result.current.loading).toBeFalsy();
	});

	it("handles existing user sign in with Google", async () => {
		const { result } = renderHook(() => useAuthStore());
		const email = "test@example.com";
		const mockUser = {
			uid: "123",
			email,
		} as User;

		(doc as jest.Mock).mockReturnValue({});
		(getDoc as jest.Mock).mockResolvedValue({
			exists: () => true,
		});

		(setPersistence as jest.Mock).mockResolvedValueOnce(
			browserLocalPersistence,
		);
		(signInWithPopup as jest.Mock).mockResolvedValueOnce({
			user: mockUser,
		});

		act(() => {
			result.current.signInWithGoogle();
		});

		await waitFor(() => expect(result.current.user).toEqual(mockUser));

		expect(GoogleAuthProvider).toHaveBeenCalled();
		expect(setPersistence).toHaveBeenCalledWith(
			auth,
			browserLocalPersistence,
		);
		expect(signInWithPopup).toHaveBeenCalledWith(auth, {});
		expect(doc).toHaveBeenCalled();
		expect(getDoc).toHaveBeenCalled();
		expect(setDoc).not.toHaveBeenCalled();
		expect(result.current.error).toBeNull();
		expect(result.current.loading).toBeFalsy();
	});

	it("handles an error during sign up with Google", async () => {
		const { result } = renderHook(() => useAuthStore());
		const errorMessage = "Authentication failed";

		(setPersistence as jest.Mock).mockResolvedValueOnce(
			browserLocalPersistence,
		);
		(signInWithPopup as jest.Mock).mockRejectedValue(
			new Error(errorMessage),
		);

		// Mock Firestore operations
		(doc as jest.Mock).mockReturnValue({});
		(getDoc as jest.Mock).mockResolvedValue({
			exists: () => false,
		});

		act(() => {
			result.current.signInWithGoogle();
		});

		await waitFor(() => expect(result.current.error).toBe(errorMessage));

		expect(GoogleAuthProvider).toHaveBeenCalled();
		expect(setPersistence).toHaveBeenCalledWith(
			auth,
			browserLocalPersistence,
		);
		expect(signInWithPopup).toHaveBeenCalledWith(auth, {});
		expect(result.current.user).toBeNull();
		expect(result.current.error).toBe(errorMessage);
		expect(result.current.loading).toBeFalsy();
	});
});

describe("resetPassword", () => {
	beforeEach(() => {
		useAuthStore.setState({
			user: null,
			loading: false,
			initialLoading: true,
			error: null,
		});
	});

	it("allows a user to reset password", async () => {
		const { result } = renderHook(() => useAuthStore());
		const email = "test@example.com";

		(setPersistence as jest.Mock).mockResolvedValue(
			browserLocalPersistence,
		);

		act(() => {
			result.current.resetPassword(email);
		});

		await waitFor(() => expect(result.current.loading).toBeFalsy());

		expect(setPersistence).toHaveBeenCalledWith(
			auth,
			browserLocalPersistence,
		);
		expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, email);
		expect(result.current.error).toBeNull();
	});

	it("handles an error during reseting password", async () => {
		const { result } = renderHook(() => useAuthStore());
		const email = "test@example.com";
		const errorMessage = "Authentication failed";

		(setPersistence as jest.Mock).mockResolvedValue(
			browserLocalPersistence,
		);

		(sendPasswordResetEmail as jest.Mock).mockRejectedValue(
			new Error(errorMessage),
		);

		act(() => {
			result.current.resetPassword(email);
		});

		await waitFor(() => expect(result.current.error).toBe(errorMessage));

		expect(setPersistence).toHaveBeenCalledWith(
			auth,
			browserLocalPersistence,
		);
		expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, email);
		expect(result.current.user).toBeNull();
		expect(result.current.error).toBe(errorMessage);
		expect(result.current.loading).toBeFalsy();
	});
});

describe("logOut", () => {
	const mockUser = { uid: "123", email: "me@example.com" } as User;

	beforeEach(() => {
		useAuthStore.setState({
			user: mockUser,
			loading: false,
			initialLoading: true,
			error: null,
		});
	});

	it("allows a user to log out", async () => {
		const { result } = renderHook(() => useAuthStore());

		expect(result.current.user).toBe(mockUser);

		(setPersistence as jest.Mock).mockResolvedValue(
			browserLocalPersistence,
		);

		act(() => {
			result.current.logOut();
		});

		await waitFor(() => expect(result.current.loading).toBeFalsy());

		expect(setPersistence).toHaveBeenCalledWith(
			auth,
			browserLocalPersistence,
		);
		expect(signOut).toHaveBeenCalledWith(auth);
		expect(result.current.user).toBeNull();
		expect(result.current.error).toBeNull();
	});

	it("handles an error during log out", async () => {
		const { result } = renderHook(() => useAuthStore());
		const errorMessage = "Authentication failed";

		(setPersistence as jest.Mock).mockResolvedValue(
			browserLocalPersistence,
		);

		(signOut as jest.Mock).mockRejectedValue(new Error(errorMessage));

		act(() => {
			result.current.logOut();
		});

		await waitFor(() => expect(result.current.error).toBe(errorMessage));

		expect(setPersistence).toHaveBeenCalledWith(
			auth,
			browserLocalPersistence,
		);
		expect(signOut).toHaveBeenCalledWith(auth);
		expect(result.current.user).toBe(mockUser);
		expect(result.current.error).toBe(errorMessage);
		expect(result.current.loading).toBeFalsy();
	});
});
