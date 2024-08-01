import { createFirebaseAdminApp, initAdmin } from "@/lib/config/firebase-admin";
import admin from "firebase-admin";

jest.mock("firebase-admin", () => {
	return {
		initializeApp: jest.fn(),
		app: jest.fn(),
		credential: {
			cert: jest.fn(),
		},
		apps: [],
	};
});

describe("Firebase Admin Initialization", () => {
	const mockParams = {
		projectId: "mock-project-id",
		clientEmail: "mock-client-email",
		storageBucket: "mock-storage-bucket",
		privateKey: "mock-private-key",
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should initialize a new Firebase Admin app when no app is initialized", () => {
		// Simulate that no Firebase Admin app is initialized
		Object.defineProperty(admin, "apps", {
			get: () => [], // Use an empty array for no apps
			configurable: true,
		});

		createFirebaseAdminApp(mockParams);

		expect(admin.initializeApp).toHaveBeenCalledWith({
			credential: undefined,
			projectId: mockParams.projectId,
			storageBucket: mockParams.storageBucket,
		});

		expect(admin.credential.cert).toHaveBeenCalledWith({
			projectId: mockParams.projectId,
			clientEmail: mockParams.clientEmail,
			privateKey: mockParams.privateKey.replace(/\\n/g, "\n"),
		});
	});

	it("should return the existing Firebase Admin app when one is already initialized", () => {
		// Simulate that a Firebase Admin app is already initialized
		Object.defineProperty(admin, "apps", {
			get: () => [{}], // Use an array with a dummy object
			configurable: true,
		});

		createFirebaseAdminApp(mockParams);

		expect(admin.initializeApp).not.toHaveBeenCalled();
		expect(admin.app).toHaveBeenCalled();
	});

	it("should initialize Firebase Admin using environment variables", async () => {
		Object.defineProperty(admin, "apps", {
			get: () => [], // Use an empty array for no apps
			configurable: true,
		});

		process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = mockParams.projectId;
		process.env.FIREBASE_CLIENT_EMAIL = mockParams.clientEmail;
		process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET =
			mockParams.storageBucket;
		process.env.FIREBASE_PRIVATE_KEY = mockParams.privateKey;

		await initAdmin();

		expect(admin.initializeApp).toHaveBeenCalledWith({
			credential: undefined,
			projectId: mockParams.projectId,
			storageBucket: mockParams.storageBucket,
		});

		expect(admin.credential.cert).toHaveBeenCalledWith({
			projectId: mockParams.projectId,
			clientEmail: mockParams.clientEmail,
			privateKey: mockParams.privateKey.replace(/\\n/g, "\n"),
		});
	});
});
