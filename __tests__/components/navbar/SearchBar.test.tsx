import SearchBar from "@/components/navbar/SearchBar";
import { render, screen } from "@testing-library/react";
import { useModalsStore } from "@/lib/stores/modals-store";

jest.mock("@/lib/stores/modals-store", () => ({
	useModalsStore: jest.fn(),
}));

// Fully tested
describe("SearchBar", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders search bar without crashing", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				searchBarOpen: true,
				setsearchBarOpen: jest.fn(),
			});
		});

		render(<SearchBar />);

		const search = screen.getByText("Start typing and hit Enter");
		expect(search).toBeInTheDocument();
	});

	it("does not render seasrch bar when isOpen is false", () => {
		const mockModalsStore = useModalsStore as unknown as jest.Mock;
		mockModalsStore.mockImplementation((fn: any) => {
			return fn({
				searchBarOpen: false,
				setsearchBarOpen: jest.fn(),
			});
		});

		render(<SearchBar />);

		expect(
			screen.queryByText("Start typing and hit Enter"),
		).not.toBeInTheDocument();
	});
});
