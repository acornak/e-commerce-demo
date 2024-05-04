import { renderHook } from "@testing-library/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useFilterChange from "@/lib/hooks/url-params";
import scrollToAboveElement from "@/lib/functions/scroll";

jest.mock("next/navigation");
jest.mock("@/lib/functions/scroll");

describe("useFilterChange", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should update URL parameters and scroll when scroll is true", () => {
		const push = jest.fn();
		const router = { push };
		(useRouter as jest.Mock).mockReturnValue(router);

		const searchParams = new URLSearchParams("param1=value1&param2=value2");
		(useSearchParams as jest.Mock).mockReturnValue(searchParams);

		(usePathname as jest.Mock).mockReturnValue("/path");

		const { result } = renderHook(() => useFilterChange());

		const handleFilterChange = result.current;

		handleFilterChange({ param1: "updatedValue" }, true);

		expect(push).toHaveBeenCalledWith(
			"/path?param1=updatedValue&param2=value2",
			{
				scroll: false,
			},
		);
		expect(scrollToAboveElement).toHaveBeenCalled();
	});

	it("should update URL parameters without scroll when scroll is false", () => {
		const push = jest.fn();
		const router = { push };
		(useRouter as jest.Mock).mockReturnValue(router);

		const searchParams = new URLSearchParams("param1=value1&param2=value2");
		(useSearchParams as jest.Mock).mockReturnValue(searchParams);

		(usePathname as jest.Mock).mockReturnValue("/path");

		const { result } = renderHook(() => useFilterChange());

		const handleFilterChange = result.current;

		handleFilterChange({ param1: "updatedValue" }, false);

		expect(push).toHaveBeenCalledWith(
			"/path?param1=updatedValue&param2=value2",
			{
				scroll: false,
			},
		);
		expect(scrollToAboveElement).not.toHaveBeenCalled();
	});

	it("should remove URL parameters", () => {
		const push = jest.fn();
		const router = { push };
		(useRouter as jest.Mock).mockReturnValue(router);

		const searchParams = new URLSearchParams("param1=value1&param2=value2");
		(useSearchParams as jest.Mock).mockReturnValue(searchParams);

		(usePathname as jest.Mock).mockReturnValue("/path");

		const { result } = renderHook(() => useFilterChange());

		const handleFilterChange = result.current;

		handleFilterChange({ param1: null }, false);

		expect(push).toHaveBeenCalledWith("/path?param2=value2", {
			scroll: false,
		});
		expect(scrollToAboveElement).not.toHaveBeenCalled();
	});
});
