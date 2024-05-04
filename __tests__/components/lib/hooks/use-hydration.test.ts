import { renderHook } from "@testing-library/react";
import useHydration from "@/lib/hooks/use-hydration";
import { UseBoundStore, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

describe("useHydration", () => {
	it("should correctly handle hydration state", () => {
		const mockUseStore: UseBoundStore<any> = create(
			persist(() => ({}), {
				name: "mock-storage",
				storage: createJSONStorage(() => localStorage),
			}),
		);

		const { result } = renderHook(() => useHydration(mockUseStore));
		expect(result.current).toBe(true);
	});
});
