import OrdersPage from "@/app/orders/page";
import { getOrders } from "@/lib/models/orders";
import { getUser } from "@/lib/models/user";
import { useAuthStore } from "@/lib/stores/auth-store";
import { render, screen, waitFor } from "@testing-library/react";
import { redirect } from "next/navigation";

jest.mock("@/components/styled/Heading", () => {
	return {
		__esModule: true,
		StyledSectionHeading: () => <div data-testid="mock-styled-heading" />,
	};
});

jest.mock("@/components/styled/Loading", () => {
	return {
		__esModule: true,
		default: () => <div data-testid="mock-loading" />,
	};
});

jest.mock("@/components/common/Newsletter", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-newsletter" />,
}));

jest.mock("@/components/profile/OrdersTable", () => ({
	__esModule: true,
	default: () => <div data-testid="orders-table" />,
}));

jest.mock("@/lib/models/orders", () => ({
	__esModule: true,
	getOrders: () => Promise.resolve([]),
}));

jest.mock("@/lib/models/user", () => ({
	getUser: jest.fn(),
}));

jest.mock("@/lib/models/orders", () => ({
	getOrders: jest.fn(),
}));

jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));

describe("Orders Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the loading state", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: true,
				user: null,
			});
		});

		render(<OrdersPage />);

		await waitFor(() => {
			expect(screen.getByTestId("mock-loading")).toBeInTheDocument();
		});
	});

	it("should redirect to login page when user is not logged in", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: null,
			});
		});

		render(<OrdersPage />);

		await waitFor(() => {
			expect(redirect).toHaveBeenCalledWith("/login?redirect=account");
		});
	});

	it("should render error message when fetching user data fails", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
			});
		});

		const mockGetUser = getUser as jest.Mock;
		mockGetUser.mockImplementation(() => {
			throw new Error("User not found");
		});

		render(<OrdersPage />);

		await waitFor(() => {
			expect(screen.getByText("User not found")).toBeInTheDocument();
		});
	});

	it("should render error when getOrders fails", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
			});
		});

		const mockGetUser = getUser as jest.Mock;
		mockGetUser.mockImplementation(() => {
			return {
				firstName: "John",
			};
		});

		const mockGetOrders = getOrders as jest.Mock;
		mockGetOrders.mockImplementation(() => {
			return Promise.reject(new Error("Orders not found"));
		});

		render(<OrdersPage />);

		await waitFor(() => {
			expect(screen.getByText("Orders not found")).toBeInTheDocument();
		});
	});

	it("should render orders table when user is logged in", async () => {
		const mockAuthStore = useAuthStore as unknown as jest.Mock;
		mockAuthStore.mockImplementation((fn: any) => {
			return fn({
				initialLoading: false,
				user: { email: "me@example.com" },
			});
		});

		const mockGetUser = getUser as jest.Mock;
		mockGetUser.mockImplementation(() => {
			return {
				firstName: "John",
			};
		});

		const mockGetOrders = getOrders as jest.Mock;
		mockGetOrders.mockImplementation(() => {
			return Promise.resolve([
				{
					id: "1",
					createdAt: new Date(),
					total: 100,
					items: [],
				},
			]);
		});

		render(<OrdersPage />);

		await waitFor(() => {
			expect(screen.getByTestId("orders-table")).toBeInTheDocument();
		});
	});
});
